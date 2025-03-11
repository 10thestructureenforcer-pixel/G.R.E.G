import React from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-y-10 text-center mt-20">
        <div className="flex flex-col gap-y-10">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-semibold md:w-2/3 mx-auto leading-none">
            <span className="text-black">AI-Powered</span>{" "}
            <span className="text-green-500">Legal Assistant</span>{" "}
            <span className="text-black">for Criminal Defense Attorneys</span>
          </h2>
          <p className="text-xl md:text-xl font-normal">
            <span className="text-black">Research Faster,</span>{" "}
            <span className="text-green-500">Win Cases</span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          {/* <button className="group relative inline-flex gap-x-2 h-12 z-20 items-center justify-center overflow-hidden border-2 border-primary rounded-md bg-white px-8 font-medium text-primary transition-all duration-100 [box-shadow:3px_3px_rgb(40_75_98)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(40_75_98)] ">
                Try Free {` `}
                <ArrowUpRight className="text-primary" />
            </button> */}
          <InteractiveHoverButton>Get Started</InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
