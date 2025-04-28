import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import Testimonials from "@/components/landing/testimonials";
import Statistics from "@/components/landing/statistics";
import CTA from "@/components/landing/cta";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { cn } from "@/lib/utils";
import React from "react";
import {
  FileTextIcon,
  GlobeIcon,
  CalendarIcon,
  BellIcon,
  BookOpenIcon,
  ScaleIcon,
  UsersIcon,
  ShieldCheckIcon,
  BrainCircuitIcon,
} from "lucide-react";

const features = [
  {
    Icon: BookOpenIcon,
    name: "Case Law Research",
    description:
      "Access comprehensive immigration case law database with AI-powered search and analysis.",
    href: "/",
    cta: "Explore Cases",
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: ScaleIcon,
    name: "Legal Analysis",
    description:
      "Get detailed analysis of immigration cases with precedent tracking and success rates.",
    href: "/",
    cta: "View Analysis",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: UsersIcon,
    name: "Client Management",
    description:
      "Track client cases, documents, and deadlines in one secure platform.",
    href: "/",
    cta: "Manage Clients",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: BrainCircuitIcon,
    name: "AI-Powered Analysis",
    description:
      "Get instant analysis of immigration cases with AI-powered tools.",
    href: "/",
    cta: "Learn More",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: ShieldCheckIcon,
    name: "Compliance Tools",
    description:
      "Stay updated with latest immigration laws and compliance requirements.",
    href: "/",
    cta: "Check Compliance",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];

const page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative flex h-[500px] w-auto flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <DotPattern
            glow={true}
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
            )}
          />
          <Hero />
        </div>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Immigration Law Solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools and resources for immigration attorneys to
                streamline their practice and deliver better outcomes for
                clients.
              </p>
            </div>
            <BentoGrid className="lg:grid-rows-2 gap-4">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </div>
        {/* <Statistics /> */}
        {/* <Testimonials />
        <CTA /> */}
      </main>
      <div className="my-2">
        <Footer />
      </div>
    </div>
  );
};

export default page;
