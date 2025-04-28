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
              ? "bg-neutral-800 hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900"
              : "bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-green-500 text-white dark:text-green-500"
          }`}
        >
          {pending ? "Loading...." : "Subscribe Now"}
        </Button>
      </div>
    </div>
  );
};

export default PricingSubmitButton;
