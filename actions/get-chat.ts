"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function getChat({ id }: { id: string }) {
  try {
    const session = await auth();
    const chat = await prisma.chat.findMany({
      where: {
        id: id,
      },
    });

    // console.log("the returned chat is ...", chat);
    return chat;
  } catch (error) {
    console.log("error in get chat", error);
    throw new Error("Failed to get chat");
  }
}
