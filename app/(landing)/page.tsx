import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5">
      <Navbar />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
        <DotPattern
          glow={true}
          className={cn("[mask-image:radial-gradient(transparent)]")}
        />
        <Hero />
      </div>
    </div>
  );
};

export default page;
