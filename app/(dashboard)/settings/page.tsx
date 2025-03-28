import React from "react";
import { WrenchIcon } from "lucide-react";

const page = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="bg-background dark:bg-background/95 p-6 rounded-lg border">
          <div className="flex flex-col items-center gap-3">
            <WrenchIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
            <h1 className="text-xl font-medium text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Work in Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
