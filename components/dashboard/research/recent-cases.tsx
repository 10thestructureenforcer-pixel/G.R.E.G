"use client";
import { RecentCases, RecentCasesInterface } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { FileIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const RecentCasesList = ({ recentCases }: RecentCasesInterface) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["recentCases"],
    initialData: recentCases,
    queryFn: async () => {
      return recentCases;
    },
    staleTime: Infinity,
    gcTime: 60 * 60 * 24,
  });

  return (
    <>
      <h3 className="text-lg font-semibold mb-5 text-gray-800 flex items-center">
        <FileIcon className="h-5 w-5 mr-2 text-blue-600" />
        Recent Documents
      </h3>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            </div>
          ) : data.length > 0 ? (
            data.map((data: RecentCases) => (
              <div
                key={data.id}
                onClick={() => {
                  router.push(`/research/${data.id}`);
                }}
                className="flex items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors duration-200"
              >
                <FileIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 truncate flex-grow">
                  {data.title}
                </span>

                {data?.casesummary?.caseFileId === data?.id && (
                  <>
                    {data?.casesummary?.status === "SUCCESS" && (
                      <div className="h-3 w-3 bg-green-500 rounded-full ml-auto"></div>
                    )}
                    {data?.casesummary?.status === "FAILED" && (
                      <div className="h-3 w-3 bg-red-500 rounded-full ml-auto"></div>
                    )}
                    {data?.casesummary?.status === "PENDING" && (
                      <Loader2 className="h-4 w-4 text-blue-500 ml-auto animate-spin"></Loader2>
                    )}
                  </>
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
