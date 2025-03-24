"use client";

import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const CitationLookupForm = () => {
  const [citation, setCitation] = useState<string>("");

  // const apiInput = {
  //   text: "Marbury v. Madison, 5 U.S. (1 Cranch) 137, 174",
  // };

  const fetchData = async () => {
    const response = await axios.post(
      "https://www.courtlistener.com/api/rest/v4/citation-lookup/",
      {
        text: citation,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Token ${process.env.NEXT_PUBLIC_COURTLISTENER_API_KEY}`,
        },
      }
    );
    const data = await response.data;
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }
    return data;
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["citation-lookup"],
    queryFn: fetchData,
    enabled: false,
    retry: false,
  });

  console.log(data);

  const handleClick = () => {
    setCitation("");
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md ">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCitation(e.target.value);
            }}
            placeholder="Enter citation (e.g., 2024 SCC 1)"
            className="pl-9 text-black h-10 "
          />
        </div>
        <Button
          onClick={handleClick}
          className="text-white bg-green-500 cursor-pointer hover:bg-green-600"
        >
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9">
          <Card className="shadow-sm">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Citation Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
                  <div className="text-muted-foreground text-sm">
                    Searching for citation details...
                  </div>
                </div>
              ) : data && data.length > 0 ? (
                <div className="space-y-8">
                  {data.map((result: any, index: number) => (
                    <div key={index} className="space-y-6">
                      <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-xl text-green-800">
                            Citation Information
                          </h3>
                          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Result {index + 1}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">
                              Original Citation
                            </p>
                            <p className="text-base text-gray-900 font-mono bg-gray-50 p-3 rounded-lg">
                              {result.citation}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">
                              Normalized Citations
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {result.normalized_citations.map(
                                (citation: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                  >
                                    {citation}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {result.clusters &&
                        result.clusters.map(
                          (cluster: any, clusterIndex: number) => (
                            <div key={clusterIndex} className="space-y-6">
                              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                  <h3 className="font-semibold text-xl text-gray-800">
                                    Case Details
                                  </h3>
                                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    Cluster {clusterIndex + 1}
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 mb-1">
                                        Case Name
                                      </p>
                                      <p className="text-base text-gray-900 font-medium">
                                        {cluster.case_name}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 mb-1">
                                        Full Case Name
                                      </p>
                                      <p className="text-base text-gray-900">
                                        {cluster.case_name_full}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 mb-1">
                                        Date Filed
                                      </p>
                                      <p className="text-base text-gray-900">
                                        {new Date(
                                          cluster.date_filed
                                        ).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 mb-1">
                                        Judges
                                      </p>
                                      <p className="text-base text-gray-900">
                                        {cluster.judges || "Not specified"}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 mb-1">
                                        Attorneys
                                      </p>
                                      <p className="text-base text-gray-900">
                                        {cluster.attorneys || "Not specified"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {cluster.headnotes && (
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                  <h3 className="font-semibold text-xl text-gray-800 mb-4">
                                    Headnotes
                                  </h3>
                                  <div
                                    className="prose prose-sm max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{
                                      __html: cluster.headnotes,
                                    }}
                                  />
                                </div>
                              )}

                              {cluster.summary && (
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                  <h3 className="font-semibold text-xl text-gray-800 mb-4">
                                    Summary
                                  </h3>
                                  <div
                                    className="prose prose-sm max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{
                                      __html: cluster.summary,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12" />
                  </div>
                  <div className="text-gray-600 text-center">
                    <p className="text-lg font-medium mb-2">
                      No citations found
                    </p>
                    <p className="text-sm text-gray-500">
                      Try entering a different citation
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-lg">Recent Lookups</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground text-center py-4">
                  No recent lookups yet
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CitationLookupForm;
