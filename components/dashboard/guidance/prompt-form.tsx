import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Session } from "@/lib/types";
import { Message } from "ai";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PromptFormProps {
  id: string;
  append: (message: Message) => void;
  session: Session;
  handleSubmit: () => void;
  status: "submitted" | "streaming" | "ready" | "error";
  input: string;
  setInput: (value: string) => void;
  clientInfo: {
    clientFirstName: string;
    clientLastName: string;
    clientEmail: string;
    clientAddress: string;
    nationality: string;
    visaStatus: string;
    legalConcern: string;
  };
}

const PromptForm = ({
  id,
  append,
  session,
  handleSubmit,
  status,
  input,
  setInput,
  clientInfo,
}: PromptFormProps) => {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const isDisabled = status === "streaming";

  const onSubmit = (e: React.FormEvent) => {
    if (
      clientInfo.nationality === "" ||
      clientInfo.visaStatus === "" ||
      clientInfo.legalConcern === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    window.history.replaceState({}, "", `/guidance/${id}`);
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (
        clientInfo.nationality === "" ||
        clientInfo.visaStatus === "" ||
        clientInfo.legalConcern === ""
      ) {
        alert("Please Select a Client First");
        return;
      }
      if (!isDisabled && input.trim()) {
        window.history.replaceState({}, "", `/guidance/${id}`);
        handleSubmit();
      }
    }
  };

  return (
    <div className="relative w-full mb-4">
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <Textarea
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          value={input}
          disabled={isDisabled}
          placeholder="Send a message... (Press Enter to send, Shift + Enter for new line)"
          className="min-h-[60px] w-full resize-none bg-background px-4 py-3 focus-within:outline-none text-sm border rounded-md"
          autoFocus
          spellCheck={true}
          autoCorrect="on"
          name="message"
          rows={1}
        />
        <div className="flex-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                className="h-[50px] w-[50px] bg-green-600 hover:bg-green-650 text-white"
                disabled={!input.trim() || isDisabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
