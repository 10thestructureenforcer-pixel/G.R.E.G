"use client";

import { GetRecentCases } from "@/actions/get-recent-cases";
import { RecentCases, RecentCasesInterface } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { FileIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const RecentCasesList = ({ recentCases }: RecentCasesInterface) => {
  const router = useRouter();
  const { data, isLoading } = useQuery<RecentCases[]>({
    queryKey: ["recentCases"],
    initialData: recentCases,
    queryFn: async () => {
      const res = await GetRecentCases();
      return res as RecentCases[];
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  return (
    <>
      <h3 className="text-lg font-semibold mb-5 text-foreground flex items-center">
        <FileIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
        Recent Documents
      </h3>
      <div
        aria-busy={isLoading}
        className={`max-h-[calc(100vh-200px)] overflow-y-auto pr-2 ${
          isLoading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 text-blue-500 dark:text-blue-400 animate-spin" />
            </div>
          ) : data.length > 0 ? (
            data.map((data: RecentCases) => (
              <div
                key={data.id}
                onClick={() => {
                  if (!isLoading && data.casesummary?.status !== "PENDING") {
                    router.push(`/research/case-summary/${data.id}`);
                  }
                }}
                className={`flex items-center p-4 bg-muted dark:bg-muted/50 rounded-md border border-border hover:bg-accent hover:border-accent-foreground/20 transition-colors duration-200 ${
                  isLoading || data.casesummary?.status === "PENDING"
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground truncate flex-grow">
                  {data.title}
                </span>

                {data?.casesummary?.caseFileId === data?.id && (
                  <>
                    {data?.casesummary?.status === "SUCCESS" && (
                      <div className="h-3 w-3 bg-green-500 dark:bg-green-400 rounded-full ml-auto"></div>
                    )}
                    {data?.casesummary?.status === "FAILED" && (
                      <div className="h-3 w-3 bg-red-500 dark:bg-red-400 rounded-full ml-auto"></div>
                    )}
                    {data?.casesummary?.status === "PENDING" && (
                      <Loader2 className="h-4 w-4 text-blue-500 dark:text-blue-400 ml-auto animate-spin"></Loader2>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center p-4 bg-muted dark:bg-muted/50 rounded-md">
              <p className="text-muted-foreground">No recent documents</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentCasesList;
