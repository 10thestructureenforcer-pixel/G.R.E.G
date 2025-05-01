// import ChatUI from "@/components/dashboard/main-dashboard/chat-ui";
import { auth } from "@/auth";
import Cards from "@/components/dashboard/main-dashboard/cards";
import ClientInfoButton from "@/components/dashboard/main-dashboard/client-info-button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";

import { FileText, Loader2, Plane, Scale3d, Workflow } from "lucide-react";
import { Suspense } from "react";

interface User {
  id: string;
  name: string | null;
  _count: {
    case_file: number;
    visaComparison: number;
    challengeWork: number;
    conflictAnalyze: number;
  };
}

const DashboardPromise = async () => {
  const session = await auth();

  let user: User | null = null;
  const cachedUser = await redis.get(session?.user?.id as string);

  if (cachedUser && typeof cachedUser === "string") {
    try {
      user = JSON.parse(cachedUser) as User;
    } catch (error) {
      console.error("Error parsing cached user:", error);
    }
  }

  if (!user) {
    const userinfo = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            case_file: true,
            visaComparison: true,
            challengeWork: true,
            conflictAnalyze: true,
          },
        },
      },
    });

    if (!userinfo) {
      return <div>No user Found</div>;
    }

    user = userinfo;

    try {
      await redis.set(session?.user?.id as string, JSON.stringify(user), {
        ex: 300,
      });
    } catch (error) {
      console.error("Error caching user:", error);
    }
  }

  if (!user) {
    return <div>No user Found</div>;
  }

  return (
    <div className="container mx-auto py-6 md:py-12 px-4 md:px-6 max-w-7xl">
      <div className="mb-8 md:mb-12">
        <CardTitle className="mb-2 md:mb-4 text-2xl md:text-3xl">
          Welcome back,{" "}
          <span className="text-green-400 dark:text-green-500">
            {user.name ?? "User"}
          </span>{" "}
          👋
        </CardTitle>
        <CardDescription className="text-base md:text-lg">
          Ask me anything about{" "}
          <span className="text-neutral-700 dark:text-neutral-300">
            legal cases
          </span>{" "}
          and I&apos;ll help you find the information you need.
        </CardDescription>
        <ClientInfoButton />
      </div>

      {/* <ChatUI /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Cards
          totalCases={user._count.case_file}
          title="Research insights"
          icon={<FileText className="text-neutral-700 dark:text-neutral-300" />}
        />
        <Cards
          totalCases={user._count.visaComparison}
          title="Guidance Overview"
          icon={<Plane className="text-neutral-700 dark:text-neutral-300" />}
        />
        <Cards
          totalCases={user._count.conflictAnalyze}
          title="Ethics usage"
          icon={<Scale3d className="text-neutral-700 dark:text-neutral-300" />}
        />
        <Cards
          totalCases={user._count.challengeWork}
          title="Governance & Compliance"
          icon={<Workflow className="text-neutral-700 dark:text-neutral-300" />}
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
          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
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
