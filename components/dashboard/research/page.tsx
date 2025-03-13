"use client";
import React, { useState } from "react";
import { FiUpload, FiFile } from "react-icons/fi";

const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      }
    }
  };

  const handleSubmit = () => {
    if (file) {
      console.log("Uploading file:", file.name);
      console.log(file);
      alert(`File "${file.name}" ready for processing!`);
    } else {
      alert("Please select a PDF file first");
    }
  };

  console.log(file);

  return (
    <div className=" max-w-2xl p-2">
      <h1 className="text-2xl font-medium mb-6 p-2">Research Documents</h1>

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
          disabled={!file}
          className={`px-6 py-3 rounded-md font-medium transition-colors ${
            file
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {file ? "Process Document" : "Upload a PDF First"}
        </button>
      </div>
    </div>
  );
};

export default UploadComponent;
