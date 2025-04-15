// import ChatUI from "@/components/dashboard/main-dashboard/chat-ui";
import { auth } from "@/auth";
import Cards from "@/components/dashboard/main-dashboard/cards";
import ClientInfoButton from "@/components/dashboard/main-dashboard/client-info-button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import prisma from "@/lib/db";
import { FileText, Loader2, Plane, Scale3d, Workflow } from "lucide-react";
import { Suspense } from "react";

const DashboardPromise = async () => {
  const session = await auth();
  const userName = session?.user?.name || "User";

  const totalCases = await prisma.caseFile.count({
    where: {
      uploadedBy: {
        id: session?.user?.id,
      },
    },
  });

  const totalVisaComparisons = await prisma.visaComparison.count({
    where: {
      user: {
        id: session?.user?.id,
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  return (
    <div className="container mx-auto py-6 md:py-12 px-4 md:px-6 max-w-7xl">
      <div className="mb-8 md:mb-12">
        <CardTitle className="mb-2 md:mb-4 text-2xl md:text-3xl">
          Welcome back,{" "}
          <span className="text-green-500 dark:text-green-400">
            {user?.name ?? "User"}
          </span>{" "}
          👋
        </CardTitle>
        <CardDescription className="text-base md:text-lg">
          Ask me anything about{" "}
          <span className="text-green-500 dark:text-green-400">
            legal cases
          </span>{" "}
          and I&apos;ll help you find the information you need.
        </CardDescription>
        <ClientInfoButton />
      </div>

      {/* <ChatUI /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Cards
          totalCases={totalCases}
          title="Research insights"
          icon={<FileText />}
        />
        <Cards
          totalCases={totalVisaComparisons}
          title="Guidance Overview"
          icon={<Plane />}
        />
        <Cards
          totalCases={totalCases}
          title="Ethics usage"
          icon={<Scale3d />}
        />
        <Cards
          totalCases={totalCases}
          title="Governance & Compliance"
          icon={<Workflow />}
        />
      </div>
    </div>
  );
};

const DashboardSuspense = () => {
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
      <DashboardPromise />
    </Suspense>
  );
};

export default DashboardSuspense;
