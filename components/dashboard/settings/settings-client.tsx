"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, User, Mail, Users, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProfileName } from "@/actions/edit-profile-name";
import toast from "react-hot-toast";
import { Client, SettingsUser } from "@/lib/types";
import ClientManagement from "./client-management";

interface SettingsClientProps {
  user: SettingsUser;
}

export default function SettingsClient({
  user: initialUser,
}: SettingsClientProps) {
  const [user, setUser] = useState(initialUser);
  const [name, setName] = useState<string>(user.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const handleSave = () => {
    setIsEditing(false);
    mutate();
  };

  const { mutate } = useMutation({
    mutationKey: ["edit-name"],
    mutationFn: async () => {
      const res = await EditProfileName(name);
      return res;
    },
    onSuccess: (data) => {
      setUser((prev: any) => ({
        ...prev,
        name,
      }));
      setIsEditing(false);
      if (data.status == "success") {
        toast.success(data.message);
      }
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <Card className="h-fit">
          <CardHeader className="flex flex-row items-center  justify-between">
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
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{name}</h3>
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
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                ) : (
                  <div className="p-2 rounded-md border-2 cursor-pointer hover:bg-muted transition-colors">
                    <p className="text-sm">{name}</p>
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
          </CardContent>
        </Card>

        <ClientManagement user={user} />
      </div>
    </div>
  );
}
