import perplexity from "@/lib/providers/perplexity";
import { streamText, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages, clientInfo }: { messages: UIMessage[]; clientInfo: any } =
      await req.json();
    console.log(messages, clientInfo);

    const clientDetails = clientInfo
      ? JSON.stringify(clientInfo, null, 2)
      : "No client information provided";
    const selectedTopic = clientInfo?.prompt || "No specific topic selected";

    const result = streamText({
      model: openai.responses("gpt-4o-mini"),
      system: `You are an experienced immigration lawyer AI assistant. Your role is to provide professional legal guidance based on the following client information:

Client Information: ${clientDetails}
Selected Immigration Topic: ${selectedTopic}

Please provide:
1. A clear analysis of the client's situation
2. Relevant immigration laws and regulations
3. Potential legal options and their implications
4. Recommended next steps
5. Important considerations and potential challenges

Note: While providing guidance, please:
- Maintain professional and ethical standards
- Clearly state when a situation requires consultation with a licensed attorney
- Include relevant legal citations where appropriate
- Explain complex legal concepts in clear, understandable terms
- Highlight any time-sensitive matters or deadlines`,
      messages,
    });

    return result.toDataStreamResponse({
      sendSources: true,
      getErrorMessage(error) {
        console.error("Chat API error:", error);
        return "Failed to process chat request";
      },
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
