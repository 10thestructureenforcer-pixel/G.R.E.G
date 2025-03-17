import { auth } from "@/auth";
import prisma from "@/lib/db";
import { getSupabaseUrl } from "@/lib/supabase";
import { extractTextFromFile } from "@/lib/text-extract";
import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: NextRequest) {
  try {
    const formdata = await request.formData();
    const session = await auth();

    console.log("the form data is ", formdata);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        case_file: true,
      },
    });

    console.log("the user is ", user);

    const file = formdata.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    const textcontent = await extractTextFromFile(fileBuffer, file.type);
    console.log("content is ", textcontent);
    console.log("hwll");

    let fullText = "";
    if (Array.isArray(textcontent)) {
      fullText = textcontent.map((doc) => doc.pageContent).join("\n\n");
    }

    console.log("full text is ", fullText);

    const fileResut = await getSupabaseUrl(file);
    console.log("the file result is ", fileResut);

    if (!fileResut) {
      return NextResponse.json(
        { error: "Failed to upload file nooooo" },
        { status: 500 }
      );
    }

    const fileInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    };
    console.log(fileInfo);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateFileUrl = await prisma.caseFile.create({
      data: {
        title: fileResut.fileName,
        fileUrl: fileResut.fileUrl,
        userId: user.id,
      },
    });

    const result = streamText({
      model: openai("gpt-4"),
      system: "You are a helpful assistant.",
      prompt: `Summarize the following text: ${fullText}. Respond in markdown format where necessary.
      Your job would be to do the following:
      - Condense information from a larger source
      - Capture key ideas and important details
      - Omit minor or less relevant information
      - Present information concisely
      - Give a brief summary 
      - Help readers quickly grasp the main concepts`,

      onFinish: async ({ text }) => {
        await prisma.caseSummary.upsert({
          where: {
            caseFileId: updateFileUrl.id,
          },
          update: {
            summary: text as string,
          },
          create: {
            summary: text as string,
            caseFileId: updateFileUrl.id,
          },
        });
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
