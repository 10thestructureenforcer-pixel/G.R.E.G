import { auth } from "@/auth";
import prisma from "@/lib/db";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id as string;

  if (!session?.user?.id) {
    return NextResponse.json({
      status: "error",
      message: "Unauthorized",
    });
  }

  const { challengeWorkOutput, id } = await req.json();

  const stream = await streamText({
    model: openai("gpt-4o-mini"),
    prompt: `
   You are an expert legal writing assistant specializing in immigration law. Your task is to refine and improve the following summary to ensure it is clear, professional, and legally precise. Focus on enhancing clarity, structure, grammar, and overall flow while preserving the original meaning and avoiding the introduction of new information.

Your goals are:
- Improve sentence structure and word choice for better readability and legal accuracy.
- Eliminate redundancy or unnecessary filler words.
- Maintain the original message and all factual or legal content.
- Use a formal, objective, and professional tone suitable for legal documents or case briefs.
- Ensure the refined version reads smoothly and logically for an audience familiar with legal or policy language.
- If the original summary contains vague or unclear language, rephrase it for precision — but do not assume facts not included in the original.
- Do not paraphrase legal terms or citations unless clarity demands it — retain all essential terminology used in immigration law.

You will be given an input in the following format:

Original Summary:
${challengeWorkOutput}

Provide your output in this format:

Refined Summary:
[Your improved version goes here]

    `,
    onFinish: async (ans) => {
      const refinedOutput = ans.text;
      await prisma.challengeWork.update({
        where: {
          id: id,
        },
        data: {
          refinedOutput: refinedOutput,
        },
      });
    },
  });

  return stream.toDataStreamResponse();
}
