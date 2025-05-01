"use server";

import prisma from "@/lib/db";
import { PlanName, UserUsage } from "@/lib/types";
import { planLimits } from "./plan-limits";
import { redis } from "@/lib/redis";

export const getUserUsage = async (userId: string): Promise<UserUsage> => {
  const cacheKey = `user-${userId}-usage`;

  const cachedUsage = await redis.get<UserUsage>(cacheKey);

  if (cachedUsage) {
    return cachedUsage;
  }

  const [user, summaryCount, challengeWorkCount] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        planName: true,
        isSubscribed: true,
        stripeCurrentPeriodEnd: true,
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
    prisma.challengeWork.count({
      where: { userId },
    }),
  ]);

  if (!user) throw new Error("User not found");

  const now = new Date();

  const subscriptionExpired =
    user.stripeCurrentPeriodEnd && user.stripeCurrentPeriodEnd < now;

  if (user.isSubscribed && subscriptionExpired) {
    await prisma.user.update({
      where: { id: userId },
      data: { isSubscribed: false },
    });

    user.isSubscribed = false;

    console.log(
      `Updated user ${user.id} subscription status to false as period has ended`
    );
  }

  const isProUser =
    user.isSubscribed ||
    (user.stripeCurrentPeriodEnd && user.stripeCurrentPeriodEnd > now);
  const plan = (isProUser ? user.planName ?? "free" : "free") as PlanName;

  const limits = planLimits[plan];

  const userUsage = {
    plan,
    clientCount: user._count.client,
    summaryCount,
    limits,
    canAddClient: user._count.client < limits.maxClientCount,
    canSummarize: summaryCount < limits.maxSummaryCount,
    canChallengeWork: challengeWorkCount < limits.maxChallengeWorkCount,
  };

  await redis.set(cacheKey, userUsage, { ex: 86400 });
  return userUsage;
};
