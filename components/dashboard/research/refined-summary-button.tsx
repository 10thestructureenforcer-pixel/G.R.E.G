import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import React from "react";

const RefinedSummaryButton = ({
  isOriginalSummaryDone,
  onRefinedSummary,
  originalSummary,
  isRefinedSummaryDone,
}: {
  isOriginalSummaryDone: boolean;
  onRefinedSummary: (refinedText: string) => void;
  originalSummary: string;
  isRefinedSummaryDone: boolean;
}) => {
  const handleRefine = () => {
    const refinePrompt = `Please refine and improve the following summary, making it more detailed and comprehensive while maintaining accuracy:\n\n${originalSummary}`;
    onRefinedSummary(refinePrompt);
  };

  if (!isOriginalSummaryDone || isRefinedSummaryDone) {
    return null;
  }

  return (
    <div className="flex justify-end mb-2">
      <Button
        onClick={handleRefine}
        className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black"
      >
        <Brain className="h-4 w-4 mr-2" />
        Refine Summary
      </Button>
    </div>
  );
};

export default RefinedSummaryButton;
