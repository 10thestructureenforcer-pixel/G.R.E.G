import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const chathistory = await prisma.chat.findMany({
      where: {
        User: {
          email: session.user.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log("the chathistory", chathistory);

    return NextResponse.json(chathistory);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
