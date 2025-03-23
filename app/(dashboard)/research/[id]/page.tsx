// import { ResearchActions } from "@/components/dashboard/research/research-actions";
import { ResearchSummary } from "@/components/dashboard/research/research-summary";
import prisma from "@/lib/db";
import React from "react";

const ResearchPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // const session = await auth();
  const { id } = await params;
  console.log("the id ", id);

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
        },
      },
    },
  });
  // console.log(researchData);
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-2">
          {researchData?.casesummary?.status === "SUCCESS" && (
            <ResearchSummary
              title={"hello"}
              summary={researchData.casesummary.summary}
              fileName={researchData.title}
            />
          )}

          {researchData?.casesummary?.status === "FAILED" && (
            <div className=" text-black p-2 rounded-md">
              <p>Failed to Generate Summary</p>
            </div>
          )}
        </div>

        {/* <div className="md:col-span-1">
          <ResearchActions />
        </div> */}
      </div>
    </div>
  );
};

export default ResearchPage;
