import { getStripePrices, getStripeProducts } from "@/lib/stripe";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

import PricingCards from "@/components/dashboard/pricing/pricing-cards";
import { stripePriceType, stripeProductType } from "@/lib/types";

import { UserPricingData } from "@/components/dashboard/pricing/pricing-cards";
import { getUserPricingData } from "@/actions/payments/get-user-pricing-data";

// export const revalidate = 100;

const ViewPlans = async () => {
  const [prices, products, userPricingData] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
    getUserPricingData(),
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
        userPricingData={
          (userPricingData || { planName: "free" }) as UserPricingData
        }
      />
    </div>
  );
};

const PricingSuspense = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[50vh] flex items-center justify-center">
          <div className="flex items-center gap-2 text-green-600">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </div>
      }
    >
      <ViewPlans />
    </Suspense>
  );
};

export default PricingSuspense;
