import { auth } from "@/auth";
import prisma from "@/lib/db";
import { getSupabaseUrl } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formdata = await request.formData();
    const session = await auth();

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        case_file: true,
      },
    });

    console.log(user);
    // Extract the file from form data
    const file = formdata.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileResut = await getSupabaseUrl(file);

    const fileInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    };

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

    console.log("the updatedFileUrl", updateFileUrl);

    return NextResponse.json({
      message: "File received successfully",
      fileInfo: fileInfo,
      fileResut,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
