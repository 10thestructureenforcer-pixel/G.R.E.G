import { auth } from "@/auth";
import prisma from "@/lib/db";
import { extractTextFromFile } from "@/lib/text-extract";
import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { LangChainAdapter } from "ai";
import { getSupabaseUrl } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const session = await auth();

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        case_file: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        error: "No user found",
      });
    }

    const attachments = body.messages[0].experimental_attachments;

    if (!attachments || attachments.length === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const attachment = attachments[0];
    // console.log("the atatchment is ", attachment);

    if (!attachment.url || !attachment.url.startsWith("data:")) {
      return NextResponse.json(
        { error: "Invalid file format" },
        { status: 400 }
      );
    }

    const base64Data = attachment.url.split(",")[1];
    const fileBuffer = Buffer.from(base64Data, "base64");
    console.log("Filebuffer", fileBuffer);
    const fileType =
      attachment.contentType || attachment.url.split(";")[0].split(":")[1];

    const fileName =
      attachment.name || `file-${Date.now()}.${fileType.split("/")[1]}`;

    const supabaseUploadUrl = await getSupabaseUrl(
      fileBuffer,
      fileName,
      fileType
    );
    // console.log("the supabase url", supabaseUploadUrl.fileUrl);

    const updatedsupabaseUrl = await prisma.caseFile.create({
      data: {
        fileUrl: supabaseUploadUrl.fileUrl,
        title: supabaseUploadUrl.fileName,
        userId: user?.id,
      },
    });

    revalidatePath("/research");
    // redirect("/research");

    const textcontent = await extractTextFromFile(fileBuffer, fileType);
    // console.log("content is ", textcontent);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 400,
      chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(textcontent);
    // console.log(splitDocs);

    const fileContent = splitDocs.map((doc) => doc.pageContent).join("\n");
    console.log(fileContent);

    const llmSummary = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.3,
    });

    const summaryRefineTemplate = `
  You are an expert in analyzing and summarizing complex documents, including legal, technical, and academic materials. Your task is to refine an existing summary based on newly provided document content.
     Input:
An existing partial or initial summary: {existing_answer}
New additional content from the document:
Copy
Edit
{context}
Your tasks:
Refine and improve the existing summary by incorporating relevant information from the additional document content. Ensure clarity, conciseness, and completeness while maintaining alignment with the original summary tone.
    
    `;

    const prompt = PromptTemplate.fromTemplate(summaryRefineTemplate);
    const summarizeChain = await createStuffDocumentsChain({
      llm: llmSummary,
      outputParser: new StringOutputParser(),
      prompt: prompt,
    });

    try {
      const stream = await summarizeChain.stream({
        context: splitDocs,
        existing_answer: "",
      });

      console.log("Summarization streaming started");

      return LangChainAdapter.toDataStreamResponse(stream, {
        callbacks: {
          onFinal: async (completion) => {
            await prisma.caseSummary.create({
              data: {
                summary: completion,
                caseFileId: updatedsupabaseUrl.id,
                status: "SUCCESS",
              },
            });
          },
        },
      });
    } catch (error) {
      console.error("Chain error:", error);
      await prisma.caseSummary.update({
        where: {
          caseFileId: updatedsupabaseUrl.id,
        },
        data: {
          status: "FAILED",
        },
      });
      return NextResponse.json(
        {
          error: "Failed to summarize document",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
