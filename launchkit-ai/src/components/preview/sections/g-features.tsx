import {
  Cloud,
  Heart,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import type { GenerationResult } from "@/lib/generation";

const icons = [Rocket, TrendingUp, Heart, Cloud, ShieldCheck, Users];

export function GFeatures({
  features,
}: {
  features: GenerationResult["features"];
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 @md:py-24">
      <h2 className="text-center text-3xl font-semibold tracking-tight @md:text-4xl">
        Why you&apos;ll love it
      </h2>
      <div className="mt-12 grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={feature.title}
              className="rounded-(--gp-radius) border p-6"
              style={{
                backgroundColor: "var(--gp-card)",
                borderColor: "var(--gp-border)",
              }}
            >
              <span
                className="flex size-10 items-center justify-center rounded-(--gp-radius)"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--gp-primary) 12%, transparent)",
                  color: "var(--gp-primary)",
                }}
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-medium">{feature.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--gp-muted)" }}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
