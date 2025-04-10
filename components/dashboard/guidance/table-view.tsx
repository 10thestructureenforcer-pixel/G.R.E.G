"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { visaComparisonSchema } from "@/lib/schema";
import { z } from "zod";
import { InfoIcon } from "lucide-react";

type VisaComparisonType = z.infer<typeof visaComparisonSchema>;

const TableView = ({
  data,
  loading,
}: {
  data: VisaComparisonType | undefined;
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading comparisons...
        </div>
      </div>
    );
  }

  if (!data?.comparisons?.length) {
    return null;
  }

  return (
    <div className="relative w-full px-2">
      <div className="overflow-x-auto rounded-md border">
        <div className="min-w-[900px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Visa Type</TableHead>
                <TableHead className="w-[100px]">Risk Level</TableHead>
                <TableHead className="w-[150px]">Processing Time</TableHead>
                <TableHead className="w-[120px]">Documents</TableHead>
                <TableHead className="w-[120px]">Recommendation</TableHead>
                <TableHead className="w-[200px]">Requirements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.comparisons.map((item, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="py-2">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-xs">
                        {item.visaType}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-[300px]">
                            <div className="space-y-1">
                              <p className="font-medium text-xs">
                                Recommendation Reasoning:
                              </p>
                              <p className="text-xs">
                                {item.recommendation.reasoning}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            variant={
                              item.risks.riskLevel === "LOW"
                                ? "default"
                                : item.risks.riskLevel === "MEDIUM"
                                ? "secondary"
                                : "destructive"
                            }
                            className="text-xs px-1.5"
                          >
                            {item.risks.riskLevel}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[300px]">
                          <div className="space-y-1">
                            <p className="font-medium text-xs">Red Flags:</p>
                            <ul className="list-disc list-inside">
                              {item.risks.redFlags.map((flag, idx) => (
                                <li key={idx} className="text-xs">
                                  {flag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs font-medium whitespace-normal">
                        {item.timeline.processingTime}
                      </p>
                      <p className="text-xs text-muted-foreground leading-tight whitespace-normal">
                        {item.timeline.estimatedDuration}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="text-xs px-1.5">
                            {item.documents.required?.length} Docs
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[300px]">
                          <div className="space-y-1">
                            <p className="font-medium text-xs">
                              Required Documents:
                            </p>
                            <ul className="list-disc list-inside">
                              {item.documents.required.map((doc, idx) => (
                                <li key={idx} className="text-xs">
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="py-2">
                    <Badge
                      variant={
                        item.recommendation.suitability === "RECOMMENDED"
                          ? "default"
                          : item.recommendation.suitability === "CONSIDER"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs px-1.5"
                    >
                      {item.recommendation.suitability}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2">
                    <ul className="list-disc list-inside space-y-0.5">
                      {item.eligibility.requirements
                        .slice(0, 2)
                        .map((req, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-muted-foreground whitespace-normal"
                          >
                            {req}
                          </li>
                        ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TableView;
