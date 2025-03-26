// import ChatUI from "@/components/dashboard/main-dashboard/chat-ui";
import { auth } from "@/auth";
import Cards from "@/components/dashboard/main-dashboard/cards";
import ClientInfoButton from "@/components/dashboard/main-dashboard/client-info-button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import prisma from "@/lib/db";

const page = async () => {
  const session = await auth();
  const userName = session?.user?.name || "User";

  const totalCases = await prisma.caseFile.count({
    where: {
      uploadedBy: {
        email: session?.user?.email,
      },
    },
  });

  return (
    <div className="container mx-auto py-6 md:py-12 px-4 md:px-6 max-w-7xl">
      <div className="mb-8 md:mb-12">
        <CardTitle className="mb-2 md:mb-4 text-2xl md:text-3xl">
          Welcome back,{" "}
          <span className="text-green-500 dark:text-green-400">{userName}</span>{" "}
          👋
        </CardTitle>
        <CardDescription className="text-base md:text-lg">
          Ask me anything about{" "}
          <span className="text-green-500 dark:text-green-400">
            legal cases
          </span>{" "}
          and I&apos;ll help you find the information you need.
        </CardDescription>
        <ClientInfoButton />
      </div>

      {/* <ChatUI /> */}
      <div className="w-full">
        <Cards totalCases={totalCases} />
      </div>
    </div>
  );
};

export default page;
