import {
  convertToCoreMessages,
  CoreUserMessage,
  Message,
  streamText,
  UIMessage,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { saveChat } from "@/actions/save-chat";
import { saveMessages } from "@/actions/save-messages";
import { generateUUID } from "@/lib/utils";
import { getChat } from "@/actions/get-chat";

function getMostRecentUserMessage(messages: Array<UIMessage>) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.at(-1);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      messages,
      clientInfo,
      chatId,
    }: { messages: UIMessage[]; clientInfo: any; chatId: string } = body;
    // console.log(messages, clientInfo);

    const clientDetails = clientInfo
      ? JSON.stringify(clientInfo, null, 2)
      : "No client information provided";
    const selectedTopic = clientInfo?.prompt || "No specific topic selected";

    const coreMessages = convertToCoreMessages(messages);
    // console.log("the core messages", coreMessages);

    const userMessage = getMostRecentUserMessage(messages) as CoreUserMessage;
    // console.log("the user message ", userMessage);

    const chat = await getChat({ id: chatId });

    // Save the chat first
    if (chat.length === 0) {
      await saveChat({
        chatId,
        title: userMessage.content.slice(0, 50) + "...",
      });
    }

    // Save the user message
    const userMessageId = generateUUID();
    await saveMessages({
      messages: [
        {
          id: userMessageId,
          chatId: chatId,
          role: "user",
          content: userMessage.content,
        },
      ],
    });

    const result = streamText({
      model: openai.responses("gpt-4o-mini"),
      system: `You are an experienced immigration lawyer AI assistant. Your role is to provide professional legal guidance based on the following client information:

Client Information: ${clientDetails},If user does not provide any information, just use your context to refer user name
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
      messages: coreMessages,
      onFinish: async (response) => {
        try {
          // Save the assistant's message
          const assistantMessageId = generateUUID();
          await saveMessages({
            messages: [
              {
                id: assistantMessageId,
                chatId: chatId,
                role: "assistant",
                content: response.text,
              },
            ],
          });
          console.log("Successfully saved assistant message");
        } catch (error) {
          console.error("Failed to save assistant message:", error);
          // Don't throw here as the streaming is already complete
        }
      },
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
