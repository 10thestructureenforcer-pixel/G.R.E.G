import { getStripePrices, getStripeProducts } from "@/lib/stripe";
import React from "react";

import PricingCards from "@/components/dashboard/pricing/pricing-cards";
import { stripePriceType, stripeProductType } from "@/lib/types";

// export const revalidate = 100;

const ViewPlans = async () => {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const startProduct = products.find(
    (product: stripeProductType) => product.name === "Start"
  );
  const growProduct = products.find(
    (product: stripeProductType) => product.name === "Grow"
  );
  const scaleProduct = products.find(
    (product: stripeProductType) => product.name === "Scale"
  );

  const startPrice = prices.filter(
    (price: stripePriceType) => price.productId === startProduct?.id
  );
  const growPrice = prices.filter(
    (price: stripePriceType) => price.productId === growProduct?.id
  );
  const scalePrice = prices.filter(
    (price: stripePriceType) => price.productId === scaleProduct?.id
  );

  return (
    <div className="w-full p-2 max-w-9xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-green-600 dark:text-green-500 ">
        Pricing Plans
      </h1>

      <PricingCards
        startProduct={startProduct as stripeProductType}
        growProduct={growProduct as stripeProductType}
        scaleProduct={scaleProduct as stripeProductType}
        startPrice={startPrice}
        growPrice={growPrice}
        scalePrice={scalePrice}
      />
    </div>
  );
};

export default ViewPlans;
