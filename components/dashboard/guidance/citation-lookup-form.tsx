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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCitation(e.target.value);
            }}
            placeholder="Enter citation (e.g., 2024 SCC 1)"
            className="pl-9"
          />
        </div>
        <Button onClick={handleClick} className="text-white">
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
              {data ? (
                <div className="space-y-6">
                  {data.map((result: any, index: number) => (
                    <div key={index} className="space-y-6">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">
                          Citation Information
                        </h3>
                        <div className="text-sm space-y-2">
                          <p className="flex items-start gap-2">
                            <span className="font-medium min-w-[140px]">
                              Original Citation:
                            </span>
                            <span className="text-foreground">
                              {result.citation}
                            </span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="font-medium min-w-[140px]">
                              Normalized Citations:
                            </span>
                            <span className="text-foreground">
                              {result.normalized_citations.join(", ")}
                            </span>
                          </p>
                        </div>
                      </div>

                      {result.clusters &&
                        result.clusters.map(
                          (cluster: any, clusterIndex: number) => (
                            <div key={clusterIndex} className="space-y-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <h3 className="font-semibold text-lg mb-3">
                                  Case Details
                                </h3>
                                <div className="text-sm space-y-2">
                                  <p className="flex items-start gap-2">
                                    <span className="font-medium min-w-[140px]">
                                      Case Name:
                                    </span>
                                    <span className="text-foreground">
                                      {cluster.case_name}
                                    </span>
                                  </p>
                                  <p className="flex items-start gap-2">
                                    <span className="font-medium min-w-[140px]">
                                      Full Case Name:
                                    </span>
                                    <span className="text-foreground">
                                      {cluster.case_name_full}
                                    </span>
                                  </p>
                                  <p className="flex items-start gap-2">
                                    <span className="font-medium min-w-[140px]">
                                      Date Filed:
                                    </span>
                                    <span className="text-foreground">
                                      {cluster.date_filed}
                                    </span>
                                  </p>
                                  <p className="flex items-start gap-2">
                                    <span className="font-medium min-w-[140px]">
                                      Judges:
                                    </span>
                                    <span className="text-foreground">
                                      {cluster.judges || "Not specified"}
                                    </span>
                                  </p>
                                  <p className="flex items-start gap-2">
                                    <span className="font-medium min-w-[140px]">
                                      Attorneys:
                                    </span>
                                    <span className="text-foreground">
                                      {cluster.attorneys || "Not specified"}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {cluster.headnotes && (
                                <div className="bg-muted/50 p-4 rounded-lg">
                                  <h3 className="font-semibold text-lg mb-3">
                                    Headnotes
                                  </h3>
                                  <div
                                    className="text-sm prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{
                                      __html: cluster.headnotes,
                                    }}
                                  />
                                </div>
                              )}

                              {cluster.summary && (
                                <div className="bg-muted/50 p-4 rounded-lg">
                                  <h3 className="font-semibold text-lg mb-3">
                                    Summary
                                  </h3>
                                  <div
                                    className="text-sm prose prose-sm max-w-none"
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
                <div className="text-muted-foreground text-sm text-center py-8">
                  No citation Found
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
