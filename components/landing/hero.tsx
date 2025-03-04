import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-y-10 text-center mt-20">
        <div className="flex flex-col gap-y-10">
          <h2 className="text-3xl md:text-6xl lg:text-7xl text-[#252525] font-semibold md:w-2/3 mx-auto leading-none">
            AI-Powered Legal Assistant for Criminal Defense Attorneys
          </h2>
          <p className="text-lg md:text-xl">Research Faster, Win Cases</p>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <Link href="/sign-up">
            <button className="group relative inline-flex gap-x-2 h-12 z-20 items-center justify-center overflow-hidden border-2 border-primary rounded-md bg-white px-8 font-medium text-primary transition-all duration-100 [box-shadow:3px_3px_rgb(40_75_98)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(40_75_98)] ">
              Try Free {` `}
              <ArrowUpRight className="text-primary" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
