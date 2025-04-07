"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Client } from "@/lib/types";
import { useCompletion } from "@ai-sdk/react";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import GeneratedDraftResponse from "./generated-draft-response";
import { BlockNoteView } from "@blocknote/mantine";

const rfeResponseTypes = [
  "Motion to reopen",
  "Waiver letter",
  "Legal memo",
  "RFE Response",
];

interface ChallengeMyWorkProps {
  clients: Client[];
}

const ChallengeMyWork = ({ clients }: ChallengeMyWorkProps) => {
  const [selectedResponseType, setSelectedResponseType] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "",
      },
    ],
  });

  const { completion, isLoading, complete } = useCompletion({
    api: "/api/challenge-work",
    body: {
      type: selectedResponseType,
      client: clients.find((client) => client.id === selectedClient),
      content: content,
    },
  });

  return (
    <div className="w-full space-y-3 p-2">
      <h1 className="text-lg font-bold mb-3 text-foreground">
        Challenge My Work
      </h1>
      <div className="bg-card rounded-lg shadow-sm border p-3">
        <div className="mb-4">
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Draft Response
          </label>
          <div className="border rounded-md overflow-hidden">
            <BlockNoteView
              editor={editor}
              onChange={async () => {
                const editorContent = await editor.blocksToMarkdownLossy(
                  editor.document
                );
                setContent(editorContent);
              }}
              theme="dark"
              className="w-full [&_.bn-container]:!w-full [&_.bn-editor]:!w-full [&_.bn-content]:!w-full [&_.bn-content]:!min-h-[200px] [&_.bn-content]:!p-4 [&_.bn-content]:!overflow-y-auto [&_.bn-content]:!overscroll-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Select Client
              </label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.clientFirstName} {client.clientLastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Select Response Type
              </label>
              <Select
                value={selectedResponseType}
                onValueChange={setSelectedResponseType}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Choose response type" />
                </SelectTrigger>
                <SelectContent>
                  {rfeResponseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="default"
              className="px-6 h-10 w-3xs bg-green-600 hover:bg-green-700"
              onClick={() => complete("")}
              disabled={!selectedResponseType || !selectedClient || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                "Challenge My Work"
              )}
            </Button>
          </div>
        </div>

        {completion && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Generated Response</h2>
            </div>
            <div>
              <GeneratedDraftResponse data={completion} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeMyWork;
