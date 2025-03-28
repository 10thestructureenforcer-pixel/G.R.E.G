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
import { Loader2, UserCircle2, Mail, MessageSquare } from "lucide-react";

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
        <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black transition-colors duration-200 w-full sm:w-auto cursor-pointer ">
          View Clients
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] dark:border-white border-black/30 dark:border-black/50">
        <DialogHeader className="pb-2 border-b-2 border-black/20 dark:border-black/40">
          <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Client List
          </DialogTitle>
        </DialogHeader>
        <div className="mt-3 max-h-[60vh] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 text-green-500 dark:text-green-400 animate-spin" />
            </div>
          ) : clients && clients.length > 0 ? (
            <div className="space-y-3">
              {clients.map((client: Client) => (
                <div
                  key={client.id}
                  className="p-3 bg-black/5 dark:bg-black/30 rounded-lg border-2 border-white/20 dark:border-2 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {client.clientFirstName} {client.clientLastName}
                        </h3>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-black/10 dark:bg-black/40 px-2 py-1 rounded-full">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            Email
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {client.clientEmail}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <Passport className="h-4 w-4 text-green-500 dark:text-green-400" /> */}
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            Visa Status
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {client.visaStatus}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-green-500 dark:text-green-400 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            Legal Concern
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {client.legalConcern}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4">
              <UserCircle2 className="h-8 w-8 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No clients found
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewClients;
