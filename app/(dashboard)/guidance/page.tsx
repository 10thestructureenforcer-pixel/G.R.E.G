import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CitationLookupForm from "@/components/dashboard/guidance/citation-lookup-form";

const Page = () => {
  return (
    <div className="container mx-auto p-6">
      <CardHeader></CardHeader>
      <CardContent>
        <CitationLookupForm />
      </CardContent>
    </div>
  );
};

export default Page;
