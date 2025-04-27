"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { ModeToggle } from "../mood-toggle";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // const logo =
  //   theme === "dark" ? "/logos/logo_dark_mode.png" : "/logos/greg_final.png";

  const darkLogo = "/logos/logo_dark_mode.png";
  const lightLogo = "/logos/greg_final.png";

  // useEffect(() => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  //   console.log("hhhh");
  // }, []);

  // const logo =
  //   theme === "dark" ? "/logos/logo_dark_mode.png" : "/logos/greg_final.png";
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <div className="w-full border-b border-gray-200/50 dark:border-gray-800/50">
      <nav className="w-full">
        <div className="flex items-center justify-between w-full container mx-auto p-2">
          {/* Logo section - left side */}
          {!isDashboardRoute && (
            <div className="relative overflow-hidden group cursor-pointer w-[40px] h-[40px] md:w-[60px] md:h-[60px] bg-background rounded-md">
              {!mounted ? (
                <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-950 rounded-md" />
              ) : theme === "dark" ? (
                <>
                  <Image
                    src={darkLogo}
                    alt="logo"
                    width={60}
                    height={60}
                    className="object-contain w-full h-full"
                  />
                </>
              ) : (
                <>
                  <Image
                    src={lightLogo}
                    alt="logo"
                    width={60}
                    height={60}
                    className="object-contain w-full h-full"
                  />
                </>
              )}
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
                    className="dark:bg-green-500 bg-green-500  hover:dark:bg-green-600 text-white hover:dark:text-black hover:bg-green-600 h-9 shadow cursor-pointer text-sm md:text-base"
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
