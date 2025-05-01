import prisma from "@/lib/db";
import { getPlanDetails, stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (e) {
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata as Stripe.Metadata;

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const currentPeriodEnd = new Date(
      subscription.items.data[0].current_period_end * 1000
    );
    const planDetails = getPlanDetails(
      subscription.items.data[0].plan.metadata?.plan_name as string
    );

    // console.log("billingPeriod is", metadata.billingPeriod);

    await prisma.user.update({
      where: {
        id: metadata.userId,
      },
      data: {
        isPro: true,
        isSubscribed: true,
        billingPeriod: metadata.billingPeriod,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: currentPeriodEnd,
        planName: planDetails.name,
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice;
    console.log("invoice payment is called ");
    if (session.billing_reason != "subscription_create") {
      const subscription = await stripe.subscriptions.retrieve(
        session.parent?.subscription_details?.subscription as string
      );

      await prisma.user.update({
        where: {
          id: subscription.id as string,
        },
        data: {
          isPro: true,
          isSubscribed: true,
          billingPeriod: subscription.items.data[0].plan.metadata
            ?.billing_period as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.billing_cycle_anchor * 1000
          ),
        },
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const session = event.data.object as Stripe.Subscription;
    console.log("Webhook event data:", event);
    console.log(session.customer, "session.customer  isss");
    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: (session.customer as string) ?? " ",
      },
      select: {
        id: true,
        stripeSubscriptionId: true,
        stripeCustomerId: true,
        stripePriceId: true,
        stripeCurrentPeriodEnd: true,
        planName: true,
        isSubscribed: true,
      },
    });

    console.log("User before update:", user);

    if (!user) {
      throw new Error("User not found");
    }
    if (user) {
      const updateSubscription = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId as string,
        {
          expand: ["latest_invoice"],
        }
      );

      console.log("updateSubscription is sss", updateSubscription);

      const res = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isSubscribed: false,
        },
      });

      console.log("Updated user after subscription deletion:", res);
    } else {
      console.log("User not found for stripeSubscriptionId:", session.id);
    }
  }

  return NextResponse.json({
    message: "Webhook received Successfully",
  });
}
