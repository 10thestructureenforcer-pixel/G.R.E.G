import SigninButton from "@/components/auth/signin-buttton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          We currently only support Google sign Up. Please use the button below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <SigninButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default page;
