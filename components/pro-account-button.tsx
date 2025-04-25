"use client";
import React from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserPricingData } from "@/actions/payments/get-user-pricing-data";

const ProAccountButton = () => {
  const { data: userData } = useQuery({
    queryKey: ["pro-account"],
    queryFn: async () => {
      const res = await getUserPricingData();
      return res;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const isPro =
    userData?.planName === "start" ||
    userData?.planName === "grow" ||
    userData?.planName === "scale";

  if (!isPro) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "relative rounded-full w-10 h-10 transition-all duration-300 border-2 border-black dark:border-gray-700",
        "hover:bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
        "group border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800",
        "shadow-sm hover:shadow-md dark:shadow-cyan-900/10",
        "backdrop-blur-sm"
      )}
    >
      <div className="relative">
        <Crown
          className={cn(
            "w-5 h-5 transition-all duration-300",
            "text-cyan-500 dark:text-cyan-400",
            "group-hover:scale-110 group-hover:rotate-12",
            "drop-shadow-sm"
          )}
        />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
      </div>
    </Button>
  );
};

export default ProAccountButton;
