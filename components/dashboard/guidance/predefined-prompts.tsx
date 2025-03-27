import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface PredefinedPromptsProps {
  dropdownText: string;
  onPromptSelect: (prompt: string) => void;
}

const predefinedPrompts = [
  "Assess asylum eligibility",
  "Build EOIR defense theory",
  "Compare visa options",
];

const PredefinedPrompts = ({
  dropdownText,
  onPromptSelect,
}: PredefinedPromptsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-sm cursor-pointer hover:bg-accent/50 transition-colors"
        >
          {dropdownText}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full bg-background border-border">
        {predefinedPrompts.map((prompt) => (
          <DropdownMenuItem
            key={prompt}
            onClick={() => onPromptSelect(prompt)}
            className="hover:bg-accent/50 transition-colors"
          >
            {prompt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PredefinedPrompts;
