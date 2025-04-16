"use client";
import React, { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Wand2, Download, Loader2 } from "lucide-react";
import ReactMarkdownComponent from "./react-markdown";

// import generatePDF from "react-to-pdf";

interface GeneratedDraftResponseProps {
  data: string;
  isLoadingWork: boolean;
  id: string;
}

const GeneratedDraftResponse: React.FC<GeneratedDraftResponseProps> = ({
  data,
  isLoadingWork,
  id,
}) => {
  const [startRefineWork, setStartRefineWork] = useState(false);

  const {
    completion,
    complete,
    isLoading: isRefineWorkLoading,
  } = useCompletion({
    api: "/api/challenge-work/refine-version",
    body: {
      challengeWorkOutput: data,
      id: id,
    },
  });

  if (!data) {
    return (
      <div className="p-2 sm:p-4 text-muted-foreground">
        No content available
      </div>
    );
  }

  async function handleRefineResponse() {
    setStartRefineWork(true);
    await complete("");
  }

  return (
    <div className="w-full p-2 sm:p-4 md:p-6">
      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:text-left prose-p:text-left prose-ul:text-left prose-ol:text-left prose-li:text-left prose-blockquote:text-left">
        {/* <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 flex justify-end rounded-md mb-4 hover:bg-green-600 transition-colors"
        >
          Download as PDF
        </button> */}

        <div className="flex justify-end gap-2 mb-4">
          <Button
            onClick={handleRefineResponse}
            className="bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer dark:text-black"
            disabled={isLoadingWork || isRefineWorkLoading}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Refine Response
          </Button>
        </div>
        <div>
          {data && !startRefineWork && <ReactMarkdownComponent data={data} />}
          {startRefineWork && completion ? (
            <ReactMarkdownComponent data={completion} />
          ) : isRefineWorkLoading ? (
            <Loader2 className="w-10 h-10 animate-spin text-green-400 mx-auto" />
          ) : null}
        </div>
        <div className="flex justify-end mt-6">
          {/* <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              const blob = new Blob([isRefineWorkLoading ? completion : data], {
                type: "text/markdown",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `draft-response-${
                new Date().toISOString().split("T")[0]
              }.md`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4" />
            Download Markdown
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default GeneratedDraftResponse;
