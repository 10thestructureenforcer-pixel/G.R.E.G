"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { getUserUsage } from "@/utils/check-add-client-summary";

type Result = {
  status: "success" | "error";
  message: string;
};

export async function formSubmit(formData: any): Promise<Result> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!session?.user || !userId) {
      return {
        status: "error",
        message: "Unauthorized User",
      };
    }

    const usage = await getUserUsage(userId);

    if (!usage.canAddClient) {
      return {
        status: "error",
        message:
          "You have reached the maximum number of clients for this current plan",
      };
    }

    const {
      clientFirstName,
      clientLastName,
      clientEmail,
      clientAddress,
      nationality,
      visaStatus,
      legalConcern,
      A_number,
      sponsorCompany,
      opposingParty,
      clientPhone,
      dateOfBirth,
    } = formData;

    const user = await prisma.client.create({
      data: {
        clientFirstName,
        clientLastName,
        clientEmail,
        clientAddress,
        nationality,
        visaStatus,
        legalConcern,
        A_number,
        sponsorCompany,
        opposingParty,
        clientPhone,
        dateOfBirth,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      status: "success",
      message: "Client Created Successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to submit form",
    };
  }
}
