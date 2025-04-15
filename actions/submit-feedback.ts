"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

type FeedbackResponse = {
  status: "success" | "error";
  message: string;
};

export async function SubmitFeedback(
  feedback: string
): Promise<FeedbackResponse> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }
    const res = await prisma.feedback.create({
      data: {
        userId: session?.user?.id,
        feedback: feedback,
      },
    });

    return {
      status: "success",
      message: "Feedback submitted successfully",
    };
  } catch (e) {
    return {
      status: "error",
      message: "Failed to submit feedback",
    };
  }
}
