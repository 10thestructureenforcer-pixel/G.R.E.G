import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { type, client, content } = await req.json();

    const stream = await streamText({
      model: openai("gpt-4o-mini"),
      prompt: `You are a senior U.S. immigration attorney.

Please act as a peer reviewer for the following legal draft prepared by a junior attorney (or AI assistant) for a client named ${client}.  
The draft is intended to be a **${type}**.

Your job is to **critically analyze the draft**, and return structured feedback in a professional, lawyer-to-lawyer tone.
You need to analyze and find out the issues ,critical errors and weaknesses in the draft and suggest the improvements.

Focus your review on:
- Weak arguments or unsupported claims
- Missing legal citations, case law, or regulations
- Lack of persuasive structure or flow
- Incomplete factual development (e.g., no evidence, vague language)
- Anything that would cause USCIS or an immigration judge to reject or question the document

Respond in this structured format:

1. 🔴 **Issue Title**  
   - Problem: Explain the weakness or gap  
   - Suggestion: Recommend specific improvements or citations

Keep the critique focused, practical, and improvement-oriented.

Here is the draft:
"""
${content}
"""

      
      `,
    });
    return stream.toDataStreamResponse();
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
    });
  }
}
