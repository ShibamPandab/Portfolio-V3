/**
 * Foreground copy — a compact, left-aligned editorial block anchored to the
 * bottom of the hero (deliberately *not* a giant centred headline). Each
 * element fades upward in sequence: kicker → heading → subtitle → CTA.
 *
 * Clean typography: high-contrast white with a very subtle text shadow for
 * readability over the character — no glassmorphism, no glow.
 *
 * `[data-anim="line"]` elements fade up on the stagger; `[data-anim="cta"]`
 * reveals last.
 */
export default function HeroContent() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-end">
      <div className="mx-auto w-full max-w-6xl px-6 pb-[clamp(2.5rem,9vh,5.5rem)] sm:px-10 lg:px-12">
        <div className="max-w-xl text-left">
          <p
            data-anim="line"
            className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/50"
          >
            Frontend Engineer · Motion · AI
          </p>

          <h1
            data-anim="line"
            className="hero-text-shadow mt-5 text-balance text-[clamp(1.75rem,3.4vw,2.9rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white/95"
          >
            AI-Assisted Frontend Developer
          </h1>

          <p
            data-anim="line"
            className="hero-text-shadow mt-5 max-w-md text-pretty text-[clamp(0.95rem,1.35vw,1.075rem)] leading-relaxed text-white/70"
          >
            Crafting premium AI-powered web experiences with modern frontend
            engineering, motion design and thoughtful user experiences.
          </p>

          <div className="mt-8">
            <a
              data-anim="cta"
              href="#projects"
              className="group pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-medium tracking-tight text-white/95 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View Projects
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
