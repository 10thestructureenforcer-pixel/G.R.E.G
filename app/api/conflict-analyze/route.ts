import { auth } from "@/auth";
import prisma from "@/lib/db";
import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await auth();
    const { clientName, sponsorCompany, opposingParty, A_number } = body;

    const [firstName, lastName] = clientName.trim().split(" ");

    const conflicts = [];

    // 1. Opposing Party vs Prior Client Names (within this lawyer’s clients)
    const opposingMatch = await prisma.client.findMany({
      where: {
        clientFirstName: opposingParty?.split(" ")[0] || "",
        clientLastName: opposingParty?.split(" ")[1] || "",
        user: {
          email: session?.user?.email,
        },
      },
      select: {
        clientFirstName: true,
        clientLastName: true,
        A_number: true,
        sponsorCompany: true,
      },
    });

    if (opposingMatch.length > 0) {
      conflicts.push({
        type: "opposingParty",
        message: `Opposing party ${opposingParty} is a past client of yours.`,
        matches: opposingMatch,
      });
    }

    // 2. Sponsor Company vs Prior Clients' Sponsor Companies
    const sponsorMatch = await prisma.client.findMany({
      where: {
        sponsorCompany: sponsorCompany || "",
      },
      select: {
        clientFirstName: true,
        clientLastName: true,
        A_number: true,
        sponsorCompany: true,
      },
    });

    if (sponsorMatch.length > 0) {
      conflicts.push({
        type: "sponsorCompany",
        message: `This sponsor company "${sponsorCompany}" has appeared in previous client records. 
    This is not necessarily a conflict but should be reviewed to ensure no loyalty or confidentiality risks.`,
        matches: sponsorMatch,
      });
    }

    // 3. Client Identity (Name or A-number) vs Existing Clients
    const identityMatch = await prisma.client.findMany({
      where: {
        user: {
          email: session?.user?.email,
        },
        OR: [
          {
            clientFirstName: firstName,
            clientLastName: lastName,
          },
          {
            A_number: A_number || "",
          },
        ],
      },
      select: {
        clientFirstName: true,
        clientLastName: true,
        A_number: true,
        sponsorCompany: true,
      },
    });

    if (identityMatch.length > 0) {
      conflicts.push({
        type: "identity",
        message: `Client ${clientName} or A-number ${A_number} already exists in your records.`,
        matches: identityMatch,
      });
    }

    return NextResponse.json({
      status: "success",
      conflictFound: conflicts.length > 0,
      conflicts,
    });
  } catch (error) {
    console.error("Conflict check error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to check conflicts",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
