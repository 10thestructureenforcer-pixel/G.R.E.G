"use client";
import { Client } from "@/lib/types";
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

  const { object, submit, isLoading } = useObject({
    api: "/api/visa-compare",
    schema: visaComparisonSchema,
  });

  const handleCompare = async () => {
    if (!selectedClient || selectedVisas.length === 0) {
      return;
    }

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
              className="px-6 h-10 w-3xs bg-green-600 hover:bg-green-700"
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
          <h2 className="text-base font-semibold text-foreground mb-3 mx-4">
            Comparison Results
          </h2>
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
                <TableView
                  data={object as VisaComparisonType}
                  loading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaComparisonTool;
