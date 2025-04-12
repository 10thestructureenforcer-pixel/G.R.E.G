import { auth } from "@/auth";
import Chat from "@/components/dashboard/guidance/chat";
import prisma from "@/lib/db";
import { Session } from "@/lib/types";
import { Message } from "ai";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || !session.user.id) {
    return;
  }
  // console.log("the id ", id);

  const initalMessages = await prisma.message.findMany({
    where: {
      chatId: id,
    },
  });

  // console.log("the inital messages ", initalMessages);

  return (
    <div className="bg-white dark:bg-transparent ">
      <Suspense
        fallback={
          <div className="flex items-center justify-center ">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Loading chat history...
              </p>
            </div>
          </div>
        }
      >
        <Chat
          id={id}
          initalMessages={initalMessages as Message[]}
          session={session as Session}
        />
      </Suspense>
    </div>
  );
};

export default page;
