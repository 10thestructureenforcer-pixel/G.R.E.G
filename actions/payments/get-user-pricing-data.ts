"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function getUserPricingData() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      planName: true,
      billingPeriod: true,
    },
  });
  return user;
}
