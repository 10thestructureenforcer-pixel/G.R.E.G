"use client";
import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
// import generatePDF from "react-to-pdf";

interface GeneratedDraftResponseProps {
  data: string;
}

const GeneratedDraftResponse: React.FC<GeneratedDraftResponseProps> = ({
  data,
}) => {
  // const contentRef = useRef<HTMLDivElement>(null);

  // const handleDownloadPDF = () => {
  //   if (!contentRef.current) return;

  //   const options = {
  //     filename: `draft-response-${new Date().toISOString().split("T")[0]}.pdf`,
  //     page: {
  //       margin: 20,
  //       format: "A4",
  //     },
  //   };

  //   generatePDF(contentRef, options);
  // };

  if (!data) {
    return (
      <div className="p-2 sm:p-4 text-muted-foreground">
        No content available
      </div>
    );
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
        <div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ className, ...props }) => (
                <h1
                  className={cn(
                    "mt-4 sm:mt-6 md:mt-8 scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight text-left",
                    className
                  )}
                  {...props}
                />
              ),
              h2: ({ className, ...props }) => (
                <h2
                  className={cn(
                    "mt-4 sm:mt-6 md:mt-8 scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight text-left",
                    className
                  )}
                  {...props}
                />
              ),
              h3: ({ className, ...props }) => (
                <h3
                  className={cn(
                    "mt-3 sm:mt-4 md:mt-6 scroll-m-20 text-lg sm:text-xl font-semibold tracking-tight text-left",
                    className
                  )}
                  {...props}
                />
              ),
              p: ({ className, ...props }) => (
                <p
                  className={cn(
                    "leading-6 sm:leading-7 text-sm sm:text-base [&:not(:first-child)]:mt-4 sm:mt-6 text-left",
                    className
                  )}
                  {...props}
                />
              ),
              ul: ({ className, ...props }) => (
                <ul
                  className={cn(
                    "my-4 sm:my-6 ml-4 sm:ml-6 list-disc text-sm sm:text-base text-left",
                    className
                  )}
                  {...props}
                />
              ),
              ol: ({ className, ...props }) => (
                <ol
                  className={cn(
                    "my-4 sm:my-6 ml-4 sm:ml-6 list-decimal text-sm sm:text-base text-left",
                    className
                  )}
                  {...props}
                />
              ),
              li: ({ className, ...props }) => (
                <li
                  className={cn(
                    "mt-1 sm:mt-2 text-sm sm:text-base text-left",
                    className
                  )}
                  {...props}
                />
              ),
              blockquote: ({ className, ...props }) => (
                <blockquote
                  className={cn(
                    "mt-4 sm:mt-6 border-l-2 pl-4 sm:pl-6 italic text-sm sm:text-base text-left",
                    className
                  )}
                  {...props}
                />
              ),
              code: ({ className, ...props }) => (
                <code
                  className={cn(
                    "relative rounded bg-gray-100 dark:bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm text-left",
                    className
                  )}
                  {...props}
                />
              ),
              pre: ({ className, ...props }) => (
                <pre
                  className={cn(
                    "mt-4 sm:mt-6 mb-4 overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 text-xs sm:text-sm text-left",
                    className
                  )}
                  {...props}
                />
              ),
              table: ({ className, ...props }) => (
                <div className="my-4 sm:my-6 w-full overflow-x-auto">
                  <table
                    className={cn(
                      "w-full text-sm sm:text-base text-left",
                      className
                    )}
                    {...props}
                  />
                </div>
              ),
              th: ({ className, ...props }) => (
                <th
                  className={cn(
                    "border px-2 sm:px-4 py-1.5 sm:py-2 text-left font-bold text-sm sm:text-base",
                    className
                  )}
                  {...props}
                />
              ),
              td: ({ className, ...props }) => (
                <td
                  className={cn(
                    "border px-2 sm:px-4 py-1.5 sm:py-2 text-left text-sm sm:text-base",
                    className
                  )}
                  {...props}
                />
              ),
            }}
          >
            {data}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default GeneratedDraftResponse;
