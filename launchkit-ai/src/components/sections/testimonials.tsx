import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const testimonials = [
  {
    quote:
      "I validated three startup ideas in one weekend. The pages looked better than what our old agency delivered in two weeks.",
    name: "Sara Kim",
    role: "Founder, Nestly",
  },
  {
    quote:
      "We collected 1,200 waitlist signups from a page I generated during a lunch break. Genuinely absurd tool.",
    name: "Marcus Chen",
    role: "Indie hacker",
  },
  {
    quote:
      "The copy it writes is the shocking part. It nailed our tone on the first try — we shipped it almost unedited.",
    name: "Amara Osei",
    role: "CMO, Driftpay",
  },
  {
    quote:
      "As a solo dev, design was always my bottleneck. LaunchKit removed it completely.",
    name: "Tom Villar",
    role: "Creator, ShipFast Weekly",
  },
  {
    quote:
      "Our Product Hunt launch page was live 40 minutes after we decided to launch. #2 product of the day.",
    name: "Lena Fischer",
    role: "Co-founder, Kordial",
  },
  {
    quote:
      "It feels like having a senior designer and a copywriter on the team, minus the payroll.",
    name: "Diego Ruiz",
    role: "Founder, Metricly",
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by founders who ship"
        description="Thousands of makers use LaunchKit to validate ideas and launch faster."
      />
      <RevealGroup className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {testimonials.map((t) => (
          <RevealItem key={t.name} className="mb-4 break-inside-avoid">
            <figure className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="flex gap-0.5 text-primary" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="block text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
