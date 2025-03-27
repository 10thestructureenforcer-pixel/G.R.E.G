import React, { useEffect, useRef } from "react";
import { MemoizedMarkdown } from "@/components/markdown";
import { Session } from "@/lib/types";
import { Message } from "ai";
import { User2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessageProps {
  messages: Message[];
  status: "submitted" | "streaming" | "ready" | "error";
  session: Session;
  className?: string;
}

const UserMessage = ({
  content,
  index,
}: {
  content: string;
  index: number;
}) => {
  return (
    <div className="group relative flex gap-4 px-4 py-3 sm:px-6">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-blue-100 dark:bg-gray-800">
        <User2Icon className="h-4 w-4 text-blue-600 dark:text-green-400" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl bg-blue-50 dark:bg-stone-800/50 px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="prose dark:prose-invert break-words max-w-full text-base leading-relaxed text-gray-800 dark:text-gray-200">
            <MemoizedMarkdown content={content} id={`user-${index}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BotMessage = ({
  content,
  status,
  index,
}: {
  content: string;
  status: string;
  index: number;
}) => {
  return (
    <div className="group relative flex gap-4 px-4 py-3 sm:px-6">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <svg
          className="w-4 h-4 text-gray-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl bg-gray-50 dark:bg-zinc-800 px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="prose dark:prose-invert break-words max-w-full text-base leading-relaxed text-gray-800 dark:text-gray-200">
            <MemoizedMarkdown content={content} id={`bot-${index}`} />
          </div>
          {status === "streaming" && (
            <div className="flex gap-1.5 mt-3">
              <div
                className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({
  messages,
  status,
  session,
  className,
}: ChatMessageProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
      messagesEndRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (status === "streaming") {
      const scroll = () => {
        scrollToBottom();
        scrollRef.current = setTimeout(scroll, 50);
      };
      scrollRef.current = setTimeout(scroll, 50);

      return () => {
        if (scrollRef.current) {
          clearTimeout(scrollRef.current);
        }
      };
    }
  }, [status]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea className="h-full">
      <div
        ref={containerRef}
        className={`flex flex-col min-h-full max-w-3xl mx-auto ${
          className || ""
        }`}
      >
        {messages.map((message, index) =>
          message.role === "user" ? (
            <UserMessage key={index} content={message.content} index={index} />
          ) : (
            <BotMessage
              key={index}
              content={message.content}
              status={status}
              index={index}
            />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessage;
