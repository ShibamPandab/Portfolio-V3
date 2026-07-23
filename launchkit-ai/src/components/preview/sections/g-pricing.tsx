import { Check } from "lucide-react";
import type { GenerationResult } from "@/lib/generation";

export function GPricing({
  pricing,
}: {
  pricing: GenerationResult["pricing"];
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 @md:py-24">
      <h2 className="text-center text-3xl font-semibold tracking-tight @md:text-4xl">
        Simple pricing
      </h2>
      <div className="mt-12 grid gap-4 @lg:grid-cols-3">
        {pricing.map((plan) => (
          <div
            key={plan.name}
            className="relative flex flex-col rounded-(--gp-radius) border p-6"
            style={{
              backgroundColor: "var(--gp-card)",
              borderColor: plan.featured ? "var(--gp-primary)" : "var(--gp-border)",
              boxShadow: plan.featured
                ? "0 8px 40px -12px color-mix(in srgb, var(--gp-primary) 45%, transparent)"
                : undefined,
            }}
          >
            {plan.featured && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: "var(--gp-primary)",
                  color: "var(--gp-primary-fg)",
                }}
              >
                Most popular
              </span>
            )}
            <h3 className="font-medium">{plan.name}</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--gp-muted)" }}>
              {plan.description}
            </p>
            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="text-4xl font-semibold tracking-tight">
                {plan.price}
              </span>
              <span className="text-sm" style={{ color: "var(--gp-muted)" }}>
                {plan.period}
              </span>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 size-4 shrink-0"
                    style={{ color: "var(--gp-primary)" }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="mt-7 rounded-(--gp-radius) px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={
                plan.featured
                  ? {
                      backgroundColor: "var(--gp-primary)",
                      color: "var(--gp-primary-fg)",
                    }
                  : {
                      border: "1px solid var(--gp-border)",
                    }
              }
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
