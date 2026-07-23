import {
  Gauge,
  LayoutTemplate,
  PenLine,
  Rocket,
  Smartphone,
  Wand2,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const features = [
  {
    icon: Wand2,
    title: "AI-crafted design",
    description:
      "Every page is composed from a curated design system — never a generic template.",
  },
  {
    icon: PenLine,
    title: "Copy that converts",
    description:
      "Headlines, benefits, and CTAs written for your audience, not lorem ipsum.",
  },
  {
    icon: Gauge,
    title: "Blazing performance",
    description:
      "Static, edge-delivered pages that score 95+ on Lighthouse out of the box.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description:
      "Pixel-perfect on every screen size, from iPhone SE to ultrawide monitors.",
  },
  {
    icon: LayoutTemplate,
    title: "Fully editable",
    description:
      "Tweak any section, color, or word after generation. Your page, your rules.",
  },
  {
    icon: Rocket,
    title: "One-click deploy",
    description:
      "Publish to a free subdomain or connect your own custom domain instantly.",
  },
];

export function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need to launch"
        description="From first idea to first visitor — LaunchKit handles design, copy, and deployment so you can focus on building."
      />
      <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <RevealItem key={feature.title}>
            <div className="group h-full rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/30 hover:bg-card">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
