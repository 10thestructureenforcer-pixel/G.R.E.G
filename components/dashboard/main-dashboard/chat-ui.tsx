"use client";
import { useChat } from "@ai-sdk/react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Source {
  sourceType: string;
  id: string;
  url: string;
}

interface MessagePart {
  type: string;
  source?: Source;
  text?: string;
}

const ChatUI = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    messages,
    handleSubmit: handleSubmitChat,
    setMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      prompt: prompt,
    },
    onFinish: () => {
      console.log("finished");
    },
    onError: (error) => {
      console.error("Chat error:", error);
      setError("Failed to get response. Please try again.");
    },
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      setMessages([]);
      await handleSubmitChat(
        {},
        {
          allowEmptySubmit: true,
        }
      );
      setPrompt("");
    } catch (error) {
      console.error("Error submitting prompt:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sources =
    messages && messages.length > 1 && messages[1]?.parts
      ? (messages[1].parts as MessagePart[])
          .filter((part) => part.type === "source" && part.source?.url)
          .map((part) => part.source!.url)
          .slice(0, 10)
      : [];

  const totalSourceCount =
    messages && messages.length > 1 && messages[1]?.parts
      ? (messages[1].parts as MessagePart[]).filter(
          (part) => part.type === "source" && part.source?.url
        ).length
      : 0;

  return (
    <div className=" max-w-7xl ">
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>

        {error && (
          <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {messages && messages.length > 0 && (
          <div className="flex gap-6">
            <div className="flex-1 bg-white rounded-lg shadow-sm border">
              <div className="prose max-w-none p-6">
                <ReactMarkdown>
                  {
                    messages.filter((data) => data.role === "assistant")[0]
                      ?.content
                  }
                </ReactMarkdown>
              </div>
            </div>

            {sources.length > 0 && (
              <div className="w-80 shrink-0">
                <div className="sticky top-4 bg-white rounded-lg shadow-sm border p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Sources{" "}
                    {`(${sources.length}${
                      totalSourceCount > 10 ? ` of ${totalSourceCount}` : ""
                    })`}
                  </h3>
                  <div className="space-y-2">
                    {sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-blue-50 hover:bg-blue-100 rounded-md p-3 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 mt-0.5 text-blue-600 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          <div className="min-w-0 flex-1">
                            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800 block truncate">
                              {new URL(source).hostname}
                            </span>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {source}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                    {isLoading && (
                      <div className="text-center py-2">
                        <div className="animate-pulse text-sm text-gray-500">
                          Loading sources...
                        </div>
                      </div>
                    )}
                    {totalSourceCount > 10 && (
                      <div className="text-center py-2 text-sm text-gray-500">
                        Showing top 10 of {totalSourceCount} sources
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUI;
