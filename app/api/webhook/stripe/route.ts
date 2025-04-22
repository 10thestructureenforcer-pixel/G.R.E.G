import { stripe } from "@/lib/stripe";
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

  console.log("the event is", event);
  return NextResponse.json({
    event,
  });
}
