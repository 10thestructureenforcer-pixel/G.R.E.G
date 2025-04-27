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

    const currentPeriodEnd = new Date(subscription.billing_cycle_anchor * 1000);
    const planDetails = getPlanDetails(
      subscription.items.data[0].plan.metadata?.plan_name as string
    );

    // console.log("billingPeriod is", metadata.billingPeriod);

    await prisma.user.update({
      where: {
        id: metadata.userId,
      },
      data: {
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

    if (session.billing_reason != "subscription_create") {
      const subscription = await stripe.subscriptions.retrieve(
        session.parent?.subscription_details?.subscription as string
      );

      await prisma.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
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

    await prisma.user.update({
      where: {
        stripeSubscriptionId: session.id,
      },
      data: {
        stripeSubscriptionId: null,
        stripeCustomerId: null,
        stripePriceId: null,
        stripeCurrentPeriodEnd: null,
        billingPeriod: null,
        planName: "free",
      },
    });
  }
  return NextResponse.json({
    message: "Webhook received Successfully",
  });
}
