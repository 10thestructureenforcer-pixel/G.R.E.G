import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-[80vh]">
        <DotPattern
          glow={true}
          className={cn(
            "absolute inset-0 [mask-image:radial-gradient(transparent)]"
          )}
        />
        <Hero />
      </div>
    </div>
  );
};

export default page;
