import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
const SessionWrapper = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider refetchInterval={5 * 60} session={session}>
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;
