
import React, { Suspense } from "react";
import RecentCases from "@/components/dashboard/research/recent-cases";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import UploadComponent from "@/components/dashboard/research/upload-component";

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
          <div className="bg-white rounded-lg  p-5 mb-6">
            <UploadComponent />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-5 sticky top-24">
            <Suspense fallback={<div>Loading recent cases...</div>}>
              <RecentCases recentCases={recentCases} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
