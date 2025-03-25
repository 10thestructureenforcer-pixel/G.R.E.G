"use client";
import { signIn } from "next-auth/react";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const SigninButton = ({
  provider,
  image,
}: {
  provider: string;
  image: string;
}) => {
  async function handleSignIn() {
    await signIn(provider, { redirectTo: "/dashboard" });
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
            src={image}
            className=" object-cover"
            alt={image == "/logos/google.png" ? "google" : "linkedin"}
            width={22}
            height={22}
          />
        </span>
      </Button>
    </div>
  );
};

export default SigninButton;
