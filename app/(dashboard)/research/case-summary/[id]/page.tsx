// import { ResearchActions } from "@/components/dashboard/research/research-actions";
import { ResearchSummary } from "@/components/dashboard/research/research-summary";
import prisma from "@/lib/db";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

const ResearchPage = async ({ id }: { id: string }) => {
  // const session = await auth();

  // console.log("the id ", id);

  const researchData = await prisma.caseFile.findFirst({
    where: {
      id: id,
    },
    select: {
      title: true,
      casesummary: {
        select: {
          status: true,
          summary: true,
          refinedSummary: true,
        },
      },
    },
  });
  // console.log(researchData);
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              Case Analysis
            </h1>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">File:</span> {researchData?.title}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {researchData?.casesummary?.status === "SUCCESS" && (
              <ResearchSummary
                title={researchData.title}
                summary={researchData.casesummary.summary}
                fileName={researchData.title}
                refinedSummary={
                  researchData.casesummary.refinedSummary || undefined
                }
              />
            )}

            {researchData?.casesummary?.status === "FAILED" && (
              <div className="bg-destructive/10 p-6 rounded-lg border border-destructive">
                <div className="flex items-center gap-2 text-destructive">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <h3 className="text-lg font-semibold">
                    Failed to Generate Summary
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  There was an error processing your document. Please try again.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function CaseSummaryPageSuspense({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-10 w-10 animate-spin text-green-500" />
        </div>
      }
    >
      <ResearchPage id={id} />
    </Suspense>
  );
}
