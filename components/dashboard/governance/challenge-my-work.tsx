"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Client } from "@/lib/types";

const rfeResponseTypes = ["Motion to reopen", "Waiver letter", "Legal memo"];

interface ChallengeMyWorkProps {
  clients: Client[];
}

const ChallengeMyWork = ({ clients }: ChallengeMyWorkProps) => {
  const [selectedResponseType, setSelectedResponseType] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedResponseType || !selectedClient) return;

    setIsLoading(true);
    try {
      console.log({
        type: selectedResponseType,
        clientId: selectedClient,
      });
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3 p-2">
      <div className="bg-card rounded-lg shadow-sm border p-3">
        <h1 className="text-lg font-bold mb-3 text-foreground">
          RFE Response Generator
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
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Select Response Type
              </label>
              <Select
                value={selectedResponseType}
                onValueChange={setSelectedResponseType}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Choose response type" />
                </SelectTrigger>
                <SelectContent>
                  {rfeResponseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="default"
              className="px-6 h-10 w-3xs bg-green-600 hover:bg-green-700"
              onClick={handleSubmit}
              disabled={!selectedResponseType || !selectedClient || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate Response"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeMyWork;
