"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function GetRecentCases() {
  const session = await auth();
  const user = await prisma.caseFile.findMany({
    where: {
      userId: session?.user?.id as string,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      casesummary: true,
    },
  });

  return user;
}
