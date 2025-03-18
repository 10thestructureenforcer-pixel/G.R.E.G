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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formdata = await request.formData();

    const session = await auth();

    console.log("the form data", formdata);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        case_file: true,
      },
    });

    console.log("the user is ", user);

    const file = body.file as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    console.log(file);

    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    const textcontent = await extractTextFromFile(fileBuffer, file.type);
    console.log("content is ", textcontent);
    console.log("hwll");

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 400,
      chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(textcontent);
    console.log(splitDocs);

    const fileContent = splitDocs.map((doc) => doc.pageContent).join("\n");
    console.log(fileContent);

    const llmSummary = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.3,
    });

    const summaryRefineTemplate = `
    You are an expert in summarizing complex documents, including legal, technical, and academic content.
    Your goal is to refine an existing summary of the provided document.
    We have provided an existing summary up to a certain point: {existing_answer}
    
    Below you find additional content from the document:
    --------
    {context}
    --------
    
    Given the new context, refine the summary and example questions.
    The document content will also be used as the basis for a question-and-answer bot.
    Provide some examples of specific questions and answers that could be asked about the document. Ensure the questions are relevant and directly tied to the content.
    If the new context isn't useful, return the original summary and questions.
    
    Total output will include:
    1. A refined summary of the document.
    2. A list of updated example questions and answers that could be asked about the document.
    
    SUMMARY AND QUESTIONS:
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

      return LangChainAdapter.toDataStreamResponse(stream);
    } catch (error) {
      console.error("Chain error:", error);
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
