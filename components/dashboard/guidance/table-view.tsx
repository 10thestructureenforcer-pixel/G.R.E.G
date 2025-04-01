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
    <div className="relative w-full px-4">
      <div className="overflow-x-auto rounded-md border">
        <div className="min-w-[800px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Visa Type</TableHead>
                <TableHead className="w-[120px]">Risk Level</TableHead>
                <TableHead className="w-[140px]">Processing Time</TableHead>
                <TableHead className="w-[120px]">Documents</TableHead>
                <TableHead className="w-[120px]">Recommendation</TableHead>
                <TableHead className="w-[300px]">Requirements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.comparisons.map((item, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{item.visaType}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-3 w-3 text-muted-foreground" />
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
                  <TableCell>
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
                            className="text-xs"
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
                  <TableCell>
                    <div className="flex flex-col gap-1 py-1">
                      <p className="text-sm font-medium">
                        {item.timeline.processingTime}
                      </p>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {item.timeline.estimatedDuration}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="text-xs">
                            {item.documents.required?.length} Required
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
                  <TableCell>
                    <Badge
                      variant={
                        item.recommendation.suitability === "RECOMMENDED"
                          ? "default"
                          : item.recommendation.suitability === "CONSIDER"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {item.recommendation.suitability}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside space-y-0.5">
                      {item.eligibility.requirements
                        .slice(0, 3)
                        .map((req, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-muted-foreground"
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
