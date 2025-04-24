"use client";
import { FileIcon } from "lucide-react";
import React, { useState } from "react";
import { FiUpload, FiFile } from "react-icons/fi";
import { useChat, useCompletion } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AnimatedQuotes from "./animated-quotes";
import RefinedSummaryButton from "./refined-summary-button";
import { StoreRefineSummary } from "@/actions/store-refined-summary";
import { GetRecentCases } from "@/actions/get-recent-cases";
import { useSession } from "next-auth/react";
import { getUserUsage } from "@/utils/check-add-client-summary";

interface CaseSummary {
  status: "PENDING" | "SUCCESS" | "FAILED";
  caseFileId: string;
}

interface Case {
  id: string;
  title: string;
  casesummary: CaseSummary;
  createdAt: Date;
}

const UploadComponent = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [summaryType, setSummaryType] = useState<
    "none" | "original" | "refined"
  >("none");
  const [refinedSummary, setRefinedSummary] = useState("");
  const [caseId, setCaseId] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    messages,
    handleSubmit: formSubmit,
    setMessages,
    status,
  } = useChat({
    api: "/api/summarize",
    streamProtocol: "data",
    credentials: "same-origin",

    onFinish: async () => {
      queryClient.setQueryData(["recentCases"], (old: Case[] = []) => {
        return old.map((case_) => {
          if (case_.casesummary?.status === "PENDING") {
            return {
              ...case_,
              casesummary: {
                ...case_.casesummary,
                status: "SUCCESS",
              },
            };
          }
          return case_;
        });
      });
      queryClient.invalidateQueries({ queryKey: ["recentCases"] });

      setSummaryType("original");

      const recentCases = await GetRecentCases();
      const latestCase = recentCases?.[0];
      if (latestCase) {
        setCaseId(latestCase.id);
      }
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (file) {
        try {
          setMessages([]);
          await formSubmit(
            {},
            { allowEmptySubmit: true, experimental_attachments: file }
          );
        } catch (error) {
          console.error("Error processing document:", error);
          alert("Failed to process document. Please try again.");
        }
      }
    },
    onMutate: async (data) => {
      // Create optimistic case

      const optimisticCase = {
        id: Date.now().toString(),
        title: file?.[0]?.name || "Untitled Document",
        casesummary: {
          status: "PENDING",
          caseFileId: Date.now().toString(),
        },
        createdAt: new Date(),
      };

      // Add to recent cases list
      queryClient.setQueryData(["recentCases"], (old: Case[] = []) => {
        return [optimisticCase, ...old];
      });

      return { optimisticCase };
    },
    onError: (err, newCase, context) => {
      // Update status to FAILED on error

      queryClient.setQueryData(["recentCases"], (old: Case[] = []) => {
        return old.map((case_) => {
          if (case_.id === context?.optimisticCase.id) {
            return {
              ...case_,
              casesummary: {
                ...case_.casesummary,
                status: "FAILED",
              },
            };
          }
          return case_;
        });
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMessages([]);

      const selectedFile = e.target.files;
      const fileType = selectedFile[0].type;

      if (
        fileType === "application/pdf" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "text/plain"
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Only PDF, DOCX, and TXT files are allowed");
        e.target.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const droppedFile = e.dataTransfer.files;
      const fileType = droppedFile[0].type;
      if (
        fileType === "application/pdf" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "text/plain"
      ) {
        setFile(droppedFile);
      } else {
        toast.error("Only PDF, DOCX, and TXT files are allowed");
      }
    }
  };

  const originalSummary = messages.filter(
    (data) => data.role === "assistant"
  )[0]?.content;

  const { complete, completion } = useCompletion({
    api: "/api/summarize/refine-summary",
    body: {
      prompt: originalSummary,
      caseId: caseId,
    },
  });
  const handleSubmit = async () => {
    if (!file) return;
    const user = await getUserUsage(userId!);

    if (!user.canSummarize) {
      toast.error(
        "You have reached your  limit of  case summaries. Please upgrade to a paid plan to continue summarizing cases."
      );
      return;
    }
    setSummaryType("original");
    await uploadMutation.mutateAsync();
  };

  const handleRefinedSummary = async (refinedText: string) => {
    setSummaryType("refined");
    setRefinedSummary(refinedText);
    complete("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        <h1 className="text-2xl font-medium mb-6 text-foreground">
          Summarize your Case Documents
        </h1>

        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                : "border-gray-300 dark:border-gray-700"
            } ${file ? "bg-green-50 dark:bg-green-950/20" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              multiple={false}
              className="hidden"
              onChange={handleFileChange}
            />

            <label htmlFor="file-upload" className="cursor-pointer">
              {file ? (
                <div className="flex flex-col items-center">
                  <FiFile className="text-5xl text-green-600 dark:text-green-400 mb-2" />
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    {file[0].name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {(file[0].size / 1024 / 1024).toFixed(2)} MB · PDF
                  </p>
                  <p className="text-xs text-blue-500 dark:text-blue-400 mt-4 underline">
                    Click to change file
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FiUpload className="text-5xl text-gray-400 dark:text-gray-600 mb-2" />
                  <p className="font-medium text-foreground">
                    Drag and drop your PDF here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Only PDF files are supported
                  </p>
                </div>
              )}
            </label>
          </div>
          <p className="text-red-500 dark:text-red-400 text-sm mt-2 text-center">
            * Only PDF, DOCX, and TXT files are allowed
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={
                !file || status === "submitted" || status === "streaming"
              }
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                file && !(status === "submitted" || status === "streaming")
                  ? "bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 text-black cursor-pointer"
                  : "bg-green-500 dark:bg-green-500 text-white dark:text-black cursor-not-allowed"
              }`}
            >
              {file ? "Process Document" : "Upload a File First"}
            </button>
            {(status === "submitted" || status === "streaming") && (
              <div className="mt-2">
                <AnimatedQuotes />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-background p-5 overflow-hidden flex flex-col">
        <h2 className="text-xl font-semibold mb-5 text-foreground">Summary</h2>

        <div className="p-6 bg-muted dark:bg-muted/50 rounded-md border min-h-[300px] flex-grow overflow-auto">
          {messages &&
          messages.filter((data) => data.role === "assistant").length > 0 ? (
            <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4 text-foreground prose-pre:p-0 max-w-full">
              {status === "ready" && (
                <RefinedSummaryButton
                  isRefinedSummaryDone={summaryType === "refined"}
                  isOriginalSummaryDone={summaryType === "original"}
                  onRefinedSummary={handleRefinedSummary}
                  originalSummary={originalSummary}
                />
              )}

              {summaryType === "original" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <h3 className="text-base font-medium text-foreground">
                      Original Summary
                    </h3>
                  </div>
                  <ReactMarkdown>{originalSummary.toString()}</ReactMarkdown>
                </div>
              )}

              {summaryType === "refined" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <h3 className="text-base font-medium text-foreground">
                      Refined Summary
                    </h3>
                  </div>
                  <ReactMarkdown>{completion.toString()}</ReactMarkdown>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <FileIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Select a document to view its summary
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Upload a new document or choose from recent files
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
