"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

interface ResearchSummaryProps {
  title: string;
  summary: string;
  fileName: string;
}

export function ResearchSummary({
  title,
  summary,
  fileName,
}: ResearchSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Summary</CardTitle>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>File:</span>
          <span className="font-medium">{fileName}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="">
        <div className="space-y-2">
          <div>
            <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4 text-black prose-pre:p-0 max-w-full">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
