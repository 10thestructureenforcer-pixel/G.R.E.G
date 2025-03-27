"use client";
import { getClientList } from "@/actions/get-client-list";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Client {
  id: string;
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientAddress: string;
  nationality: string;
  visaStatus: string;
  legalConcern: string;
  userId: string;
  createdAt: Date;
}

interface ClientListProps {
  onClientSelect?: (client: Client) => void;
}

const ClientList = ({ onClientSelect }: ClientListProps) => {
  const getClients = async (): Promise<Client[]> => {
    const clients = await getClientList();
    return clients || [];
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-clients"],
    queryFn: getClients,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60,
    refetchIntervalInBackground: false,
  });

  const handleClientSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClient = data?.find(
      (client) => client.id === event.target.value
    );
    if (selectedClient && onClientSelect) {
      onClientSelect(selectedClient);
    }
  };

  if (isLoading) {
    return (
      <div className="p-10">
        <div className="relative">
          <select
            className="w-full p-3 border rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            disabled
          >
            <option value="">Loading clients...</option>
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="relative">
        <select
          className="w-full p-3 border rounded-lg bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          onChange={handleClientSelect}
        >
          <option value="">Select a client</option>
          {data?.map((client) => (
            <option key={client.id} value={client.id}>
              {client.clientFirstName} {client.clientLastName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ClientList;
