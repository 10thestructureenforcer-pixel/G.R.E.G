import { auth } from "@/auth";
import Chat from "@/components/dashboard/guidance/chat";
import { Session } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import React, { Suspense } from "react";
// import SearchCaseAnalysis from "@/components/dashboard/guidance/search-case-analysis";

const ChatMessage = async () => {
  const id = generateUUID();
  const session = await auth();
  console.log(id);

  if (!session?.user) {
    return <div>No user found</div>;
  }
  return <Chat id={id} session={session as Session} initalMessages={[]} />;
};

const Page = () => {
  return (
    <div className="bg-white dark:bg-transparent">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading chat...</p>
            </div>
          </div>
        }
      >
        <div className="relative">
          <ChatMessage />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
