import perplexity from "@/lib/providers/perplexity";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: perplexity("sonar") as any,
      prompt: prompt,
    });

    return result.toDataStreamResponse({
      sendSources: true,
    });
  } catch (e) {
    console.error("Chat API error:", e);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
