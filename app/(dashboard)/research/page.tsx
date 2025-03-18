import UploadComponent from "@/components/dashboard/research/page";
import React from "react";
import RecentCases from "@/components/dashboard/research/recent-cases";

const page = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg  p-5 mb-6">
            <UploadComponent />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-5 sticky top-24">
            <RecentCases />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
