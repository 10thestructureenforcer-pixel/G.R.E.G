"use client";
import { Client, VisaHistoryType } from "@/lib/types";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ComboboxMultipleDemo } from "./combo-box-multiple-demo";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { visaComparisonSchema } from "@/lib/schema";
import TableView from "./table-view";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { StoreVisaComparison } from "@/actions/store-visa-comparison";
import VisaHistory from "./visa-history";
import { useQuery } from "@tanstack/react-query";
import { getVisaHistory } from "@/actions/get-visa-history";
import { useSearchParams } from "next/navigation";

type VisaComparisonType = z.infer<typeof visaComparisonSchema>;

interface VisaComparisonToolProps {
  clients: Client[];
}

interface ComparisonData {
  clientId: string;
  clientName: string;
  selectedVisas: string[];
  timestamp: string;
}

const VisaComparisonTool: React.FC<VisaComparisonToolProps> = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const compareId = searchParams.get("visaCompareId");

  const { data: visaHistory, isLoading: laodingVisaHistory } = useQuery({
    queryKey: ["visa-history"],
    queryFn: async () => {
      const res = await getVisaHistory();
      if (res.status === "success") {
        return res.data;
      }
      return null;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { object, submit, isLoading } = useObject({
    api: "/api/visa-compare",
    schema: visaComparisonSchema,
    onFinish: async (completion) => {
      window.history.replaceState({}, "", window.location.pathname);
      const currentClient = clients.find(
        (c) => c.id === selectedClient
      ) as Client;
      const clientName = `${currentClient?.clientFirstName} ${currentClient?.clientLastName}`;
      const gptOutput = completion.object;
      const currentUserId = currentClient.userId;
      const storedOuput = await StoreVisaComparison({
        clientId: selectedClient,
        clientName: clientName,
        visaType: selectedVisas,
        gptOutput: JSON.stringify(gptOutput),
        userId: currentUserId ?? "",
      });

      // console.log("Stored output is ", storedOuput);
    },
  });

  const handleCompare = async () => {
    if (!selectedClient || selectedVisas.length === 0) {
      return;
    }

    // if (compareId) {
    //   console.log("Compare ID is ", compareId);
    // }

    if (selectedVisas.length > 3) {
      toast.error("You can only compare up to 3 visas at a time");
      return;
    }

    const selectedClientData = clients.find((c) => c.id === selectedClient);

    if (!selectedClientData) return;

    const comparisonData: ComparisonData = {
      clientId: selectedClient,
      clientName: `${selectedClientData.clientFirstName} ${selectedClientData.clientLastName}`,
      selectedVisas: selectedVisas,
      timestamp: new Date().toISOString(),
    };

    await submit(comparisonData);
  };

  return (
    <div className="w-full space-y-3 p-2">
      <div className="bg-card rounded-lg shadow-sm border p-3">
        <h1 className="text-lg font-bold mb-3 text-foreground">
          Visa Comparison Tool
        </h1>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Select Client
              </label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.clientFirstName} {client.clientLastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <ComboboxMultipleDemo
                selectedVisas={selectedVisas}
                onVisasChange={setSelectedVisas}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="default"
              className="px-6 h-10 w-3xs bg-green-600 hover:bg-green-700 cursor-pointer"
              onClick={handleCompare}
              disabled={
                !selectedClient || selectedVisas?.length === 0 || isLoading
              }
            >
              {isLoading ? <>Comparing...</> : "Compare"}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-foreground mb-3 mx-4">
              Comparison Results
            </h2>
            <VisaHistory data={visaHistory} loading={laodingVisaHistory} />
          </div>

          <div className="w-full overflow-hidden">
            {isLoading ? (
              <div className="w-full h-32 flex items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating visa comparisons...</span>
                </div>
              </div>
            ) : (
              <div className="w-full overflow-hidden">
                {compareId && visaHistory ? (
                  (() => {
                    const comparsionFinalData = visaHistory.find(
                      (c: any) => c.id === compareId
                    );
                    return (
                      <div>
                        <TableView
                          data={
                            comparsionFinalData.gptOutput as VisaComparisonType
                          }
                          loading={isLoading}
                        />
                      </div>
                    );
                  })()
                ) : (
                  <div>
                    <TableView
                      data={object as VisaComparisonType}
                      loading={isLoading}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaComparisonTool;
