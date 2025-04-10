"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

type Result = {
  status: "success" | "error" | "Unauthorized";
  message: string;
  data: any;
};

export async function getVisaHistory(): Promise<Result> {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        status: "Unauthorized",
        message: "Unauthorized",
        data: null,
      };
    }
    const res = await prisma.visaComparison.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log("sending......");

    return {
      status: "success",
      message: "Visa history fetched successfully",
      data: res,
    };
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Failed to get visa history",
      data: null,
    };
  }
}
