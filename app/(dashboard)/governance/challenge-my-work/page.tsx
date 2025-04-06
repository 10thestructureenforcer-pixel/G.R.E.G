import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ChallengeMyWork from "@/components/dashboard/governance/challenge-my-work";
import prisma from "@/lib/db";
import { auth } from "@/auth";

function LoadingSpinner() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default async function Page() {
  const session = await auth();

  const clients = await prisma.client.findMany({
    where: {
      user: {
        email: session?.user?.email!,
      },
    },
  });
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<LoadingSpinner />}>
        <ChallengeMyWork clients={clients} />
      </Suspense>
    </div>
  );
}
