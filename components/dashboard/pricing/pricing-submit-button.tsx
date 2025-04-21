import { Button } from "@/components/ui/button";
import React from "react";

const PricingSubmitButton = ({ name }: { name: string }) => {
  return (
    <div>
      <Button
        className={`w-full py-6 text-lg cursor-pointer ${
          name == "Pro Plan"
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Subscribe Now
      </Button>
    </div>
  );
};

export default PricingSubmitButton;
