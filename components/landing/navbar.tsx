"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { ModeToggle } from "../mood-toggle";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme } = useTheme();

  const logo =
    theme === "dark" ? "/logos/logo_dark_mode.png" : "/logos/greg_final.png";
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <div className="w-full border-2 border-b-neutral-400/40 dark:border-b-white/10">
      <nav className="w-full">
        <div className="flex items-center justify-between w-full container mx-auto p-2">
          {/* Logo section - left side */}
          {!isDashboardRoute && (
            <div className="relative overflow-hidden group cursor-pointer w-[50px] h-[50px] md:w-[75px] bg-background  md:h-[70px] rounded-md  ">
              <Image
                src={logo}
                alt="logo"
                width={90}
                height={90}
                className="object-contain bg-background "
                priority
              />
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
                <Link href={"/dashboard"}>
                  <Button
                    type="button"
                    variant="outline"
                    className="dark:bg-green-500 bg-green-500 text-black hover:bg-green-600 h-9 shadow cursor-pointer text-sm md:text-base"
                  >
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-x-2 md:gap-x-4">
                <Link href={"/sign-in"}>
                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-green-50 hover:text-green-700 hover:border-green-200 h-8 shadow cursor-pointer text-sm md:text-base"
                  >
                    Log in
                  </Button>
                </Link>

                <Link href={"/sign-up"}>
                  <Button
                    type="button"
                    className="bg-green-500 text-white hover:bg-green-600 h-8 cursor-pointer text-sm md:text-base"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
