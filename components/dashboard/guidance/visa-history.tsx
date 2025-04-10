"use client";
import { getVisaHistory } from "@/actions/get-visa-history";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ArrowRight, Loader2, Router } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle2 } from "lucide-react";
import { VisaHistoryType } from "@/lib/types";
import { useRouter } from "next/navigation";

const VisaHistory = ({
  data: visaHistory,
  loading,
}: {
  data: VisaHistoryType[];
  loading: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const handleArrowClick = (id: string) => {
    router.push(`/guidance/visa-comparison?visaCompareId=${id}`);
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
              Visa History
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 text-green-500 dark:text-green-400 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Loading history...
                </span>
              </div>
            ) : visaHistory && visaHistory.length > 0 ? (
              <div className="space-y-2 p-2">
                {visaHistory.map((data: VisaHistoryType) => (
                  <Card
                    key={data.id}
                    className="border h-auto border-border shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <CardContent className="flex items-center justify-between gap-4">
                      <div className="flex items-start gap-2 flex-1">
                        <UserCircle2 className="h-8 w-8 text-green-500 dark:text-green-400" />
                        <div className="flex flex-col">
                          <h3 className="font-semibold text-sm ">
                            {data.clientName}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-1 ">
                            {data.visaType.map((type, index) => (
                              <span
                                key={index}
                                className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs gap-"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <ArrowRight
                        onClick={() => handleArrowClick(data.id)}
                        className="h-5 w-5 text-green-500 dark:text-green-400 cursor-pointer"
                      />
                    </CardContent>
                  </Card>
                ))}
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

export default VisaHistory;
