import ChatUI from "@/components/dashboard/main-dashboard/chat-ui";
import { auth } from "@/auth";
import { CardTitle, CardDescription } from "@/components/ui/card";

const page = async () => {
  const session = await auth();
  const userName = session?.user?.name || "User";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <CardTitle className="mb-2">Welcome back, {userName} 👋</CardTitle>
        <CardDescription>
          Ask me anything about legal cases and I&apos;ll help you find the
          information you need.
        </CardDescription>
      </div>

      <ChatUI />
    </div>
  );
};

export default page;
