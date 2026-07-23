import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <Section>
      <Reveal>
        <div className="aurora border-glow relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-20 text-center sm:py-24">
          <div className="absolute left-1/2 top-0 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-5xl">
            Your idea deserves a launch, not a to-do list
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Join thousands of founders shipping landing pages in minutes, not
            weeks. Free to start — live in 60 seconds.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <Link href="/generate">
                Generate my page now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto">
              Talk to us
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
