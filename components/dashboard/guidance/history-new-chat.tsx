import {
  DialogTitle,
  DialogTrigger,
  DialogContent,
  Dialog,
  DialogHeader,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, History, User2Icon, Loader2, Clock } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Message } from "ai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

const HistoryAndNewChat = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const router = useRouter();

  const { data: chats, isLoading } = useQuery<Chat[]>({
    queryKey: ["chat-history"],
    queryFn: async () => {
      const res = await axios.get("/api/history");
      return res.data;
    },
    enabled: isHistoryOpen,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleChatClick = (chatId: string) => {
    router.push(`/guidance/chat/${chatId}`);
    setIsHistoryOpen(false);
  };

  return (
    <div>
      {/* Desktop buttons - positioned on the right side */}
      <div className="hidden md:flex fixed right-6 top-24 flex-col gap-3 z-10">
        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DialogTrigger asChild>
            <div className="p-3 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-zinc-900 transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer">
              <History className="h-5 w-5 mr-2" />
              <span>History</span>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-800">
            <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Chat History
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh]">
              <div className="px-6 py-4 space-y-3">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                  </div>
                ) : chats && chats.length > 0 ? (
                  chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatClick(chat.id)}
                      className="group p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-200 dark:hover:border-green-800 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-white dark:bg-zinc-700 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                            <History className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400">
                              {chat.title || "Untitled Chat"}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3" />
                              <span>
                                {new Date(chat.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <svg
                              className="h-4 w-4 text-green-600 dark:text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <History className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      No chat history found
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Start a new chat to see it here
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <div
          onClick={() => {
            router.push("/guidance/chat");
          }}
          className="p-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-zinc-900 transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          <span>New Chat</span>
        </div>
      </div>

      {/* Mobile buttons - positioned at the top right */}
      <div className="md:hidden fixed top-4 right-4 flex gap-2 z-10">
        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DialogTrigger asChild>
            <div className="p-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-zinc-900 transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer group">
              <History className="h-5 w-5" />
              <span className="absolute right-full mr-2 bg-white dark:bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-200 dark:border-gray-700">
                History
              </span>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-800">
            <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Chat History
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh]">
              <div className="px-6 py-4 space-y-3">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                  </div>
                ) : chats && chats.length > 0 ? (
                  chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatClick(chat.id)}
                      className="group p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-200 dark:hover:border-green-800 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-white dark:bg-zinc-700 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                            <History className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400">
                              {chat.title || "Untitled Chat"}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3" />
                              <span>
                                {new Date(chat.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <svg
                              className="h-4 w-4 text-green-600 dark:text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <History className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      No chat history found
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Start a new chat to see it here
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <div
          onClick={() => {
            router.push("/guidance/chat");
          }}
          className="p-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-zinc-900 transition-all duration-200 flex items-center shadow-md hover:shadow-lg cursor-pointer group"
        >
          <PlusCircle className="h-5 w-5" />
          <span className="absolute right-full mr-2 bg-white dark:bg-zinc-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
            New Chat
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryAndNewChat;
