import React from "react";
import { FileText, BarChart, Search, BookOpen } from "lucide-react";

const Cards = ({ totalCases }: { totalCases: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div className="bg-card rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Cases Summarized
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {totalCases}
            </h3>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <FileText className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <BarChart className="w-4 h-4 mr-1" />
            <span>PDF Documents</span>
          </div>
        </div>
      </div>

      {/* <div className="bg-card rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Citation Lookups
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-1">0</h3>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Search className="w-4 h-4 mr-1" />
            <span>Legal Citations</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Cards;
