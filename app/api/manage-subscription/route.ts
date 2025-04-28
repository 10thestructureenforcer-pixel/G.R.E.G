import { auth } from "@/auth";
import prisma from "@/lib/db";
import { getUserUsage } from "@/utils/check-add-client-summary";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    //Get the user's stripe customer id
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        stripeCustomerId: true,
        stripeSubscriptionId: true,
      },
    });

    if (!user || !user.stripeCustomerId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //Create a billing portal session
    const subscriptionPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
      });

    console.log(subscriptionPortalSession);

    //Return the billing portal url
    return NextResponse.json(
      { url: subscriptionPortalSession.url },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
