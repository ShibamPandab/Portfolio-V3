import { Star } from "lucide-react";
import type { GenerationResult } from "@/lib/generation";

export function GTestimonials({
  testimonials,
}: {
  testimonials: GenerationResult["testimonials"];
}) {
  return (
    <section
      className="border-y"
      style={{
        borderColor: "var(--gp-border)",
        backgroundColor: "color-mix(in srgb, var(--gp-card) 55%, var(--gp-bg))",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-16 @md:py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight @md:text-4xl">
          People are talking
        </h2>
        <div className="mt-12 grid gap-4 @md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-(--gp-radius) border p-6"
              style={{
                backgroundColor: "var(--gp-card)",
                borderColor: "var(--gp-border)",
              }}
            >
              <div
                className="flex gap-0.5"
                style={{ color: "var(--gp-primary)" }}
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="block" style={{ color: "var(--gp-muted)" }}>
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
