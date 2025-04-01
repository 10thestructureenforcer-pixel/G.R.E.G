import prisma from "@/lib/db";
import { visaComparisonSchema } from "@/lib/schema";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const comparisonData = await req.json();
    console.log("Received comparison data:", comparisonData);

    const clientInfo = await prisma.client.findUnique({
      where: {
        id: comparisonData.clientId,
      },
    });

    if (!clientInfo) {
      throw new Error("Client not found");
    }

    const clientDetails = {
      name: `${clientInfo.clientFirstName} ${clientInfo.clientLastName}`,
      nationality: clientInfo.nationality,
      currentLocation: clientInfo.clientAddress,
      visaStatus: clientInfo.visaStatus,
      legalConcern: clientInfo.legalConcern,
    };

    const result = streamObject({
      model: openai("gpt-4o-mini"),
      output: "object",
      schema: visaComparisonSchema,
      prompt: `You are a visa comparison expert. Compare the following visa types for the client: ${comparisonData.selectedVisas.join(
        ", "
      )} 

Client Information:
- Name: ${clientDetails.name}
- Nationality: ${clientDetails.nationality}
- Current Location: ${clientDetails.currentLocation}
- Current Visa Status: ${clientDetails.visaStatus}
- Legal Concern: ${clientDetails.legalConcern}

For EACH visa type listed above, provide a detailed comparison in the following format:
{
  "comparisons": [
    {
      "visaType": "VISA_TYPE_1",
      "eligibility": {
        "requirements": ["requirement1", "requirement2", ...],
        "qualifications": ["qualification1", "qualification2", ...],
        "restrictions": ["restriction1", "restriction2", ...]
      },
      "timeline": {
        "processingTime": "estimated processing time",
        "steps": ["step1", "step2", ...],
        "estimatedDuration": "total duration"
      },
      "risks": {
        "redFlags": ["risk1", "risk2", ...],
        "riskLevel": "LOW/MEDIUM/HIGH",
        "mitigationStrategies": ["strategy1", "strategy2", ...]
      },
      "documents": {
        "required": ["document1", "document2", ...],
        "optional": ["optional1", "optional2", ...],
        "specialRequirements": ["special1", "special2", ...]
      },
      "recommendation": {
        "suitability": "RECOMMENDED/CONSIDER/NOT_RECOMMENDED",
        "reasoning": "detailed reasoning",
        "alternatives": ["alternative1", "alternative2", ...]
      }
    },
    // Repeat for each visa type
  ]
}

Important:
1. Provide a separate comparison object for EACH visa type in the comparisons array
2. Ensure all required fields are filled out for each visa type
3. Make recommendations based on the client's specific background and circumstances
4. Include specific details about how each visa type relates to the client's situation`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in visa comparison:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process visa comparison" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
