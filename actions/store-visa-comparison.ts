"use server";
import prisma from "@/lib/db";

type visaDataType = {
  clientId: string;
  userId: string;
  clientName: string;
  visaType: string[];
  gptOutput: string;
};

type Result = {
  status: string;
  message: string;
  data: any;
};

export async function StoreVisaComparison(
  visaData: visaDataType
): Promise<Result> {
  try {
    const res = await prisma.visaComparison.create({
      data: {
        clientName: visaData.clientName,
        clientId: visaData.clientId,
        visaType: visaData.visaType,
        gptOutput: JSON.parse(visaData.gptOutput),
        userId: visaData.userId,
      },
    });

    return {
      status: "success",
      message: "Visa comparison stored successfully",
      data: res,
    };
  } catch (e) {
    console.log("Error in storing visa comparison", e);
    return {
      status: "error",
      message: "Error in storing visa comparison",
      data: null,
    };
  }
}
