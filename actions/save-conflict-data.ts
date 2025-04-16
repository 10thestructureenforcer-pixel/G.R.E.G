"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Conflict, Matches } from "@/lib/types";

export async function saveConflictData(conflictData: Matches) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not found");
    }

    await prisma.conflictAnalyze.create({
      data: {
        conflictANumber: conflictData.A_number,
        conflictClientName: conflictData.clientName,
        conflictSponsorCompanyName: conflictData.sponsorCompany,
        conflictOpposingParty: conflictData.opposingParty,
        conflictType: conflictData.type,
        userId: session?.user.id,
      },
    });

    console.log("Conflict data saved successfully");
  } catch (e) {
    console.log(e);
    throw new Error("Failed to save conflict data");
  }
}
