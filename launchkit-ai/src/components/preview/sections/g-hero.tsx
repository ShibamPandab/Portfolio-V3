import type { GenerationResult } from "@/lib/generation";

export function GHero({
  brand,
  hero,
}: {
  brand: GenerationResult["brand"];
  hero: GenerationResult["hero"];
}) {
  return (
    <header className="relative overflow-hidden">
      {/* brand-tinted glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 blur-3xl"
        style={{
          background: `linear-gradient(120deg, var(--gp-grad-from), var(--gp-grad-to))`,
        }}
      />

      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="text-lg font-semibold">{brand.name}</span>
        <button
          className="rounded-(--gp-radius) px-4 py-2 text-sm font-medium"
          style={{
            backgroundColor: "var(--gp-primary)",
            color: "var(--gp-primary-fg)",
          }}
        >
          {hero.cta}
        </button>
      </nav>

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 text-center @md:pt-24 @md:pb-28">
        <p
          className="mx-auto w-fit rounded-full border px-3 py-1 text-xs font-medium"
          style={{ borderColor: "var(--gp-border)", color: "var(--gp-muted)" }}
        >
          {brand.tagline}
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance @md:text-6xl">
          {hero.headline}
        </h1>
        <p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed @md:text-lg"
          style={{ color: "var(--gp-muted)" }}
        >
          {hero.subheadline}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 @sm:flex-row">
          <button
            className="w-full rounded-(--gp-radius) px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 @sm:w-auto"
            style={{
              backgroundColor: "var(--gp-primary)",
              color: "var(--gp-primary-fg)",
            }}
          >
            {hero.cta}
          </button>
          <button
            className="w-full rounded-(--gp-radius) border px-6 py-3 text-sm font-medium @sm:w-auto"
            style={{ borderColor: "var(--gp-border)" }}
          >
            {hero.secondaryCta}
          </button>
        </div>
      </div>
    </header>
  );
}
