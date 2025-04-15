"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client, SettingsUser } from "@/lib/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Router, Users } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { editClientManagement } from "@/actions/edit-client-management";
import { useRouter } from "next/navigation";

// Define the Zod schema for client form validation
const clientFormSchema = z.object({
  clientFirstName: z.string().min(1, "First name is required"),
  clientLastName: z.string().min(1, "Last name is required"),
  clientMiddleName: z.string().nullable(),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().min(1, "Phone number is required"),
  clientAddress: z.string().min(1, "Address is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  visaStatus: z.string().min(1, "Visa status is required"),
  legalConcern: z.string().min(1, "Legal concern is required"),
  A_number: z.string().min(1, "A-number is required"),
  sponsorCompany: z.string().min(1, "Sponsor company is required"),
  opposingParty: z.string().min(1, "Opposing party is required"),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

interface SettingsClientProps {
  user: SettingsUser;
}

const ClientManagement = ({ user }: SettingsClientProps) => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client>({} as Client);
  const [currentUser, setCurrentUser] = useState<Client[]>(user.client);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
  });

  const handleClientSelect = (clientId: string) => {
    setSelectedClient(clientId);
    const client = user.client.find((c) => c.id === clientId);
    if (client) {
      setCurrentClient(client);
      Object.entries(client).forEach(([key, value]) => {
        if (key in clientFormSchema.shape) {
          setValue(key as keyof ClientFormData, value);
        }
      });
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (data: ClientFormData) => {
      if (!currentClient.id) {
        throw new Error("No client selected");
      }
      const res = await editClientManagement(currentClient.id, data);
      return res;
    },

    onMutate: () => {
      setSelectedClient("");
    },

    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success(data.message);
        setCurrentUser(data.client ?? []);
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleSaveClient = handleSubmit(async (data) => {
    try {
      await mutate(data);
      setCurrentClient((prev) => ({
        ...prev,
        ...data,
      }));

      setIsEditingClient(false);
      reset();
    } catch (error) {
      toast.error("Failed to update client information");
    }
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-end">
            <div className="text-sm text-muted-foreground">
              Total Clients: {user.client.length}
            </div>
          </CardTitle>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Client Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 max-w-4xl">
            <div className="space-y-4 w-full">
              <div className="space-y-2 w-full">
                <Label>Select Client to Edit Details</Label>
                <Select
                  value={selectedClient}
                  onValueChange={handleClientSelect}
                  disabled={isEditingClient}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentUser.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {`${client.clientFirstName} ${client.clientLastName}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedClient && (
              <form onSubmit={handleSaveClient} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Client Information</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-500 text-white hover:bg-green-600 dark:text-black dark:bg-green-500 cursor-pointer dark:hover:bg-green-600"
                    onClick={() => setIsEditingClient(!isEditingClient)}
                    type="button"
                  >
                    <Pencil className="w-4 h-4" />
                    {isEditingClient ? "Cancel" : "Edit"}
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      {isEditingClient ? (
                        <div className="space-y-1">
                          <Input
                            {...register("clientFirstName")}
                            className={
                              errors.clientFirstName ? "border-red-500" : ""
                            }
                          />
                          {errors.clientFirstName && (
                            <p className="text-sm text-red-500">
                              {errors.clientFirstName.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-md border">
                          {
                            user.client.find((c) => c.id === selectedClient)
                              ?.clientFirstName
                          }
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      {isEditingClient ? (
                        <div className="space-y-1">
                          <Input
                            {...register("clientLastName")}
                            className={
                              errors.clientLastName ? "border-red-500" : ""
                            }
                          />
                          {errors.clientLastName && (
                            <p className="text-sm text-red-500">
                              {errors.clientLastName.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-md border">
                          {
                            user.client.find((c) => c.id === selectedClient)
                              ?.clientLastName
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    {isEditingClient ? (
                      <div className="space-y-1">
                        <Input
                          type="email"
                          {...register("clientEmail")}
                          className={errors.clientEmail ? "border-red-500" : ""}
                        />
                        {errors.clientEmail && (
                          <p className="text-sm text-red-500">
                            {errors.clientEmail.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="p-2 rounded-md border">
                        {
                          user.client.find((c) => c.id === selectedClient)
                            ?.clientEmail
                        }
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    {isEditingClient ? (
                      <div className="space-y-1">
                        <Input
                          type="tel"
                          {...register("clientPhone")}
                          className={errors.clientPhone ? "border-red-500" : ""}
                        />
                        {errors.clientPhone && (
                          <p className="text-sm text-red-500">
                            {errors.clientPhone.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="p-2 rounded-md border">
                        {
                          user.client.find((c) => c.id === selectedClient)
                            ?.clientPhone
                        }
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    {isEditingClient ? (
                      <div className="space-y-1">
                        <Input
                          {...register("clientAddress")}
                          className={
                            errors.clientAddress ? "border-red-500" : ""
                          }
                        />
                        {errors.clientAddress && (
                          <p className="text-sm text-red-500">
                            {errors.clientAddress.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="p-2 rounded-md border">
                        {
                          user.client.find((c) => c.id === selectedClient)
                            ?.clientAddress
                        }
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      {isEditingClient ? (
                        <div className="space-y-1">
                          <Input
                            type="date"
                            {...register("dateOfBirth")}
                            className={
                              errors.dateOfBirth ? "border-red-500" : ""
                            }
                          />
                          {errors.dateOfBirth && (
                            <p className="text-sm text-red-500">
                              {errors.dateOfBirth.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-md border">
                          {
                            user.client.find((c) => c.id === selectedClient)
                              ?.dateOfBirth
                          }
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Nationality</Label>
                      {isEditingClient ? (
                        <div className="space-y-1">
                          <Input
                            {...register("nationality")}
                            className={
                              errors.nationality ? "border-red-500" : ""
                            }
                          />
                          {errors.nationality && (
                            <p className="text-sm text-red-500">
                              {errors.nationality.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-md border">
                          {
                            user.client.find((c) => c.id === selectedClient)
                              ?.nationality
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>A-Number</Label>
                      {isEditingClient ? (
                        <div className="space-y-1">
                          <Input
                            {...register("A_number")}
                            className={errors.A_number ? "border-red-500" : ""}
                          />
                          {errors.A_number && (
                            <p className="text-sm text-red-500">
                              {errors.A_number.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-md border">
                          {
                            user.client.find((c) => c.id === selectedClient)
                              ?.A_number
                          }
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Visa Status</Label>
                      {isEditingClient ? (
                        <div className="space-y-1">
                          <Input
                            {...register("visaStatus")}
                            className={
                              errors.visaStatus ? "border-red-500" : ""
                            }
                          />
                          {errors.visaStatus && (
                            <p className="text-sm text-red-500">
                              {errors.visaStatus.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-md border">
                          {
                            user.client.find((c) => c.id === selectedClient)
                              ?.visaStatus
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Legal Concern</Label>
                    {isEditingClient ? (
                      <div className="space-y-1">
                        <Input
                          {...register("legalConcern")}
                          className={
                            errors.legalConcern ? "border-red-500" : ""
                          }
                        />
                        {errors.legalConcern && (
                          <p className="text-sm text-red-500">
                            {errors.legalConcern.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="p-2 rounded-md border">
                        {
                          user.client.find((c) => c.id === selectedClient)
                            ?.legalConcern
                        }
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sponsor Company</Label>
                      {isEditingClient ? (
                        <div className="space-y-1">
                          <Input
                            {...register("sponsorCompany")}
                            className={
                              errors.sponsorCompany ? "border-red-500" : ""
                            }
                          />
                          {errors.sponsorCompany && (
                            <p className="text-sm text-red-500">
                              {errors.sponsorCompany.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-md border">
                          {
                            user.client.find((c) => c.id === selectedClient)
                              ?.sponsorCompany
                          }
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Opposing Party</Label>
                      {isEditingClient ? (
                        <div className="space-y-1">
                          <Input
                            {...register("opposingParty")}
                            className={
                              errors.opposingParty ? "border-red-500" : ""
                            }
                          />
                          {errors.opposingParty && (
                            <p className="text-sm text-red-500">
                              {errors.opposingParty.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-md border">
                          {
                            user.client.find((c) => c.id === selectedClient)
                              ?.opposingParty
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {isEditingClient && (
                  <div className="flex justify-end gap-2">
                    {/* <Button
                      variant="outline"
                      type="button"
                      className="bg-red-500 text-white hover:bg-red-600 dark:text-black dark:bg-red-500 cursor-pointer"
                    >
                      Cancel
                    </Button> */}
                    <Button
                      className="bg-green-500 text-white hover:bg-green-600 dark:text-black dark:bg-green-500 cursor-pointer"
                      type="submit"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientManagement;
