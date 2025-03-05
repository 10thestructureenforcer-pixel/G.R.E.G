import SignupButton from "@/components/auth/signup-button";
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
    <div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            We currently only support Google sign Up. Please use the button
            below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <SignupButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
