"use client";
import React, { useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface CaseResult {
  absolute_url: string;
  caseName: string;
  caseNameFull: string;
  court: string;
  cluster_id: string;
  dateFiled: string;
  citation: string[];
  judge: string;
  docketNumber: string;
  court_citation_string: string;
  opinions: {
    download_url: string;
    snippet: string;
  }[];
}

const SearchCaseAnalysis = () => {
  const [query, setQuery] = useState<string>("");

  const fetchCaseAnalysis = async (searchQuery: string) => {
    if (!searchQuery) return null;
    const response = await axios.get(
      `https://www.courtlistener.com/api/rest/v4/search/?q=${encodeURIComponent(
        searchQuery
      )}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Token ${process.env.NEXT_PUBLIC_COURTLISTENER_API_KEY}`,
        },
      }
    );
    return response.data;
  };

  const handleSearch = () => {
    console.log(query);
    console.log("jj");
    refetch();
  };

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["search-case-analysis", query],
    queryFn: () => fetchCaseAnalysis(query),
    enabled: false,
    retry: false,
  });
  return (
    <div className="space-y-8">
      {/* <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Case Analysis</h1>
        <p className="text-gray-600">
          AI-powered legal research and case law analysis
        </p>
      </div> */}

      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Advanced Search Analysis
        </h1>
        <div className="relative flex items-center gap-2 w-full max-w-4xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search case law, statutes, or ask a legal question..."
              className="pl-9 h-12 text-base bg-white"
            />
          </div>
          <Button onClick={handleSearch} size="lg">
            Search
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {data?.results && (
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.results.map((caseResult: CaseResult, index: number) => (
              <Link
                href={`/guidance/${caseResult.cluster_id}`}
                key={index}
                className="block"
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-semibold line-clamp-2">
                        {caseResult.caseName}
                      </h2>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium">{caseResult.court}</p>
                      <p>Docket: {caseResult.docketNumber}</p>
                      <p>
                        Filed:{" "}
                        {new Date(caseResult.dateFiled).toLocaleDateString()}
                      </p>
                      {caseResult.citation &&
                        caseResult.citation.length > 0 && (
                          <p className="text-blue-600">
                            {caseResult.citation[0]}
                          </p>
                        )}
                    </div>
                    {caseResult.opinions?.[0]?.snippet && (
                      <p className="text-sm text-gray-700 line-clamp-2 mt-2">
                        {caseResult.opinions[0].snippet}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCaseAnalysis;
