import { FileIcon } from "lucide-react";
import React from "react";

const RecentCases = () => {
  const recentPdfs = [
    "Contract_Agreement.pdf",
    "Email_Evidence.pdf",
    "Financial_Records.pdf",
    "Patent_Application.pdf",
    "Prior_Art_Review.pdf",
    "Trademark_Documentation.pdf",
    "Due_Diligence_Report.pdf",
    "Merger_Terms.pdf",
    "Email_Evidence.pdf",
    "Financial_Records.pdf",
    "Patent_Application.pdf",
    "Prior_Art_Review.pdf",
    "Trademark_Documentation.pdf",
    "Due_Diligence_Report.pdf",
    "Merger_Terms.pdf",
    "Email_Evidence.pdf",
    "Financial_Records.pdf",
    "Patent_Application.pdf",
    "Prior_Art_Review.pdf",
    "Trademark_Documentation.pdf",
    "Due_Diligence_Report.pdf",
    "Merger_Terms.pdf",
    "Email_Evidence.pdf",
    "Financial_Records.pdf",
    "Patent_Application.pdf",
    "Prior_Art_Review.pdf",
    "Trademark_Documentation.pdf",
    "Due_Diligence_Report.pdf",
    "Merger_Terms.pdf",
  ];

  return (
    <>
      <h3 className="text-lg font-semibold mb-5 text-gray-800 flex items-center">
        <FileIcon className="h-5 w-5 mr-2 text-blue-600" />
        Recent Documents
      </h3>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 gap-4">
          {recentPdfs.map((fileName, idx) => (
            <div
              key={idx}
              className="flex items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors duration-200"
            >
              <FileIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 truncate">
                {fileName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentCases;
