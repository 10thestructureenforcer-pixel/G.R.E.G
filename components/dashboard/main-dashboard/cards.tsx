import React from "react";
import { FileText, BarChart, Search, BookOpen } from "lucide-react";

const Cards = ({ totalCases }: { totalCases: number }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Total Cases Summarized
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {totalCases}
            </h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <BarChart className="w-4 h-4 mr-1" />
            <span>PDF Documents</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Citation Lookups
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">0</h3>
          </div>
          <div className="bg-green-50 p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Search className="w-4 h-4 mr-1" />
            <span>Legal Citations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
