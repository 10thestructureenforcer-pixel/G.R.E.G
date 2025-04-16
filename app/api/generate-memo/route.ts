import { modelRule1_6, modelRule1_7 } from "@/lib/law-info";
import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const stream = await streamText({
    model: openai("gpt-4o-mini"),

    prompt: prompt,
    system: `You are an expert legal memo writer specializing in conflict of interest analysis. Your task is to analyze the provided conflict scenario and write a comprehensive legal memo that:

    1. Clearly identifies the potential conflict of interest issues
    2. Analyzes the situation under Model Rule 1.6 (Confidentiality) and Model Rule 1.7 (Conflict of Interest)
    3. Provides a structured analysis including:
       - Factual background
       - Legal analysis
       - Application of relevant rules
       - Potential risks and considerations
       - Recommendations for resolution

    Reference the following rules in your analysis:
    ${modelRule1_6}
    ${modelRule1_7}

    Your memo should be:
    - Professional and well-structured
    - Clear and concise
    - Based on the facts provided
    - Focused on practical solutions
    - Written in a formal legal style`,
    onFinish: (data) => {
      // console.log("finished");
      console.log(data);
    },
  });

  console.log("the text is", stream);
  return stream.toDataStreamResponse();
}
