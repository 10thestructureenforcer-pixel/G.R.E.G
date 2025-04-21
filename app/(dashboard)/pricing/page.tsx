import { checkOutAction } from "@/actions/payments/pricing";
import PricingSubmitButton from "@/components/dashboard/pricing/pricing-submit-button";
import { Button } from "@/components/ui/button";
import { getStripePrices, getStripeProducts } from "@/lib/stripe";
import { Check } from "lucide-react";
import React from "react";

// export const revalidate = 100;

const ViewPlans = async () => {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  console.log(products);
  console.log(prices);

  const basePlan = products.find((product) => product.name === "Basic Plan");
  const proPlan = products.find((product) => product.name === "Pro Plan");

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const proPrice = prices.find((price) => price.productId === proPlan?.id);
  return (
    <div className="w-full p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-green-600 dark:text-green-500 mb-8">
        Pricing Plans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 py-6">
        <div className="w-full max-w-md mx-auto">
          <PricingCard
            name={basePlan?.name || "Base"}
            price={basePrice?.unitAmount || 800}
            interval={basePrice?.interval || "month"}
            trialDays={basePrice?.trialPeriodDays || 7}
            features={[
              "Unlimited Usage",
              "Unlimited Workspace Members",
              "Email Support",
            ]}
            priceId={basePrice?.id}
          />
        </div>

        <div className="w-full max-w-md mx-auto">
          <PricingCard
            name={proPlan?.name || "Plus"}
            price={proPrice?.unitAmount || 1200}
            interval={proPrice?.interval || "month"}
            trialDays={proPrice?.trialPeriodDays || 7}
            features={[
              "Everything in Base, and:",
              "Early Access to New Features",
              "24/7 Support + Slack Access",
            ]}
            priceId={proPrice?.id}
          />
        </div>
      </div>
    </div>
  );
};

type PricingCardProps = {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
};

const formatPrice = (amount: number) => {
  return `$${(amount / 100).toFixed(2)}`;
};

const PricingCard = ({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
}: PricingCardProps) => {
  return (
    <div className="rounded-3xl border border-gray-300 dark:border-gray-700 p-10 shadow-md hover:shadow-xl transition-all bg-white dark:bg-black w-full min-h-[400px] flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
          {name}
        </h3>

        <p className="text-5xl font-semibold text-black dark:text-green-500">
          {formatPrice(price)}
          <span className="text-lg font-medium text-gray-500 dark:text-gray-400 ml-1">
            /
          </span>
        </p>

        {/* Trial info (optional) */}
        {/* <p className="mt-1 text-sm text-green-600 dark:text-green-400">
              {trialDays}-day free trial
          </p> */}

        <ul className="space-y-4 mt-6">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start text-base text-gray-700 dark:text-gray-300"
            >
              <Check className="w-5 h-5 mr-2 text-green-500 mt-1" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <form action={checkOutAction}>
          <input type="hidden" name="priceId" value={priceId} />
          <PricingSubmitButton name={name} />
        </form>
      </div>
    </div>
  );
};

export default ViewPlans;
