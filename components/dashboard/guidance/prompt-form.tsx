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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  User2Icon,
  FileText,
  Scale,
  FileCheck,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import ClientList from "./client-list";

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
  dropdownText: string;
  onPromptSelect: (prompt: string) => void;
  onClientSelect: (client: any) => void;
  isClientSelected: boolean;
}

const predefinedPrompts = [
  "Assess asylum eligibility",
  "Build EOIR defense theory",
  "Compare visa options",
];

const PromptForm = ({
  id,
  append,
  session,
  handleSubmit,
  status,
  input,
  setInput,
  clientInfo,
  dropdownText,
  onPromptSelect,
  onClientSelect,
  isClientSelected,
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
      toast.error("Please fill in all fields");
      return;
    }
    if (!isDisabled && input.trim()) {
      e.preventDefault();
      const newUrl = `/guidance/chat/${id}`;
      window.history.pushState({}, "", newUrl);
      handleSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (
        clientInfo.nationality === "" ||
        clientInfo.visaStatus === "" ||
        clientInfo.legalConcern === ""
      ) {
        toast.error("Please Select a Client First");
        return;
      }
      if (!isDisabled && input.trim()) {
        const newUrl = `/guidance/chat/${id}`;
        window.history.pushState({}, "", newUrl);
        handleSubmit();
      }
    }
  };

  return (
    <div className="relative w-full -mb-30 bg-tranaparent">
      <form onSubmit={onSubmit} className="flex items-start gap-1.5 md:gap-2">
        <div className="relative flex-1">
          <Textarea
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            value={input}
            disabled={isDisabled}
            placeholder="Send a message..."
            className="min-h-[45px] max-h-[120px] md:max-h-[150px] w-full border-2 dark:border-2 dark:border-gray-700 border-black resize-none bg-background px-2.5 md:px-4 py-1.5 md:py-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 text-sm rounded-md shadow-md pr-28 md:pr-48 overflow-y-auto"
            autoFocus
            spellCheck={true}
            autoCorrect="on"
            name="message"
            rows={1}
          />
          <div className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 flex gap-0.5 md:gap-2 mx-2 ">
            <Dialog>
              <DialogTrigger asChild className="sm:border-2 ">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 md:h-8 px-1 md:px-2 text-[9px] cursor-pointer -mx-3 md:text-xs hover:bg-accent/50 md:border-none border border-gray-300 dark:border-gray-600 mr-2 rounded-md"
                >
                  {isClientSelected ? (
                    <span className="text-[9px] md:text-xs font-medium">
                      {clientInfo.clientFirstName.charAt(0)}
                      {clientInfo.clientLastName.charAt(0)}
                    </span>
                  ) : (
                    <User2Icon className="h-2 w-2 md:h-3 md:w-3" />
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-[95vw] md:max-w-3xl">
                <DialogTitle className="sr-only">Select Client</DialogTitle>
                <ClientList onClientSelect={onClientSelect} />
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 md:h-8 px-1 md:px-2 text-[9px] md:text-xs hover:bg-accent/50 md:border-none border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <span className="md:hidden">
                    <Sparkles className="h-2 w-2 md:h-3 md:w-3" />
                  </span>
                  <span className="hidden md:inline">{dropdownText}</span>
                  <ChevronDown className="ml-0.5 h-2 w-2 md:h-3 md:w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[180px] md:w-[200px]"
              >
                {predefinedPrompts.map((prompt) => (
                  <DropdownMenuItem
                    key={prompt}
                    onClick={() => onPromptSelect(prompt)}
                    className="text-xs md:text-sm hover:bg-accent/50 py-2 md:py-1.5"
                  >
                    {prompt}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex-shrink-0 pt-1 md:pt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                className="h-[40px] w-[40px] md:h-[40px] md:w-[50px] -my-1 bg-green-600 hover:bg-green-650 text-white"
                disabled={!input.trim() || isDisabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5 md:w-5 md:h-5"
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
