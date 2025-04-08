"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getClientList } from "@/actions/get-client-list";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Loader2, UserCircle2, Mail, MessageSquare, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Client {
  id: string;
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  visaStatus: string;
  legalConcern: string;
  createdAt: Date;
}

const ViewClients = () => {
  const [open, setOpen] = React.useState(false);

  const { data: clients, isLoading } = useQuery({
    queryKey: ["get-clients"],
    queryFn: getClientList,
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black transition-colors duration-200 w-full sm:w-auto cursor-pointer">
          <Users className="h-4 w-4 mr-2" />
          View Clients
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-border">
        <DialogHeader className="pb-2 border-b border-border">
          <DialogTitle className="text-lg font-semibold text-green-600 dark:text-green-500">
            Client List
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 text-green-500 dark:text-green-400 animate-spin" />
              <span className="ml-2 text-sm text-muted-foreground">
                Loading clients...
              </span>
            </div>
          ) : clients && clients.length > 0 ? (
            <div className="space-y-4">
              {clients.map((client: Client) => (
                <Card
                  key={client.id}
                  className="border border-border shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                          <h3 className="font-semibold text-sm">
                            {client.clientFirstName} {client.clientLastName}
                          </h3>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {new Date(client.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-green-500 dark:text-green-400" />
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-muted-foreground">
                              Email
                            </span>
                            <span className="text-xs">
                              {client.clientEmail}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-muted-foreground">
                              Visa Status
                            </span>
                            <span className="text-xs">{client.visaStatus}</span>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-green-500 dark:text-green-400 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-muted-foreground">
                              Legal Concern
                            </span>
                            <span className="text-xs line-clamp-2">
                              {client.legalConcern}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <UserCircle2 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No clients found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewClients;
