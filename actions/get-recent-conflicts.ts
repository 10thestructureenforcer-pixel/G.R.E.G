"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { ConflictAnalyze } from "@prisma/client";

type Result = {
  status: "success" | "error";
  data?: ConflictAnalyze[];
  message?: string;
};

export async function getRecentConflicts(): Promise<Result> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not found");
    }

    const recentConflicts = await prisma.conflictAnalyze.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return { status: "success", data: recentConflicts };
  } catch (e) {
    console.error("Error fetching recent conflicts:", e);
    return {
      status: "error",
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
