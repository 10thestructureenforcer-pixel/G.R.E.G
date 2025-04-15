"use server";

import prisma from "@/lib/db";
import { Client, SettingsUser } from "@/lib/types";
import { revalidatePath } from "next/cache";

type Result = {
  status: "success" | "error";
  message: string;
  data?: Client;
  client?: Client[];
};

export async function editClientManagement(
  clientId: string,
  updatedClient: Partial<Client>
): Promise<Result> {
  try {
    const res = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        clientFirstName: updatedClient.clientFirstName,
        clientMiddleName: updatedClient.clientMiddleName,
        clientLastName: updatedClient.clientLastName,
        clientEmail: updatedClient.clientEmail,
        clientPhone: updatedClient.clientPhone,
        clientAddress: updatedClient.clientAddress,
        dateOfBirth: updatedClient.dateOfBirth,
        nationality: updatedClient.nationality,
        A_number: updatedClient.A_number,
        visaStatus: updatedClient.visaStatus,
        legalConcern: updatedClient.legalConcern,
        sponsorCompany: updatedClient.sponsorCompany,
        opposingParty: updatedClient.opposingParty,
      },
      include: {
        user: {
          include: {
            client: true,
          },
        },
      },
    });

    const { user } = res;

    // revalidatePath("/dashboard/settings");

    return {
      status: "success",
      message: "Client updated successfully",
      data: res,
      client: user.client,
    };
  } catch (error) {
    console.error("Error updating client:", error);
    return {
      status: "error",
      message: "Error updating client",
    };
  }
}
