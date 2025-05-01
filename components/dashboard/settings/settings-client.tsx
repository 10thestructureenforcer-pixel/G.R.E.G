"use client";

import { useEffect, useRef, useState } from "react";
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
import { SubmitFeedback } from "@/actions/submit-feedback";
import Link from "next/link";

interface SettingsClientProps {
  user: SettingsUser;
}

export default function SettingsClient({
  user: initialUser,
}: SettingsClientProps) {
  const [user, setUser] = useState(initialUser);
  const [name, setName] = useState<string>(user.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [feedback, setFeedback] = useState<string>("");

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

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const { mutate: submitFeedback } = useMutation({
    mutationKey: ["submit-feedback"],
    mutationFn: async () => {
      const res = await SubmitFeedback(feedback);
      return res;
    },

    onSuccess: (data) => {
      if (data.status == "success") {
        toast.success(data.message);
      }
    },
  });

  const handleSubmitFeedback = async () => {
    //  console.log(feedback);
    await submitFeedback();
    setFeedback("");
  };

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
              onClick={() => {
                setIsEditing(true);
              }}
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
                    ref={inputRef}
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

              <div className="space-y-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-lg border bg-card">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Current Plan</h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${
                              user.planName === "free"
                                ? "bg-gray-500"
                                : user.planName === "start"
                                ? "bg-blue-500"
                                : user.planName === "grow"
                                ? "bg-green-500"
                                : "bg-purple-500"
                            } text-xs capitalize`}
                          >
                            {user.planName}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {user.billingPeriod}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {user.planName === "free" &&
                            "Basic features with limited access"}
                          {user.planName === "start" &&
                            "Perfect for small practices"}
                          {user.planName === "grow" &&
                            "Ideal for growing practices"}
                          {user.planName === "scale" &&
                            "Enterprise-level features"}
                        </p>
                        {user.stripePeriodEnd && (
                          <p className="text-xs text-muted-foreground">
                            Your current plan will expire on{" "}
                            {new Date(user.stripePeriodEnd).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/5">
                            <Users className="w-3 h-3" />
                            <span>
                              {user.planName === "free"
                                ? "1"
                                : user.planName === "start"
                                ? "5"
                                : user.planName === "grow"
                                ? "15"
                                : "30"}{" "}
                              Clients
                            </span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/5">
                            <Shield className="w-3 h-3" />
                            <span>
                              {user.planName === "free"
                                ? "5"
                                : user.planName === "start"
                                ? "20"
                                : user.planName === "grow"
                                ? "50"
                                : "100"}{" "}
                              Cases
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg border bg-card">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Active Clients</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.client.length} clients
                      </p>
                    </div>
                  </div>
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
      <div className="space-y-8">
        {/* Feedback Section */}
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="w-5 h-5 text-primary" />
              Submit Feedback
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Help us improve by sharing your thoughts and suggestions
            </p>
          </CardHeader>
          <CardContent>
            <div
              className="space-y-4 cursor-pointer"
              onMouseEnter={() => {
                inputRef.current?.focus();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-sm font-medium">
                  Your Feedback
                </Label>
                <Input
                  ref={inputRef}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                  id="feedback"
                  placeholder="Share your thoughts with us..."
                  className="h-14 resize-none"
                />
              </div>
              <div className="flex justify-end ">
                <Button
                  onClick={handleSubmitFeedback}
                  className=" bg-yellow-500 hover:bg-yellow-600 dark:hover:bg-yellow-600 dark:bg-yellow-500 cursor-pointer dark:text-black text-white "
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Links */}
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5 text-blue-500" />
              Legal Information
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Review our policies and terms
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-3">
              <Link href="/privacy-policy">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-auto py-2 shadow-md cursor-pointer  dark:border-2 "
                >
                  <Shield className="w-4 h-4 text-blue-500" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium =">
                      Privacy Policy
                    </span>
                    <span className="text-xs text-muted-foreground">
                      How we handle your data
                    </span>
                  </div>
                </Button>
              </Link>
              <Link href="/terms-and-conditions">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 h-auto py-2 shadow-md cursor-pointer  dark:border-2 "
                >
                  <Shield className="w-4 h-4 text-blue-500" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      Terms & Conditions
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Our service agreement
                    </span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        {/* <Card className="border-t-4 border-t-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-red-500">
              <Shield className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Irreversible actions that cannot be undone
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20">
                <p className="text-sm text-red-500 dark:text-red-400">
                  Once you delete your account, there is no going back. All your
                  data will be permanently removed.
                </p>
              </div>
              <Button
                variant="destructive"
                className="w-full bg-red-500 hover:bg-red-600"
                onClick={() => {
                  // Add delete account logic here
                }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
