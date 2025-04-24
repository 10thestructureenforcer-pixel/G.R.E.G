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

    await prisma.user.update({
      where: {
        id: metadata.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: currentPeriodEnd,
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice;

    const subscription = await stripe.subscriptions.retrieve(
      session.parent?.subscription_details?.subscription as string
    );

    const planDetails = getPlanDetails(
      subscription.items.data[0].plan.metadata?.plan_name as string
    );

    await prisma.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        planName: planDetails.name,
      },
    });
  }
  return NextResponse.json({
    message: "Webhook received Successfully",
  });
}
