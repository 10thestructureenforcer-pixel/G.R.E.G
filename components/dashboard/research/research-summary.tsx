"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

interface ResearchSummaryProps {
  title: string;
  summary: string;
  fileName: string;
  refinedSummary?: string;
}

export function ResearchSummary({
  title,
  summary,
  fileName,
  refinedSummary,
}: ResearchSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 p-6 rounded-lg border border-border bg-card/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <h3 className="text-xl font-semibold text-blue-500">
              Original Summary
            </h3>
          </div>
          <div className="prose prose-blue break-words dark:prose-invert prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4 text-foreground prose-pre:p-0 w-full">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
        {refinedSummary && (
          <div className="space-y-4 p-6 rounded-lg border border-border bg-card/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <h3 className="text-xl font-semibold text-green-500">
                Refined Summary
              </h3>
            </div>
            <div className="prose prose-green break-words dark:prose-invert prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4 text-foreground prose-pre:p-0 w-full">
              <ReactMarkdown>{refinedSummary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
