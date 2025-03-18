"use client";
import { FileIcon } from "lucide-react";
import React, { useState } from "react";
import { FiUpload, FiFile } from "react-icons/fi";
import { useChat, useCompletion } from "@ai-sdk/react";

const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string>("");

  const {
    messages,
    handleSubmit: formSubmit,
    input,
    handleInputChange,
  } = useChat({
    api: "/api/summarize",
    streamProtocol: "data",
    body: {
      file: file,
    },
    credentials: "same-origin",
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;

      if (
        fileType === "application/pdf" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "text/plain"
      ) {
        setFile(selectedFile);
      } else {
        alert("Only PDF, DOCX, and TXT files are allowed");
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const fileType = droppedFile.type;
      if (
        fileType === "application/pdf" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "text/plain"
      ) {
        setFile(droppedFile);
      } else {
        alert("Only PDF, DOCX, and TXT files are allowed");
      }
    }
  };

  const handleSubmit = async () => {
    if (file) {
      setIsLoading(true);
      setSummary("");

      try {
        const formData = new FormData();
        formData.append("file", file);

        // const response = await fetch("/api/summarize", {
        //   method: "POST",
        //   body: formData,
        // });

        // if (!response.ok) {
        //   throw new Error(`Error: ${response.status}`);
        // }

        formSubmit({}, { allowEmptySubmit: true });
        // const reader = response.body?.getReader();
        // if (!reader) {
        //   throw new Error("No reader available for streaming");
        // }
        // for (
        //   let result = await reader.read();
        //   !result.done;
        //   result = await reader.read()
        // ) {
        //   const chunk = new TextDecoder().decode(result.value);

        //   setSummary((prev) => prev + chunk);

        //   setFile(null);
        // }

        console.log("Document processed successfully");
        alert("done");
      } catch (error) {
        console.error("Error processing document:", error);
        alert("Failed to process document. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please select a file first");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-4">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-medium mb-6">Research Documents</h1>

        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } ${file ? "bg-green-50" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />

            <label htmlFor="file-upload" className="cursor-pointer">
              {file ? (
                <div className="flex flex-col items-center">
                  <FiFile className="text-5xl text-green-600 mb-2" />
                  <p className="text-green-600 font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB · PDF
                  </p>
                  <p className="text-xs text-blue-500 mt-4 underline">
                    Click to change file
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FiUpload className="text-5xl text-gray-400 mb-2" />
                  <p className="font-medium">
                    Drag and drop your PDF here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Only PDF files are supported
                  </p>
                </div>
              )}
            </label>
          </div>
          <p className="text-red-500 text-sm mt-2 text-center">
            * Only PDF, DOCX, and TXT files are allowed
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!file || isLoading}
            className={`px-6 py-3 rounded-md font-medium transition-colors cursor-pointer ${
              file && !isLoading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading
              ? "Processing..."
              : file
              ? "Process Document"
              : "Upload a File First"}
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm p-5">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">Summary</h2>
        <div className="p-6 bg-gray-50 rounded-md border border-gray-200 min-h-[300px] overflow-auto">
          {messages ? (
            <div className="prose break-words dark:prose-invert prose-p:leading-relaxed text-black prose-pre:p-0">
              messages are{" "}
              {messages.filter((data) => data.role === "assistant")[0]?.content}
            </div>
          ) : (
            <div className="text-center">
              <FileIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">
                Select a document to view its summary
              </p>
              <p className="text-xs text-gray-500">
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
