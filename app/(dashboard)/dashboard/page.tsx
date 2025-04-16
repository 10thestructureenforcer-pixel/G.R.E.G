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

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      case_file: true,
      visaComparison: true,
      challengeWork: true,
      conflictAnalyze: true,
    },
  });
  if (!user) {
    return (
      <div>
        <div>
          <h1>No user found</h1>
        </div>
      </div>
    );
  }

  const totalNumberOfCases = user?.case_file.length;
  const totalNumberOfVisaComparisons = user?.visaComparison.length;
  const totalNumberOfChallengeWork = user?.challengeWork.length;
  const totalNumberOfConflictAnalyze = user?.conflictAnalyze.length;

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
          totalCases={totalNumberOfCases}
          title="Research insights"
          icon={<FileText />}
        />
        <Cards
          totalCases={totalNumberOfVisaComparisons}
          title="Guidance Overview"
          icon={<Plane />}
        />
        <Cards
          totalCases={totalNumberOfConflictAnalyze}
          title="Ethics usage"
          icon={<Scale3d />}
        />
        <Cards
          totalCases={totalNumberOfChallengeWork}
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
