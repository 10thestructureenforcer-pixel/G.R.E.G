"use client";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Ready to Transform Your Legal Practice?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of immigration attorneys who are already using G.R.E.G
            to streamline their practice and deliver better outcomes for their
            clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <InteractiveHoverButton
              onClick={() => router.push("/sign-up")}
              className="w-full sm:w-auto min-w-[160px] text-sm sm:text-base"
            >
              Get Started Free
            </InteractiveHoverButton>
            <Button
              variant="outline"
              onClick={() => router.push("/pricing")}
              className="w-full sm:w-auto min-w-[160px] text-sm sm:text-base"
            >
              View Pricing
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
