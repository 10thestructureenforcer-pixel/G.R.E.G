"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();

  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <div>
      <nav>
        <div className="flex items-center justify-between w-full container">
          <div className="flex">
            {!isDashboardRoute && (
              <Image
                src="/logos/greg_4.png"
                alt="logo"
                width={60}
                height={60}
                className="object-contain mx-2 p-2 w-[75px] h-[75px] md:w-[80px] md:h-[80px]"
              />
            )}
          </div>
          {session?.user ? (
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              type="button"
              variant="outline"
              className="bg-green-500 text-white hover:bg-green-600 h-9 shadow cursor-pointer -mx-2 mr-2"
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
                className="hover:bg-green-50 hover:text-green-700 hover:border-green-200 h-9 shadow hidden md:block cursor-pointer mr-2"
              >
                Log in
              </Button>

              <Button
                onClick={() => {
                  router.push("/sign-up");
                }}
                type="button"
                className="bg-green-500 text-white hover:bg-green-600 h-9 cursor-pointer mr-2"
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
