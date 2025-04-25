"use client";

import React, { useState } from "react";
import PricingSubmitButton from "./pricing-submit-button";
import { checkOutAction } from "@/actions/payments/pricing";
import { Check } from "lucide-react";
import PricingToggle from "./pricing-toggle";
import { stripePriceType, stripeProductType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

type SinglePricingCardProps = {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
  billingPeriod: string;
  savedAmount?: string;
  currentPlan?: string;
};

export type UserPricingData = {
  planName: "start" | "grow" | "scale";
};

const formatPrice = (amount: number) => {
  return `$${(amount / 100).toFixed(2)}`;
};

const SinglePricingCard = ({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
  billingPeriod,
  savedAmount,
  currentPlan,
}: SinglePricingCardProps) => {
  const { mutate } = useMutation({
    mutationKey: ["manage-subscription"],
    mutationFn: async () => {
      const response = await fetch("/api/manage-subscription", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const { url } = await response.json();
      window.location.href = url;
    },
  });

  const handleManageSubscription = async () => {
    mutate();
  };

  const isCurrentPlan = currentPlan?.toLowerCase() === name.toLowerCase();

  return (
    <div className="rounded-3xl border border-gray-300 dark:border-gray-700 p-6 shadow-md hover:shadow-xl transition-all bg-white dark:bg-black w-full min-h-[350px] flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-black dark:text-white mb-1">
          {name}
        </h3>

        <div className="flex items-baseline">
          <p className="text-4xl font-semibold text-black dark:text-yellow-500">
            {formatPrice(price)}
          </p>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">
            /{billingPeriod}
          </span>
        </div>
        {savedAmount && (
          <p className="text-sm text-green-600 dark:text-green-500 mt-1">
            {savedAmount}
          </p>
        )}

        <ul className="space-y-2 mt-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start text-sm text-gray-700 dark:text-gray-300"
            >
              <Check className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        {isCurrentPlan ? (
          <Button
            className="w-full py-2 text-md cursor-pointer dark:bg-gray-200 dark:text-black rounded-full    dark:hover:bg-gray-300"
            onClick={handleManageSubscription}
          >
            Manage Subscription
          </Button>
        ) : (
          <form action={checkOutAction}>
            <input type="hidden" name="priceId" value={priceId} />
            <PricingSubmitButton name={name} />
          </form>
        )}
      </div>
    </div>
  );
};

const PricingCards = ({
  startProduct,
  growProduct,
  scaleProduct,
  startPrice,
  growPrice,
  scalePrice,
  userPricingData,
}: {
  startProduct: stripeProductType;
  growProduct: stripeProductType;
  scaleProduct: stripeProductType;
  startPrice: stripePriceType[];
  growPrice: stripePriceType[];
  scalePrice: stripePriceType[];
  userPricingData: UserPricingData;
}) => {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = (yearly: boolean) => {
    setIsYearly(yearly);
  };

  const yearlyStartPrice = startPrice.find(
    (price: stripePriceType) => price.interval === "year"
  );
  const yearlyGrowPrice = growPrice.find(
    (price: stripePriceType) => price.interval === "year"
  );
  const yearlyScalePrice = scalePrice.find(
    (price: stripePriceType) => price.interval === "year"
  );

  const monthlyStartPrice = startPrice.find(
    (price: stripePriceType) => price.interval === "month"
  );
  const monthlyGrowPrice = growPrice.find(
    (price: stripePriceType) => price.interval === "month"
  );
  const monthlyScalePrice = scalePrice.find(
    (price: stripePriceType) => price.interval === "month"
  );

  const { mutate } = useMutation({
    mutationKey: ["manage-subscription"],
    mutationFn: async () => {
      const response = await fetch("/api/manage-subscription", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const { url } = await response.json();
      window.location.href = url;
    },
  });

  const handleManageSubscription = async () => {
    mutate();
  };

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto px-2 py-3">
      <PricingToggle
        onToggle={handleToggle}
        isYearly={isYearly}
        setIsYearly={setIsYearly}
      />
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-4">
        <div className="w-full max-w-sm mx-auto">
          <SinglePricingCard
            name={startProduct?.name || "Start"}
            price={
              isYearly
                ? yearlyStartPrice?.unitAmount || 0
                : monthlyStartPrice?.unitAmount || 0
            }
            interval={isYearly ? "year" : "month"}
            trialDays={yearlyStartPrice?.trialPeriodDays || 7}
            features={[
              "Auto-draft petitions, waivers, declarations",
              "AI help with RFEs and motions",
              "Smart legal strategy suggestions",
              "Case-by-case document workspace",
              "Upto 5 clients and 20 case summaries",
            ]}
            priceId={
              isYearly
                ? yearlyStartPrice?.id || ""
                : monthlyStartPrice?.id || ""
            }
            billingPeriod={isYearly ? "year" : "month"}
            savedAmount={isYearly ? "Save $238" : ""}
            currentPlan={userPricingData.planName}
          />
        </div>

        <div className="w-full max-w-sm mx-auto">
          <SinglePricingCard
            name={growProduct?.name || "Grow"}
            price={
              isYearly
                ? yearlyGrowPrice?.unitAmount || 0
                : monthlyGrowPrice?.unitAmount || 0
            }
            interval={isYearly ? "year" : "month"}
            trialDays={yearlyGrowPrice?.trialPeriodDays || 7}
            features={[
              "Everything in Start",
              "Priority access to new tools",
              "Extra templates & document storage",
              "Upto 15 clients and 50 case summaries",
            ]}
            priceId={
              isYearly ? yearlyGrowPrice?.id || "" : monthlyGrowPrice?.id || ""
            }
            billingPeriod={isYearly ? "year" : "month"}
            savedAmount={isYearly ? "Save $488" : ""}
            currentPlan={userPricingData.planName}
          />
        </div>

        <div className="w-full max-w-sm mx-auto">
          <SinglePricingCard
            name={scaleProduct?.name || "Scale"}
            price={
              isYearly
                ? yearlyScalePrice?.unitAmount || 0
                : monthlyScalePrice?.unitAmount || 0
            }
            interval={isYearly ? "year" : "month"}
            trialDays={yearlyScalePrice?.trialPeriodDays || 7}
            features={[
              "Best for high-volume solos",
              "Faster workflows, more case slots",
              "Add more clients anytime—just $10/client/month",
              "Upto 30 clients and 100 case summaries",
            ]}
            priceId={
              isYearly
                ? yearlyScalePrice?.id || ""
                : monthlyScalePrice?.id || ""
            }
            billingPeriod={isYearly ? "year" : "month"}
            savedAmount={isYearly ? "Save $713" : ""}
            currentPlan={userPricingData.planName}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
