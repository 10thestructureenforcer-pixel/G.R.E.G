import React, { Suspense } from "react";
import RecentCases from "@/components/dashboard/research/recent-cases";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import UploadComponent from "@/components/dashboard/research/upload-component";
import { Loader2 } from "lucide-react";

const page = async () => {
  const session = await auth();
  const recentCases = await prisma.caseFile.findMany({
    where: {
      uploadedBy: {
        email: session?.user?.email,
      },
    },

    include: {
      casesummary: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-background dark:bg-background/95 rounded-lg p-5 mb-6">
            <UploadComponent />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-background dark:bg-background/95 rounded-lg shadow-sm p-5 sticky top-24">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Loading recent cases...
                    </p>
                  </div>
                </div>
              }
            >
              <RecentCases recentCases={recentCases} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
