"use client";

import { Button } from "@/components/ui/button";

const PricingToggle = ({
  onToggle,
  isYearly,
  setIsYearly,
}: {
  onToggle: (isYearly: boolean) => void;
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
}) => {
  return (
    <div className="flex justify-center mb-4 space-x-2">
      <Button
        onClick={() => {
          setIsYearly(false);
          onToggle(false);
        }}
        className={`px-6 py-3 rounded-full transition-colors duration-300 cursor-pointer ${
          !isYearly
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
      >
        Monthly Billing
      </Button>
      <Button
        onClick={() => {
          setIsYearly(true);
          onToggle(true);
        }}
        className={`px-6 py-3 rounded-full transition-colors duration-300 cursor-pointer ${
          isYearly
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
      >
        Yearly Billing
      </Button>
    </div>
  );
};

export default PricingToggle;
