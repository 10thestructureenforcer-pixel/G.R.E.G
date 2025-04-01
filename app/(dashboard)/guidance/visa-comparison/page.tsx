import { auth } from "@/auth";
import VisaComparisonTool from "@/components/dashboard/guidance/visa-comparison-tool";
import prisma from "@/lib/db";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

const Page = async () => {
  const session = await auth();

  const clients = await prisma.client.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });

  return (
    <Suspense
      fallback={
        <div className="w-full h-[50vh] flex items-center justify-center">
          <div className="flex items-center gap-2 text-green-600">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </div>
      }
    >
      <VisaComparisonTool clients={clients} />
    </Suspense>
  );
};

export default Page;
