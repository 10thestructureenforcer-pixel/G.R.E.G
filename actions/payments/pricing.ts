"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

const billingUrl = absoluteUrl("/dashboard");

export async function checkOutAction(formData: FormData) {
  let redirectUrl: string = "";
  try {
    const priceId = formData.get("priceId");
    const billingPeriod = formData.get("billingPeriod");
    // console.log(priceId, billingPeriod);

    if (!priceId) {
      throw new Error("No price id");
    }
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email || !user.id) {
      throw new Error("Unauthorized");
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.email,

      line_items: [
        {
          price: priceId as string,
          quantity: 1,
        },
      ],

      metadata: {
        userId: user.id,
        billingPeriod: billingPeriod as string,
      },
    });

    redirectUrl = stripeSession.url as string;
  } catch (e) {
    console.log(e);
  }
  redirect(redirectUrl);
}
