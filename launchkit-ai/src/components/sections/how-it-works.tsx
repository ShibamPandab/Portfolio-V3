import { MessageSquareText, Palette, Send } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const steps = [
  {
    icon: MessageSquareText,
    step: "01",
    title: "Describe your idea",
    description:
      "One sentence is enough. “An app that matches dog owners with local sitters” — that's it.",
  },
  {
    icon: Palette,
    step: "02",
    title: "AI builds your page",
    description:
      "LaunchKit picks a layout, writes the copy, and styles everything to match your brand vibe.",
  },
  {
    icon: Send,
    step: "03",
    title: "Publish & share",
    description:
      "Go live on a free subdomain in one click. Collect signups before you write a line of code.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-y border-border bg-card/30">
      <SectionHeading
        eyebrow="How it works"
        title="Idea to landing page in three steps"
        description="No design skills. No code. No week-long back-and-forth with an agency."
      />
      <RevealGroup className="mt-16 grid gap-4 md:grid-cols-3" stagger={0.15}>
        {steps.map((step) => (
          <RevealItem key={step.step}>
            <div className="border-glow relative h-full rounded-2xl bg-card p-6">
              <span className="font-mono text-sm text-primary">{step.step}</span>
              <div className="mt-6 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
