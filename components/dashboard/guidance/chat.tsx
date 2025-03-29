"use client";
import { Session } from "@/lib/types";
import { Message } from "ai";
import React, { useState } from "react";
import ChatMessage from "./chat-message";
import PromptForm from "./prompt-form";
import { useChat } from "@ai-sdk/react";
import HistoryAndNewChat from "./history-new-chat";
import WelcomeMessage from "./welcome-message";

interface Client {
  id: string;
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientAddress: string;
  nationality: string;
  visaStatus: string;
  legalConcern: string;
  userId: string;
  createdAt: Date;
}

interface ChatProps {
  id: string;
  initalMessages: Message[];
  session: Session;
}

const Chat = ({ id, initalMessages, session }: ChatProps) => {
  const [clientInfo, setClientInfo] = useState({
    id: "",
    userId: "",
    nationality: "",
    visaStatus: "",
    legalConcern: "",
    prompt: "",
    clientFirstName: "",
    clientLastName: "",
    clientEmail: "",
    clientAddress: "",
  });
  const [isClientSelected, setIsClientSelected] = useState(false);
  const [dropdownText, setDropdownText] = useState(
    "Select a predefined prompt"
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleClientSelect = (client: Client) => {
    setClientInfo((prev) => ({
      id: client.id,
      userId: client.userId,
      nationality: client.nationality,
      visaStatus: client.visaStatus,
      legalConcern: client.legalConcern,
      clientFirstName: client.clientFirstName,
      clientLastName: client.clientLastName,
      clientEmail: client.clientEmail,
      clientAddress: client.clientAddress,
      prompt: dropdownText,
    }));
    setIsClientSelected(true);
  };

  const handlePromptSelect = (prompt: string) => {
    setDropdownText(prompt);
  };

  const { messages, input, setInput, handleSubmit, append, status } = useChat({
    initialMessages: initalMessages,
    api: "/api/chat",
    body: {
      clientInfo,
      chatId: id,
    },
    id: id,
    onFinish: (done) => {
      console.log(done);
    },
  });

  return (
    <>
      <HistoryAndNewChat />

      <div className="flex flex-col h-[calc(100vh-10rem)] bg-background">
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden px-0 sm:px-4 md:px-0 md:-mx-10">
              {messages.length === 0 ? (
                <WelcomeMessage />
              ) : (
                <ChatMessage
                  messages={messages}
                  status={status}
                  session={session}
                  className="text-foreground dark:text-gray-200"
                />
              )}
            </div>
          </div>
        </div>

        <div className="relative bg-transparent">
          <div className="bg-transparent max-w-3xl mx-auto p-2">
            <PromptForm
              id={id}
              append={append}
              session={session}
              handleSubmit={handleSubmit}
              status={status}
              input={input}
              setInput={setInput}
              clientInfo={clientInfo}
              dropdownText={dropdownText}
              onPromptSelect={handlePromptSelect}
              onClientSelect={handleClientSelect}
              isClientSelected={isClientSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
