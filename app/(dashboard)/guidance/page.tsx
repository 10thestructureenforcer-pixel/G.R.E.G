import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import {
  MessageSquare,
  Scale,
  Briefcase,
  Building2,
  ArrowRight,
  // Calendar as CalendarIcon,
  // Clock,
  // Video,
  // ChevronRight,
  // Users,
  // CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import CalendarMeeting from "@/components/dashboard/guidance/calendar-meeting";

const features = [
  {
    title: "AI Legal Assistant",
    description:
      "Get instant answers to your legal questions and guidance on immigration matters with our advanced AI chatbot.",
    icon: MessageSquare,
    href: "/guidance/chat",
    gradient: "from-blue-500/20 to-green-500/20",
  },
  {
    title: "Visa Comparison Tool",
    description:
      "Compare different visa options (L-1, H-1B, O-1,F-1 etc) and get detailed insights on eligibility and requirements.",
    icon: Scale,
    href: "/guidance/visa-comparison",
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  // {
  //   title: "Removal Defense Assistant",
  //   description:
  //     "Real-time development of case theories and strategic defenses under INA 237/212, identifying waivers and protection options.",
  //   icon: Briefcase,
  //   href: "/removal-defense",
  //   gradient: "from-orange-500/20 to-red-500/20",
  // },
  // {
  //   title: "Business Immigration Guide",
  //   description:
  //     "Comprehensive guidance for investor visas (EB-5, E-2) and compliance for I-9 audits, FDNS site visits, and consular inquiries.",
  //   icon: Building2,
  //   href: "/business-immigration",
  //   gradient: "from-green-500/20 to-teal-500/20",
  // },
];

// const upcomingMeetings = [
//   {
//     title: "H-1B Consultation",
//     time: "Today, 2:00 PM",
//     participants: 2,
//     confirmed: true,
//   },
//   {
//     title: "EB-5 Review",
//     time: "Tomorrow, 10:00 AM",
//     participants: 3,
//     confirmed: false,
//   },
// ];

const PageContent = () => {
  return (
    <div className=" bg-gradient-to-b from-background to-background/95 overflow-auto">
      <div className="container h-full py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 text-left">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              Legal Guidance Center
            </h1>
            <p className="text-sm text-muted-foreground">
              Access our comprehensive suite of legal tools and resources to
              streamline your immigration practice.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-2">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group relative overflow-hidden border  duration-300"
                >
                  <div className={cn("absolute inset-0 ", feature.gradient)} />
                  <CardHeader className="relative p-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300">
                        <feature.icon className="w-4 h-4 text-green-500 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-sm">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-xs line-clamp-2">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative p-2 pt-0">
                    <Link href={feature.href} className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-green-500/10 group-hover:text-green-500 dark:group-hover:text-green-400 transition-all duration-300 cursor-pointer"
                      >
                        GO
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[50vh] flex items-center justify-center">
          <div className="flex items-center gap-2 text-green-600">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
};

export default Page;
