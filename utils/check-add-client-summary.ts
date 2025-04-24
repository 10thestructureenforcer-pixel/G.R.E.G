"use server";

import prisma from "@/lib/db";
import { PlanName } from "@/lib/types";
import { planLimits } from "./plan-limits";

export const getUserUsage = async (userId: string) => {
  const [user, summaryCount] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        planName: true,
        _count: {
          select: {
            client: true,
          },
        },
      },
    }),
    prisma.caseFile.count({
      where: { userId },
    }),
  ]);

  if (!user) throw new Error("User not found");
  const plan = (user.planName ?? "free") as PlanName;

  const limits = planLimits[plan];

  return {
    plan,
    clientCount: user._count.client,
    summaryCount,
    limits,
    canAddClient: user._count.client < limits.maxClientCount,
    canSummarize: summaryCount < limits.maxSummaryCount,
  };
};
