"use client";

import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  FileText,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnalysisData, Conflict } from "@/lib/types";
import { generateMemoPrompt } from "@/lib/prompt";
import { useCompletion } from "@ai-sdk/react";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { pdf } from "@react-pdf/renderer";
import DownLoadPDF from "./render-download-pdf";
import { useTheme } from "next-themes";

const AnalysisResults = ({ data }: { data: AnalysisData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme } = useTheme();
  const { complete, completion } = useCompletion({
    api: "/api/generate-memo",
    onFinish: () => {
      setIsGenerating(false);
    },
    onResponse: () => {
      setIsGenerating(true);
    },
  });

  const [blocks, setBlocks] = useState<Block[]>([]);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Generating...",
      },
    ],
  });

  useEffect(() => {
    const updateBlocks = async () => {
      if (completion) {
        const blocksFromMarkdown = await editor.tryParseMarkdownToBlocks(
          completion
        );
        editor.replaceBlocks(editor.document, blocksFromMarkdown);
      }
    };
    updateBlocks();
  }, [completion, editor]);

  const handleGenerateMemo = async (conflict: Conflict) => {
    const prompt = generateMemoPrompt(conflict);
    await complete(prompt);
  };

  if (!data.conflicts || data.conflicts.length === 0) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/10 border border-green-500/20">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <p className="text-sm text-green-500">No conflicts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.conflicts.map((conflict, index) => (
        <div
          onClick={() => {
            console.log(conflict);
          }}
          key={index}
          className={cn(
            "rounded-md p-3",
            conflict.type === "opposingParty"
              ? "bg-red-500/10 border border-red-500/20"
              : "bg-yellow-500/10 border border-yellow-500/20"
          )}
        >
          <div className="flex items-start gap-2">
            {conflict.type === "opposingParty" ? (
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            )}
            <div className="space-y-2 w-full">
              <p
                className={cn(
                  "text-sm",
                  conflict.type === "opposingParty"
                    ? "text-red-500"
                    : "text-yellow-500"
                )}
              >
                {conflict.message}
              </p>
              {conflict.matches.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Info className="h-3 w-3" />
                    <span>Matching Records</span>
                  </div>
                  <div className="space-y-1.5">
                    {conflict.matches.map((match, matchIndex) => (
                      <div
                        key={matchIndex}
                        className="text-xs bg-background/50 p-2 rounded-md border"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Client:
                            </span>
                            <span>
                              {match.clientFirstName} {match.clientLastName}
                            </span>
                          </div>
                          {match.A_number && (
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                A-Number:
                              </span>
                              <span>{match.A_number}</span>
                            </div>
                          )}
                          {match.sponsorCompany && (
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                Sponsor:
                              </span>
                              <span>{match.sponsorCompany}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGenerateMemo(conflict);
                  }}
                >
                  <FileText className="h-4 w-4" />
                  Generate Memo
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {completion && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              disabled={isGenerating}
              onClick={async () => {
                const HTMLFromBlocks = await editor.blocksToHTMLLossy(blocks);
                const pdfInstance = pdf(
                  <DownLoadPDF generatedMemo={HTMLFromBlocks} />
                );
                const blob = await pdfInstance.toBlob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "generated-memo.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="h-4 w-4 text-green-500" />
              Download PDF
            </Button>
          </div>
          <h3 className="text-sm font-medium">Generated Memo</h3>
          <div className="p-2 sm:p-4 bg-background/50 rounded-md border w-full max-w-full">
            <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
              <div className="absolute inset-0 overflow-y-auto">
                <BlockNoteView
                  editor={editor}
                  theme={theme === "dark" ? "dark" : "light"}
                  onChange={() => {
                    setBlocks(editor.document);
                  }}
                  className="w-full [&_.bn-container]:!w-full [&_.bn-editor]:!w-full [&_.bn-content]:!w-full [&_.bn-content]:!min-h-full [&_.bn-content]:!p-4 [&_.bn-content]:!overflow-y-auto [&_.bn-content]:!overscroll-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
