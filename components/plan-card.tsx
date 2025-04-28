"use client";
import React from "react";
import { Button } from "./ui/button";

const PlanCard = () => {
  return (
    <div>
      <Button className="w-full bg-neutral-300/50 border-2 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-200 transition-colors duration-300 cursor-pointer hover:text-green-600 dark:hover:text-green-500 ">
        View Plans
      </Button>
    </div>
  );
};

export default PlanCard;
