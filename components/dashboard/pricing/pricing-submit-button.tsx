"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const PricingSubmitButton = ({ name }: { name: string }) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <div>
        <Button
          disabled={pending}
          className={`w-full py-2 text-md cursor-pointer ${
            name == "Pro Plan"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {pending ? "Loading...." : "Subscribe Now"}
        </Button>
      </div>
    </div>
  );
};

export default PricingSubmitButton;
