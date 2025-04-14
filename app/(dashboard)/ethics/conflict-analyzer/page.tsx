import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ConflictAnalyzerTool from "@/components/dashboard/ethics/conflict-analyzer-tool";

const ConflictAnalyzerToolComponent = () => {
  return <ConflictAnalyzerTool />;
};

const Page = async () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[50vh] flex items-center justify-center">
          <div className="flex items-center gap-2 text-green-600">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </div>
      }
    >
      <ConflictAnalyzerToolComponent />
    </Suspense>
  );
};

export default Page;
