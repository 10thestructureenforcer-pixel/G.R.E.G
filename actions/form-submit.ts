"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

type Result = {
  status: "success" | "error";
  message: string;
};

export async function formSubmit(formData: any): Promise<Result> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        status: "error",
        message: "Unauthorized User",
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
            id: session.user.id,
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
