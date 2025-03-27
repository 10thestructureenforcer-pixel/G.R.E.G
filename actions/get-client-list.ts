"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function getClientList() {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const clientList = await prisma.client.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        updatedAt: true,
      },
    });
    return clientList;
  } catch (e) {
    console.log(e);
  }
}
