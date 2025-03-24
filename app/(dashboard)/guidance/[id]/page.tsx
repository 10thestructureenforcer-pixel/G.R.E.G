"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CaseDetail {
  caseName: string;
  caseNameFull: string;
  court: string;
  dateFiled: string;
  citation: string[];
  judge: string;
  docketNumber: string;
  attorney: string;
  opinions: {
    download_url: string;
    snippet: string;
  }[];
}

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.id;

  const { data: caseDetail, isLoading } = useQuery({
    queryKey: ["case-detail", caseId],
    queryFn: async () => {
      const response = await axios.get(
        `https://www.courtlistener.com/api/rest/v4/cluster/${caseId}/`,
        {
          headers: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_COURTLISTENER_API_KEY}`,
          },
        }
      );
      return response.data as CaseDetail;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!caseDetail) {
    return <div>Case not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/dashboard/guidance">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Button>
      </Link>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{caseDetail.caseName}</h1>
            {caseDetail.caseNameFull && (
              <p className="text-gray-600 mt-1">{caseDetail.caseNameFull}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold mb-2">Case Information</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Court:</span> {caseDetail.court}
                </p>
                <p>
                  <span className="font-medium">Docket Number:</span>{" "}
                  {caseDetail.docketNumber}
                </p>
                <p>
                  <span className="font-medium">Date Filed:</span>{" "}
                  {new Date(caseDetail.dateFiled).toLocaleDateString()}
                </p>
                {caseDetail.judge && (
                  <p>
                    <span className="font-medium">Judge:</span>{" "}
                    {caseDetail.judge}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Citations</h2>
              <div className="space-y-2 text-sm">
                {caseDetail.citation.map((cite, index) => (
                  <p key={index}>{cite}</p>
                ))}
              </div>
            </div>
          </div>

          {caseDetail.attorney && (
            <div>
              <h2 className="font-semibold mb-2">Attorneys</h2>
              <p className="text-sm whitespace-pre-wrap">
                {caseDetail.attorney}
              </p>
            </div>
          )}

          {caseDetail.opinions?.[0] && (
            <div>
              <h2 className="font-semibold mb-2">Opinion</h2>
              <p className="text-sm whitespace-pre-wrap">
                {caseDetail.opinions[0].snippet}
              </p>
              {caseDetail.opinions[0].download_url && (
                <a
                  href={caseDetail.opinions[0].download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  View Full Opinion →
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
