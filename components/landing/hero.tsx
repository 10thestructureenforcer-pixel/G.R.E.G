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
    <div>
      <div className="flex flex-col items-center justify-center gap-y-10 text-center mt-20">
        <div className="flex flex-col gap-y-10">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-semibold md:w-2/3 mx-auto leading-none">
            <span className="text-foreground">AI-Powered</span>{" "}
            <span className="text-green-500 dark:text-green-400">
              Legal Assistant
            </span>{" "}
            <span className="text-foreground">for Defense Attorneys</span>
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            G.R.E.G accelerates legal strategy, streamlines research, and helps
            defense counsel stay sharp and ahead—on every case
          </p>
          <div className="text-xl md:text-xl font-normal">
            <span className="text-foreground">Research Smarter</span>{" "}
            <span className="text-green-500 dark:text-green-400">
              Advocate Stronger,
            </span>
            <span className="text-foreground"> Win More.</span>{" "}
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          {/* <button className="group relative inline-flex gap-x-2 h-12 z-20 items-center justify-center overflow-hidden border-2 border-primary rounded-md bg-white px-8 font-medium text-primary transition-all duration-100 [box-shadow:3px_3px_rgb(40_75_98)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(40_75_98)] ">
                Try Free {` `}
                <ArrowUpRight className="text-primary" />
            </button> */}
          <InteractiveHoverButton onClick={handleClick}>
            Get Started
          </InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
