"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function StoreRefineSummary(completion: string, caseId: string) {
  try {
    const session = await auth();

    if (!completion) {
      throw new Error("No completion");
    }

    // console.log(JSON.stringify(completion));
    // console.log("completion ISSSSSSSSSSSSSSS", completion.toString());
    // console.log("caseId", caseId);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const refinedSummary = await prisma.caseSummary.update({
      where: {
        caseFileId: caseId,
      },
      data: {
        refinedSummary: completion,
      },
    });
    return refinedSummary;
  } catch (e) {
    console.log(e);
  }
}
