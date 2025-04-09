"use client";
import React from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Hero = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-center justify-center gap-y-6 sm:gap-y-8 md:gap-y-10 text-center">
        <div className="flex flex-col gap-y-2 sm:gap-y-6 md:gap-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold w-full sm:w-4/5 md:w-2/3 mx-auto leading-tight">
            <span className="text-foreground">AI-Powered</span>{" "}
            <span className="text-green-500 dark:text-green-400">
              Legal Assistant
            </span>{" "}
            <span className="text-foreground">for Defense Attorneys</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            G.R.E.G accelerates legal strategy, streamlines research, and helps
            defense counsel stay sharp and ahead—on every case
          </p>
          <div className="text-lg sm:text-xl font-normal">
            <span className="text-foreground">Research Smarter</span>{" "}
            <span className="text-green-500 dark:text-green-400">
              Advocate Stronger,
            </span>
            <span className="text-foreground"> Win More.</span>{" "}
          </div>
        </div>
        <div className="flex flex-col items-center   ">
          <InteractiveHoverButton
            onClick={handleClick}
            className="w-full sm:w-auto min-w-[160px] text-sm sm:text-base"
          >
            Get Started
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
