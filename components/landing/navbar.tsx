"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { ModeToggle } from "../mood-toggle";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme } = useTheme();

  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <div className="w-full">
      <nav className="w-full">
        <div className="flex items-center justify-between w-full container mx-auto px-2 py-1">
          {/* Logo section - left side */}
          {!isDashboardRoute && (
            <div className="relative overflow-hidden group cursor-pointer w-[40px] h-[40px] md:w-[60px] bg-background  md:h-[60px] rounded-md mt-1 ">
              <Image
                src={
                  theme === "dark"
                    ? "/logos/greg_final.png"
                    : "/logos/greg_final.png"
                }
                alt="logo"
                width={70}
                height={70}
                className="object-contain bg-red-100 "
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg" />
            </div>
          )}

          {/* Center section - can be used for navigation links if needed */}
          <div className="flex-1 flex justify-center mx-2">
            {/* Add navigation links here if needed */}
            <div className="sm:ml-auto  ml-auto hidden sm:block ">
              <ModeToggle />
            </div>
          </div>

          {/* Auth section - right side */}
          <div className="flex items-center ml-auto mr-2">
            {session?.user ? (
              <div className="flex justify-end w-full">
                <Button
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  type="button"
                  variant="outline"
                  className="dark:bg-green-500 bg-green-500 text-black hover:bg-green-600 h-9 shadow cursor-pointer text-sm md:text-base"
                >
                  Dashboard
                </Button>
              </div>
            ) : (
              <div className="flex gap-x-2 md:gap-x-4">
                <Button
                  onClick={() => {
                    router.push("/sign-in");
                  }}
                  type="button"
                  variant="outline"
                  className="hover:bg-green-50 hover:text-green-700 hover:border-green-200 h-8 shadow cursor-pointer text-sm md:text-base"
                >
                  Log in
                </Button>

                <Button
                  onClick={() => {
                    router.push("/sign-up");
                  }}
                  type="button"
                  className="bg-green-500 text-white hover:bg-green-600 h-8 cursor-pointer text-sm md:text-base"
                >
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
