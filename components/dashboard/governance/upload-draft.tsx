"use client";
import { FileIcon } from "lucide-react";
import React, { useState } from "react";
import { FiUpload, FiFile } from "react-icons/fi";
import toast from "react-hot-toast";

const UploadDraft = ({
  sendDataToParent,
}: {
  sendDataToParent: (file: FileList) => void;
}) => {
  const [file, setFile] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files;
      const fileType = selectedFile[0].type;

      if (
        fileType === "application/pdf" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "text/plain"
      ) {
        setFile(selectedFile);
        sendDataToParent(selectedFile);
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
        sendDataToParent(droppedFile);
      } else {
        toast.error("Only PDF, DOCX, and TXT files are allowed");
      }
    }
  };

  return (
    <div className="mb-4">
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
                Drag and drop your document here or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Only PDF, DOCX, and TXT files are supported
              </p>
            </div>
          )}
        </label>
      </div>
      <p className="text-red-500 dark:text-red-400 text-sm mt-2 text-center">
        * Only PDF, DOCX, and TXT files are allowed
      </p>
    </div>
  );
};

export default UploadDraft;
