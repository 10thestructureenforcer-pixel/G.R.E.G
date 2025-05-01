import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[28rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl p-8",
      // light styles
      "bg-background/50 backdrop-blur-sm [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-background/50 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      "transition-all duration-300 ease-in-out hover:scale-[1.01]",
      className
    )}
    {...props}
  >
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-green-500/10 p-3">
          <Icon className="h-8 w-8 text-green-500 transition-all duration-300 ease-in-out group-hover:scale-105" />
        </div>
        <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
      </div>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>

    <div className="mt-6">
      <Button
        variant="ghost"
        asChild
        size="lg"
        className="w-full text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-transparent"
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-5 w-5 rtl:rotate-180" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-green-500/[.02] group-hover:dark:bg-green-500/3" />
  </div>
);

export { BentoCard, BentoGrid };
