"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, User, Mail, Users, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsClientProps {
  user: any;
}

export default function SettingsClient({
  user: initialUser,
}: SettingsClientProps) {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <Button
              className="bg-green-500 text-white hover:bg-green-600 dark:text-black dark:bg-green-500 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="w-4 h-4 " />
              {isEditing ? "Editing..." : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Your profile picture
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                ) : (
                  <div className="p-2 rounded-md border-2 cursor-pointer hover:bg-muted transition-colors">
                    <p className="text-sm">{user.name}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="email">Email</Label>
                <div className="p-2 rounded-md border-2 cursor-pointer hover:bg-muted transition-colors">
                  <p className="text-sm text-muted-foreground ">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Account Type</p>
                  <Badge variant={user.isPro ? "default" : "secondary"}>
                    {user.isPro ? "Pro Account" : "Free Account"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Active Clients</p>
                  <p className="text-sm text-muted-foreground">
                    {user.client.length} clients
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Management Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Client Management
            </CardTitle>
          </CardHeader>
          {/* <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Client</Label>
                <Select
                  value={selectedClient}
                  onValueChange={setSelectedClient}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {user.client.map((client: any) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClient && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    {isEditing ? (
                      <Input
                        value={
                          user.client.find((c: any) => c.id === selectedClient)
                            ?.name || ""
                        }
                        onChange={(e) => {
                          const updatedClients = user.client.map((c: any) =>
                            c.id === selectedClient
                              ? { ...c, name: e.target.value }
                              : c
                          );
                          setUser({ ...user, client: updatedClients });
                        }}
                      />
                    ) : (
                      <div className="p-2 rounded-md hover:bg-muted transition-colors">
                        <p className="text-sm">
                          {
                            user.client.find(
                              (c: any) => c.id === selectedClient
                            )?.name
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Client Email</Label>
                    {isEditing ? (
                      <Input
                        value={
                          user.client.find((c: any) => c.id === selectedClient)
                            ?.email || ""
                        }
                        onChange={(e) => {
                          const updatedClients = user.client.map((c: any) =>
                            c.id === selectedClient
                              ? { ...c, email: e.target.value }
                              : c
                          );
                          setUser({ ...user, client: updatedClients });
                        }}
                      />
                    ) : (
                      <div className="p-2 rounded-md hover:bg-muted transition-colors">
                        <p className="text-sm text-muted-foreground">
                          {
                            user.client.find(
                              (c: any) => c.id === selectedClient
                            )?.email
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Client Status</Label>
                    {isEditing ? (
                      <Select
                        value={
                          user.client.find((c: any) => c.id === selectedClient)
                            ?.status || ""
                        }
                        onValueChange={(value) => {
                          const updatedClients = user.client.map((c: any) =>
                            c.id === selectedClient
                              ? { ...c, status: value }
                              : c
                          );
                          setUser({ ...user, client: updatedClients });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 rounded-md hover:bg-muted transition-colors">
                        <p className="text-sm">
                          {
                            user.client.find(
                              (c: any) => c.id === selectedClient
                            )?.status
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent> */}
        </Card>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2">
          <Button
            className="dark:text-white text-black"
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setUser(initialUser);
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600 dark:text-black dark:bg-green-500 cursor-pointer"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
