import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import React from "react";

const RefinedSummaryButton = ({
  isFinishedSummary,
  onRefinedSummary,
  originalSummary,
}: {
  isFinishedSummary: boolean;
  onRefinedSummary: (refinedText: string) => void;
  originalSummary: string;
}) => {
  return (
    <div className="flex justify-end mb-2">
      <Button
        disabled={!isFinishedSummary}
        onClick={() => onRefinedSummary(originalSummary)}
        className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black"
      >
        <Brain className=" h-4 w-4" />
        Refine Summary
      </Button>
    </div>
  );
};

export default RefinedSummaryButton;
