import Stripe from "stripe";

const stripe = new Stripe(
  (process.env.STRIPE_SECRET_KEY as string) || "api_key_placeholder",
  {
    apiVersion: "2025-03-31.basil",
    typescript: true,
  }
);

export async function getStripePrices() {
  const prices = await stripe.prices.list({
    expand: ["data.product"],
    active: true,
    type: "recurring",
  });

  return prices.data.map((price) => ({
    id: price.id,
    productId:
      typeof price.product === "string" ? price.product : price.product.id,
    unitAmount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval,
    trialPeriodDays: price.recurring?.trial_period_days,
  }));
}

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    defaultPriceId:
      typeof product.default_price === "string"
        ? product.default_price
        : product.default_price?.id,
  }));
}

type PlanDetails = {
  name: string;
  maxClientCount: number;
  caseSummaryCount: number;
};

export function getPlanDetails(plan_name: string): PlanDetails {
  if (plan_name === "start") {
    return {
      name: "start",
      maxClientCount: 5,
      caseSummaryCount: 20,
    };
  } else if (plan_name === "grow") {
    return {
      name: "grow",
      maxClientCount: 15,
      caseSummaryCount: 40,
    };
  } else if (plan_name === "scale") {
    return {
      name: "scale",
      maxClientCount: 30,
      caseSummaryCount: 70,
    };
  } else {
    throw new Error(`Plan ${plan_name} not found`);
  }
}

export { stripe };
