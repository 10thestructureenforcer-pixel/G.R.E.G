import { StoreRefineSummary } from "@/actions/store-refined-summary";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, caseId } = await req.json();
    console.log("the prompt is ", prompt);

    const stream = await streamText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
      system: `Your Task is to refine the summary  of the case document with more details.
      You need to make sure the summary is concise and to the point.
      You need to make sure the summary is accurate and to the point.
      You need to make sure the summary is grammatically correct.
      You need to make sure the summary is grammatically correct.
      You need to make sure the summary is grammatically correct.
      Make it more intuitive and easier to understand.
      Try to make it more long and detailed than the original summary.
      Make sure and use context of original summary and add more details.
      `,
      onFinish: async (ans) => {
        await StoreRefineSummary(ans.steps[0].text, caseId);
      },
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    console.log(error);
  }
}
