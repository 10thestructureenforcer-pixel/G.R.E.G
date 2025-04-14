"use server";

import prisma from "@/lib/db";
import { Client } from "@/lib/types";

type Result = {
  status: "success" | "error";
  message: string;
  data?: any;
};

export async function editClientManagement(
  clientId: string,
  updatedClient: Partial<Client>
): Promise<Result> {
  try {
    const client = await prisma.client.update({
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
    });

    return {
      status: "success",
      message: "Client updated successfully",
      data: client,
    };
  } catch (error) {
    console.error("Error updating client:", error);
    return {
      status: "error",
      message: "Error updating client",
    };
  }
}
