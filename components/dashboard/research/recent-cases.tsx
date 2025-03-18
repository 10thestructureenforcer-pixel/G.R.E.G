import { RecentCases, RecentCasesInterface } from "@/lib/types";
import { FileIcon } from "lucide-react";
import React from "react";

const RecentCasesList = ({ recentCases }: RecentCasesInterface) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-5 text-gray-800 flex items-center">
        <FileIcon className="h-5 w-5 mr-2 text-blue-600" />
        Recent Documents
      </h3>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 gap-4">
          {recentCases.length > 0 ? (
            recentCases.map((data: RecentCases) => (
              <div
                key={data.id}
                className="flex items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors duration-200"
              >
                <FileIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 truncate flex-grow">
                  {data.title}
                </span>

                {data?.casesummary?.caseFileId === data?.id &&
                  data?.casesummary?.status === "SUCCESS" && (
                    <div className="h-3 w-3 bg-green-500 rounded-full ml-auto"></div>
                  )}

                {data?.casesummary?.caseFileId === data?.id &&
                  data?.casesummary?.status === "FAILED" && (
                    <div className="h-3 w-3 bg-red-500 rounded-full ml-auto"></div>
                  )}
              </div>
            ))
          ) : (
            <div className="text-center p-4 bg-gray-50 rounded-md">
              <p className="text-gray-500">No recent documents</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentCasesList;
