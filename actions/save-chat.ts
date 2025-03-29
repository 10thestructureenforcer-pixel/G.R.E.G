"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function saveChat({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    // console.log("the id ", chatId);
    // console.log("the title", title);

    const res = await prisma.chat.upsert({
      where: {
        id: chatId,
      },
      create: {
        id: chatId,
        title,
        User: {
          connect: {
            email: session.user.email,
          },
        },
      },
      update: {
        title,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to save chat");
  }
}
