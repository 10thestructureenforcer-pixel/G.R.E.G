"use server";

import prisma from "@/lib/db";
import { RecentChallengeWork } from "@/lib/types";

type Result = {
  status: "success" | "error";
  data?: RecentChallengeWork[];
};

export async function getRecentChallengeWork(): Promise<Result> {
  try {
    const recentChallengeWork: RecentChallengeWork[] =
      await prisma.challengeWork.findMany({
        orderBy: { createdAt: "desc" },
      });

    return { status: "success", data: recentChallengeWork };
  } catch (e) {
    console.log(e);
    return { status: "error" };
  }
}
