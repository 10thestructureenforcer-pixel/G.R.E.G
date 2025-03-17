import UploadComponent from "@/components/dashboard/research/page";
import React from "react";
import RecentCases from "@/components/dashboard/research/recent-cases";

const page = () => {
  return (
    <div className="sm:flex flex-row w-full gap-6 justify-between p-4">
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
          <UploadComponent />
        </div>
        <div className="mt-8">
          <RecentCases />
        </div>
      </div>
    </div>
  );
};

export default page;
