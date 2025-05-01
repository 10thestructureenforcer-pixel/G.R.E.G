import { auth } from "@/auth";
import prisma from "@/lib/db";
import { extractTextFromFile } from "@/lib/text-extract";
import { Client } from "@/lib/types";
import { getUserUsage } from "@/utils/check-add-client-summary";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextRequest, NextResponse } from "next/server";

type ReviewRequestBody = {
  type: string;
  client: Client;
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({
        status: "error",
        message: "Unauthorized",
      });
    }
    const body = await req.json();

    const { type, client, draftMode } = body;
    let content = body.content;
    console.log("the draft mode is ", draftMode);

    const userUsage = await getUserUsage(userId);
    console.log("the user usage is ", userUsage);

    if (!userUsage.canChallengeWork) {
      return new Response(
        "You have reached the maximum number of challenge works.",
        {
          status: 429,
        }
      );
    }
    if (draftMode === "upload") {
      const attachments = body.messages[0].experimental_attachments;

      if (!attachments || attachments.length === 0) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }

      const attachment = attachments[0];
      console.log(attachment);
      if (!attachment.url || !attachment.url.startsWith("data:")) {
        return NextResponse.json(
          { error: "Invalid file format" },
          { status: 400 }
        );
      }

      const base64Data = attachment.url.split(",")[1];
      const fileBuffer = Buffer.from(base64Data, "base64");
      // console.log("Filebuffer", fileBuffer);
      const fileType =
        attachment.contentType || attachment.url.split(";")[0].split(":")[1];

      const fileName =
        attachment.name || `file-${Date.now()}.${fileType.split("/")[1]}`;

      const textcontent = await extractTextFromFile(fileBuffer, fileType);

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 400,
        chunkOverlap: 200,
      });
      const splitDocs = await splitter.splitDocuments(textcontent);

      const fileContent = splitDocs.map((doc) => doc.pageContent).join("\n");

      content = fileContent;
      console.log("the content is ", content);
    }

    const { id, clientFirstName, clientLastName } = client;
    const clientId = id;
    const clientName = `${clientFirstName} ${clientLastName}`;

    if (!type || !client || !content) {
      return NextResponse.json({
        status: "error",
        message: "Missing required fields",
      });
    }

    if (!userId) {
      return NextResponse.json({
        status: "error",
        message: "Unauthorized",
      });
    }

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
      onFinish: async (data) => {
        const challenges = data.text;
        await prisma.challengeWork.create({
          data: {
            userId: userId,
            clientId: clientId,
            draftContent: content,
            responseType: type,
            challengeWorkOutput: challenges,
            clientName: clientName,
          },
        });
      },
    });
    return stream.toDataStreamResponse();
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
    });
  }
}
