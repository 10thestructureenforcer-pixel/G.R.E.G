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
