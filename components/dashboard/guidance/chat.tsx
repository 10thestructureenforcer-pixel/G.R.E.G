"use client";
import { Session } from "@/lib/types";
import { Message } from "ai";
import React, { useState } from "react";
import ChatMessage from "./chat-message";
import PromptForm from "./prompt-form";
import PredefinedPrompts from "./predefined-prompts";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { User2Icon } from "lucide-react";
import ClientList from "./client-list";

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
    },
  });

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-background">
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden -mx-10">
            <ChatMessage
              messages={messages}
              status={status}
              session={session}
              className="text-foreground dark:text-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="">
        <div className="w-full max-w-3xl mx-auto p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <PredefinedPrompts
                dropdownText={dropdownText}
                onPromptSelect={handlePromptSelect}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 hover:cursor-pointer"
                >
                  {isClientSelected ? (
                    <span className="text-sm font-medium">
                      {clientInfo.clientFirstName.charAt(0)}
                      {""}
                      {clientInfo.clientLastName.charAt(0)}
                    </span>
                  ) : (
                    <User2Icon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Open client list</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-3xl">
                <DialogTitle className="sr-only">Select Client</DialogTitle>
                <ClientList onClientSelect={handleClientSelect} />
              </DialogContent>
            </Dialog>
          </div>
          <PromptForm
            append={append}
            session={session}
            handleSubmit={handleSubmit}
            status={status}
            input={input}
            setInput={setInput}
            clientInfo={clientInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
