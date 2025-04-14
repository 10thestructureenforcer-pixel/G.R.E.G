"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

type Result = {
  status: string;
  message: string;
  data?: any;
};

export async function EditProfileName(newName: string): Promise<Result> {
  try {
    const session = await auth();
    if (!session) {
      return {
        status: "error",
        message: "unAuthorized",
      };
    }
    const res = await prisma.user.update({
      data: {
        name: newName,
      },
      where: {
        id: session.user?.id,
      },
    });

    // console.log("the updated name is ", res);
    return {
      status: "success",
      message: "Updated Name Succesfully",
      data: res,
    };
  } catch (e) {
    // console.log(e);
    return {
      status: "error",
      message: "Error Occured while Updating",
    };
  }
}
