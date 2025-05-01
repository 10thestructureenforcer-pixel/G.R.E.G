"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Loader2, UserCircle2, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { getRecentChallengeWork } from "@/actions/get-recent-challenge-work";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RecentChallengeWork } from "@/lib/types";

const ChallengeWorkHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const queryClient = useQueryClient();

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["challenge-work"],
    queryFn: async () => {
      const getRecentHistory = await getRecentChallengeWork();
      return getRecentHistory.data;
    },
  });

  const handleArrowClick = (id: string) => {
    router.push(`/governance/challenge-my-work/?challengeWorkId=${id}`);
    setIsModalOpen(false);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="p-2">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black transition-colors duration-200 w-full sm:w-auto cursor-pointer">
            History
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] p-0 bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-800">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Challenge Work History
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 text-green-500 dark:text-green-400 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Loading history...
                </span>
              </div>
            ) : data && data.length > 0 ? (
              <div className="space-y-1.5 p-1.5 cursor-pointer">
                {data
                  .slice(0, visibleCount)
                  .map((item: RecentChallengeWork) => (
                    <Card
                      onClick={() => handleArrowClick(item.id)}
                      key={item.id}
                      className="border h-16 border-border shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <CardContent className="flex items-center justify-between h-full gap-1.5 p-2">
                        <div className="flex items-center gap-1.5 flex-1 min-w-0 h-full">
                          <UserCircle2 className="h-8 w-8 text-green-500  flex-shrink-0" />
                          <div className="flex flex-col justify-center min-w-0 h-full">
                            <h3 className="font-normal text-md">
                              {item.clientName}
                            </h3>
                            <div className="flex gap-1 mt-0.5">
                              <span className="px-1 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] leading-none">
                                {item.responseType}
                              </span>
                              {item.refinedOutput && (
                                <span className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] leading-none">
                                  Refined
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-green-500 dark:text-green-400 cursor-pointer hover:text-green-600 dark:hover:text-green-300 transition-colors flex-shrink-0" />
                      </CardContent>
                    </Card>
                  ))}
                {data.length > visibleCount && (
                  <div className="flex justify-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      onClick={handleShowMore}
                    >
                      Show More
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-sm text-muted-foreground">
                  No history found
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChallengeWorkHistory;
