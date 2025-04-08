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
    <div className="group relative flex gap-1.5  sm:gap-4 px-0 sm:px-4 py-1.5 sm:py-3">
      <div className="flex h-5 w-5 sm:h-8 sm:w-8 shrink-0 select-none items-center justify-center rounded-full bg-blue-100  dark:bg-gray-800">
        <User2Icon className="h-2.5 w-2.5 sm:h-4 sm:w-4 text-blue-600 dark:text-green-400" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-stone-800/50 px-2 sm:px-4 py-1.5 sm:py-3 shadow-sm border border-gray-100 dark:border-gray-700 w-64 sm:w-full">
          <div className="prose text-wrap dark:prose-invert break-words  text-xs sm:text-base leading-relaxed text-gray-800 dark:text-gray-200">
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
    <div className="group relative flex gap-1.5 sm:gap-4 px-0 sm:px-4 py-1.5 sm:py-3">
      <div className="flex h-5 w-5 sm:h-8 sm:w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <svg
          className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-gray-600 dark:text-green-400"
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
        <div className="rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-zinc-800 px-2 sm:px-4 py-1.5 sm:py-3 shadow-sm border border-gray-100 dark:border-gray-700 w-64 sm:w-full">
          <div className="overflow-x-auto">
            <div className="prose dark:prose-invert break-words text-xs sm:text-base leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              <MemoizedMarkdown content={content} id={`bot-${index}`} />
            </div>
          </div>
          {status === "streaming" && (
            <div className="flex gap-1 mt-2 sm:mt-3">
              <div
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);
  const lastScrollTop = useRef(0);
  const autoScrollEnabled = useRef(true);

  const scrollToBottom = () => {
    if (
      messagesEndRef.current &&
      containerRef.current &&
      autoScrollEnabled.current
    ) {
      const container = containerRef.current;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;

      if (isNearBottom) {
        container.scrollTop = container.scrollHeight;
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isScrollingUp = scrollTop < lastScrollTop.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

      // If user scrolls up, disable auto-scroll
      if (isScrollingUp) {
        autoScrollEnabled.current = false;
      }

      // If user scrolls to bottom, re-enable auto-scroll
      if (isAtBottom) {
        autoScrollEnabled.current = true;
      }

      lastScrollTop.current = scrollTop;
    }
  };

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll during streaming
  useEffect(() => {
    if (status === "streaming") {
      // Use a more reliable approach for streaming
      const scrollInterval = setInterval(() => {
        scrollToBottom();
      }, 100);

      return () => clearInterval(scrollInterval);
    }
  }, [status, messages]);

  // Re-enable auto-scroll after a period of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      autoScrollEnabled.current = true;
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollArea className="h-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`flex flex-col min-h-full w-full max-w-3xl mx-auto px-1 sm:px-0 ${
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
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </ScrollArea>
  );
};

export default ChatMessage;
