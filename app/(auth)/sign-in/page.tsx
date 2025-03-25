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
          We currently only support Google,LinkedIn sign up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <SigninButton provider="google" image="/google.png" />
          <p className="text-center">or</p>
          <SigninButton provider="linkedin" image="/linkedin.png" />
        </div>
      </CardContent>
    </Card>
  );
};

export default page;
