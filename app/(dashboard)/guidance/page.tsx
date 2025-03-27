import { auth } from "@/auth";
import Chat from "@/components/dashboard/guidance/chat";
import { Session } from "@/lib/types";
import { generateUUID } from "@/lib/utils";

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
    <div className=" bg-white dark:bg-transparent ">
      <Suspense fallback={<div>Loading...</div>}>
        <ChatMessage />
      </Suspense>
    </div>
  );
};

export default Page;
