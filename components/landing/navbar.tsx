"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div>
      <nav>
        <div className="flex items-center justify-between w-full container ">
          <div className=" flex">
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/000/585/723/small/07-01.jpg"
              alt="logo"
              width={100}
              height={100}
              className="w-28 -my-3 "
            />
            <p className="p-3 -mx-6 text-3xl font-semibold">G.R.E.G </p>
          </div>
          {session?.user ? (
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              type="button"
              variant="outline"
              className="bg-green-400 h-9 shadow hidden md:block cursor-pointer"
            >
              Dashboard
            </Button>
          ) : (
            <div className="flex gap-x-4">
              <Button
                onClick={() => {
                  router.push("/sign-in");
                }}
                type="button"
                variant="outline"
                className="hover:bg-gray-50 h-9 shadow hidden md:block cursor-pointer"
              >
                Log in
              </Button>

              <Button
                onClick={() => {
                  router.push("/sign-up");
                }}
                type="button"
                className="bg-primary hover:bg-primary/80 h-9 cursor-pointer"
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
