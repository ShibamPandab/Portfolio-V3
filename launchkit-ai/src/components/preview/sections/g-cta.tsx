import type { GenerationResult } from "@/lib/generation";

export function GCta({
  cta,
  ctaLabel,
}: {
  cta: GenerationResult["cta"];
  ctaLabel: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 @md:py-24">
      <div
        className="relative overflow-hidden rounded-(--gp-radius) px-6 py-16 text-center @md:py-20"
        style={{
          background: `linear-gradient(120deg, var(--gp-grad-from), var(--gp-grad-to))`,
          color: "var(--gp-primary-fg)",
        }}
      >
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight @md:text-4xl">
          {cta.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm opacity-90 @md:text-base">
          {cta.subheadline}
        </p>
        <button
          className="mt-8 rounded-(--gp-radius) px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.02]"
          style={{
            backgroundColor: "var(--gp-primary-fg)",
            color: "var(--gp-fg)",
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  );
}
