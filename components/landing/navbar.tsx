"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme } = useTheme();

  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <div>
      <nav>
        <div className="flex items-center justify-between w-full container">
          {!isDashboardRoute && (
            <div className="relative overflow-hidden group cursor-pointer w-[45px] h-[45px] md:w-[60px] md:h-[60px] bg-background rounded-lg m-2">
              <Image
                src={
                  theme === "dark" ? "/logos/greg_2.png" : "/logos/greg_2.png"
                }
                alt="logo"
                width={45}
                height={45}
                className="object-contain md:w-[60px] md:h-[60px]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg" />
            </div>
          )}

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
