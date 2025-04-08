import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

const ResearchDocuments = () => {
  return (
    <div className="grid gap-4">
      <Link href="/research/case-summary">
        <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer max-w-xs overflow-hidden group">
          <div className="bg-green-50 dark:bg-green-950/30 h-2 w-full"></div>
          <CardContent className="p-5 flex flex-col h-40">
            <div className="flex items-center justify-between mb-3">
              <FileText className="h-6 w-6 text-green-500 dark:text-green-400" />
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Case Summary</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              Comprehensive overview of legal cases with detailed analysis and
              key findings.
            </p>
            <div className="mt-auto pt-2 text-xs text-muted-foreground">
              Click to view details
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Loader2 className="h-8 w-8 text-green-500 dark:text-green-400 animate-spin mb-4" />
      <p className="text-muted-foreground">Loading research documents...</p>
    </div>
  );
};

const ResearchPage = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Research Case Documents</h1>
        <p className="text-muted-foreground mt-1">
          Access and manage your legal research documents
        </p>
      </div>

      <Suspense fallback={<LoadingState />}>
        <ResearchDocuments />
      </Suspense>
    </div>
  );
};

export default ResearchPage;
