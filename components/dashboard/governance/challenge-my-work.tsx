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
import { Client, RecentChallengeWork } from "@/lib/types";
import { useChat, useCompletion } from "@ai-sdk/react";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import GeneratedDraftResponse from "./generated-draft-response";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { getRecentChallengeWork } from "@/actions/get-recent-challenge-work";
import ChallengeWorkHistory from "./challenge-work-history";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdownComponent from "./react-markdown";
import UploadComponent from "../research/upload-component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadDraft from "./upload-draft";
import { Textarea } from "@/components/ui/textarea";
import { FileIcon, FileText, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getUserUsage } from "@/utils/check-add-client-summary";
import toast from "react-hot-toast";

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
  const [challengeWorkId, setChallengeWorkId] = useState<string>("");
  const searchParams = useSearchParams();
  const challengeWorkIdFromParams = searchParams.get("challengeWorkId");
  const { theme } = useTheme();
  const [draftResponse, setDraftResponse] = useState<string>("");
  const [draftMode, setDraftMode] = useState<"manual" | "upload">("manual");
  const [parentFile, setParentFile] = useState<FileList | null>(null);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Draft response...",
      },
    ],
  });

  const {
    data: challengeWorkDataFromHistory,
    isLoading: isLoadingChallengeWorkHistory,
  } = useQuery<RecentChallengeWork[]>({
    queryKey: ["challenge-work", challengeWorkIdFromParams],
    queryFn: async () => {
      const getRecentHistory = await getRecentChallengeWork();
      // console.log("Fetched Data:", getRecentHistory.data);
      return getRecentHistory.data || [];
    },
  });

  const {
    messages,
    status,
    handleSubmit: fileSubmit,
  } = useChat({
    api: "/api/challenge-work",
    streamProtocol: "data",
    credentials: "same-origin",
    body: {
      type: selectedResponseType,
      client: clients.find((client) => client.id === selectedClient),
      content: content,
      draftMode: draftMode,
    },

    onError: async (error) => {
      toast.error(error.message || "Something went wrong");
    },
    onFinish: async () => {
      const recentChallengeWork = await getRecentChallengeWork();
      if (recentChallengeWork.status === "success") {
        const id = recentChallengeWork.data?.[0]?.id;
        if (id) {
          setChallengeWorkId(id);
        }
      }
    },
  });

  const handleFileUpload = (file: any) => {
    console.log(file);
    setParentFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.history.pushState(null, "", "/governance/challenge-my-work");
    await fileSubmit(
      { preventDefault: () => {} },
      {
        allowEmptySubmit: true,
        experimental_attachments: parentFile || undefined,
      }
    );
  };

  return (
    <div className="w-full space-y-3 ">
      <div className=" ">
        <h1 className="text-lg font-bold  text-foreground">
          Challenge My Work
        </h1>

        <div className="flex justify-end ">
          <ChallengeWorkHistory />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-sm border p-3">
        <div className="mb-4">
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Draft Response
          </label>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="draft-mode"
                checked={draftMode === "upload"}
                onCheckedChange={(checked) => {
                  setParentFile(null);
                  setDraftMode(checked ? "upload" : "manual");
                }}
                className="data-[state=checked]:bg-green-600"
              />
              <Label
                htmlFor="draft-mode"
                className="text-sm text-muted-foreground"
              >
                {draftMode === "manual" ? "Manual Draft" : "Upload File"}
              </Label>
            </div>
          </div>

          {draftMode === "manual" ? (
            <div className="border border-border/50 rounded-lg overflow-hidden shadow-sm bg-card">
              <BlockNoteView
                editor={editor}
                theme={theme === "dark" ? "dark" : "light"}
                onChange={async () => {
                  const editorContent = await editor.blocksToMarkdownLossy(
                    editor?.document
                  );
                  setContent(editorContent);
                }}
                className="w-full [&_.bn-container]:!w-full [&_.bn-editor]:!w-full [&_.bn-content]:!w-full [&_.bn-content]:!min-h-[200px] [&_.bn-content]:!p-4 [&_.bn-content]:!overflow-y-auto [&_.bn-content]:!overscroll-contain"
              />
            </div>
          ) : (
            <div className="bg-card border border-border/50 rounded-lg shadow-sm">
              <UploadDraft sendDataToParent={handleFileUpload} />
            </div>
          )}
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
              className="px-6 h-10 w-3xs bg-green-600 hover:bg-green-700 cursor-pointer"
              onClick={handleSubmit}
              disabled={
                !selectedResponseType ||
                !selectedClient ||
                status === "submitted"
              }
            >
              {status === "submitted" ? (
                <div className="flex items-center gap-2">
                  <span>Generating...</span>
                </div>
              ) : (
                "Challenge My Work"
              )}
            </Button>
          </div>

          <div className="flex justify-between items-center mx-2">
            <h2 className="text-lg font-semibold">Generated Response</h2>
          </div>
        </div>

        {challengeWorkIdFromParams && challengeWorkDataFromHistory ? (
          <div className="mt-6 border-t pt-4">
            {(() => {
              const res = challengeWorkDataFromHistory.find(
                (c) => c.id === challengeWorkIdFromParams
              );
              if (!res) return null;
              return <ReactMarkdownComponent data={res.challengeWorkOutput} />;
            })()}
          </div>
        ) : isLoadingChallengeWorkHistory ? (
          <div className="flex justify-center items-center h-full my-4">
            <Loader2 className="h-8 w-8 animate-spin text-green-400" />
          </div>
        ) : messages.length > 0 ? (
          <div className="mt-6 border-t pt-4">
            <div>
              <GeneratedDraftResponse
                id={challengeWorkId}
                isLoadingWork={status === "submitted" || status === "streaming"}
                data={
                  messages.length > 0
                    ? messages.find((m) => m.role === "assistant")?.content ||
                      ""
                    : ""
                }
              />
            </div>
          </div>
        ) : status === "submitted" || status === "streaming" ? (
          <div className="flex justify-center items-center h-full my-4">
            <Loader2 className="h-8 w-8 animate-spin text-green-400" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChallengeMyWork;
