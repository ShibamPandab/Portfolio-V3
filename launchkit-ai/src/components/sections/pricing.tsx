import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For testing ideas and weekend projects.",
    cta: "Start for free",
    featured: false,
    features: [
      "3 generated pages",
      "LaunchKit subdomain",
      "Basic analytics",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For founders serious about launching.",
    cta: "Start 14-day trial",
    featured: true,
    features: [
      "Unlimited pages",
      "Custom domains",
      "Waitlist & email capture",
      "Remove LaunchKit branding",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    description: "For agencies and product teams.",
    cta: "Contact sales",
    featured: false,
    features: [
      "Everything in Pro",
      "5 team seats",
      "Shared brand kits",
      "API access",
      "White-label exports",
    ],
  },
];

export function Pricing() {
  return (
    <Section id="pricing" className="border-y border-border bg-card/30">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple pricing, no surprises"
        description="Start free. Upgrade when your idea takes off."
      />
      <RevealGroup className="mt-16 grid gap-4 lg:grid-cols-3" stagger={0.12}>
        {plans.map((plan) => (
          <RevealItem key={plan.name}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-6",
                plan.featured
                  ? "border-primary/40 bg-card shadow-[0_0_60px_-20px] shadow-primary/40"
                  : "border-border bg-card/60"
              )}
            >
              {plan.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full">
                  Most popular
                </Badge>
              )}
              <h3 className="font-medium">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.featured ? "default" : "secondary"}
                className="mt-8"
              >
                {plan.cta}
              </Button>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
