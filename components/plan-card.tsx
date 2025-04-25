"use client";
import React from "react";
import { Button } from "./ui/button";

const PlanCard = () => {
  return (
    <div>
      <Button className="w-full dark:bg-cyan-700 bg-cyan-600 text-white cursor-pointer hover:bg-cyan-00 ">
        View Plans
      </Button>
    </div>
  );
};

export default PlanCard;
