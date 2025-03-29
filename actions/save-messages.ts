"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { generateId } from "ai";

export async function saveMessages(data: any) {
  try {
    const session = await auth();
    const { messages } = data;

    const res = await prisma.message.upsert({
      where: {
        id: messages[0].id,
      },
      create: {
        id: messages[0].id,
        content: messages[0].content,
        role: messages[0].role,
        chatId: messages[0].chatId,
      },
      update: {
        content: messages[0].content,
        role: messages[0].role,
        chatId: messages[0].chatId,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to save messages");
  }
}
