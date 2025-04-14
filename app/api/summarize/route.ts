import { auth } from '@/auth';
import prisma from '@/lib/db';
import { extractTextFromFile } from '@/lib/text-extract';
import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { LangChainAdapter } from 'ai';
import { getSupabaseUrl } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

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
        error: 'No user found',
      });
    }

    const attachments = body.messages[0].experimental_attachments;

    if (!attachments || attachments.length === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const attachment = attachments[0];
    // console.log("the atatchment is ", attachment);

    if (!attachment.url || !attachment.url.startsWith('data:')) {
      return NextResponse.json(
        { error: 'Invalid file format' },
        { status: 400 },
      );
    }

    const base64Data = attachment.url.split(',')[1];
    const fileBuffer = Buffer.from(base64Data, 'base64');
    console.log('Filebuffer', fileBuffer);
    const fileType =
      attachment.contentType || attachment.url.split(';')[0].split(':')[1];

    const fileName =
      attachment.name || `file-${Date.now()}.${fileType.split('/')[1]}`;

    const supabaseUploadUrl = await getSupabaseUrl(
      fileBuffer,
      fileName,
      fileType,
    );
    // console.log("the supabase url", supabaseUploadUrl.fileUrl);

    const updatedsupabaseUrl = await prisma.caseFile.create({
      data: {
        fileUrl: supabaseUploadUrl.fileUrl,
        title: supabaseUploadUrl.fileName,
        userId: user?.id,
      },
    });

    revalidatePath('/research');
    // redirect("/research");

    const textcontent = await extractTextFromFile(fileBuffer, fileType);
    // console.log("content is ", textcontent);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 400,
      chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(textcontent);

    const fileContent = splitDocs.map((doc) => doc.pageContent).join('\n');
    console.log(fileContent);

    // // Create initial CaseSummary record
    // await prisma.caseSummary.create({
    //   data: {
    //     status: "PENDING",
    //     caseFileId: updatedsupabaseUrl.id,
    //     summary: "",
    //   },
    // });

    const llmSummary = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0.3,
    });

    const summaryRefineTemplate = `
  You are an expert multilingual document analyst and summarizer, specializing in creating comprehensive, well-structured summaries of complex documents. Your task is to analyze and summarize content while maintaining high accuracy and clarity.

Input:

Previous Summary: {existing_answer}
New Content to Analyze: {context}

Instructions for Analysis and Summary:

1. Language Detection and Handling:
   - First, identify the primary language of the document
   - If non-English, begin with: "Original Language: [Language Name] | English Summary Follows"
   - Provide all summaries in clear, professional English

2. Document Structure Analysis:
   - Start with complete citation/reference details if available
   - Identify document type (legal, academic, technical, business, etc.)
   - Note key sections and their hierarchy

3. Content Summary Requirements:
   - Begin with a one-paragraph executive summary (2-3 sentences)
   - Organize main points in a clear, hierarchical structure
   - Include all critical facts, figures, and dates
   - Preserve important quotes, using "..." for direct quotations
   - Maintain technical accuracy while ensuring accessibility

4. Key Elements to Extract and Highlight:
   - Main arguments or findings
   - Critical dates and deadlines
   - Key stakeholders or parties involved
   - Important numerical data or statistics
   - Significant conclusions or recommendations
   - Any crucial legal, technical, or procedural requirements

5. Format and Structure:
   Executive Summary:
   [2-3 sentence overview]

   Key Points:
   • [Main Point 1]
   • [Main Point 2]
   • [Main Point 3]

   Detailed Analysis:
   [Organized breakdown of major sections and findings]

   Important Details:
   - [Critical detail 1]
   - [Critical detail 2]
   - [Critical detail 3]

   Conclusions/Recommendations (if applicable):
   [Summary of conclusions or key takeaways]

6. Quality Guidelines:
   - Maintain objectivity and professional tone
   - Ensure accuracy in technical terms and concepts
   - Preserve the original meaning while making content accessible
   - Highlight any uncertainties or areas needing clarification
   - Keep the summary concise but comprehensive

Remember: Focus on accuracy, clarity, and maintaining the document's essential meaning while making it accessible to English readers. If technical terms are used, provide brief explanations where necessary.
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
        existing_answer: '',
      });

      console.log('Summarization streaming started');

      return LangChainAdapter.toDataStreamResponse(stream, {
        callbacks: {
          onFinal: async (completion) => {
            await prisma.caseSummary.create({
              data: {
                summary: completion,
                status: 'SUCCESS',
                caseFileId: updatedsupabaseUrl.id,
              },
            });
            console.log('Summary saved successfully');
          },
        },
      });
    } catch (error) {
      console.error('Chain error:', error);
      await prisma.caseSummary.update({
        where: {
          caseFileId: updatedsupabaseUrl.id,
        },
        data: {
          status: 'FAILED',
        },
      });
      return NextResponse.json(
        {
          error: 'Failed to summarize document',
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const url = new URL(request.url);
//     console.log("URL", url);

//     const caseId = url.searchParams.get("casefileId");
//     console.log("Event ID", caseId);

//     if (!caseId) {
//       throw new Error("Missing caseId");
//     }

//     const statusinfo = await prisma.caseSummary.findUnique({
//       where: {
//         caseFileId: caseId,
//       },
//       select: {
//         status: true,
//       },
//     });

//     return NextResponse.json({
//       status: 200,
//       statusinfo,
//     });
//   } catch (e) {
//     console.error("Error processing request:", e);
//     return NextResponse.json(
//       { error: "Failed to process request" },
//       { status: 500 }
//     );
//   }
// }
