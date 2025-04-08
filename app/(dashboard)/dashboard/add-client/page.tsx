import AddClientPage from "@/components/dashboard/main-dashboard/add-client-page";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

const page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <Loader2 className="h-12 w-12 animate-spin text-green-500" />
          </div>
        }
      >
        <AddClientPage />
      </Suspense>
    </div>
  );
};

export default page;
