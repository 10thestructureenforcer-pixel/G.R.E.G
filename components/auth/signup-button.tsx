"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const SignupButton = () => {
  async function handleSignIn() {
    await signIn("google", { redirectTo: "/dashboard" });
  }
  return (
    <div>
      <Button
        variant="default"
        className="w-full cursor-pointer "
        onClick={handleSignIn}
      >
        Sign Up with{" "}
        <span>
          <Image
            src={"/google.png"}
            className="ml-2 object-cover"
            alt="google"
            width={24}
            height={24}
          />
        </span>
      </Button>
    </div>
  );
};

export default SignupButton;
