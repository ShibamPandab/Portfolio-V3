"use client";

import { useRef } from "react";
import AmbientParticles from "@/components/hero/AmbientParticles";
import EditorialName from "@/components/hero/EditorialName";
import HeroCharacter from "@/components/hero/HeroCharacter";
import HeroContent from "@/components/hero/HeroContent";
import HeroFlag from "@/components/hero/HeroFlag";
import HeroGlow from "@/components/hero/HeroGlow";
import HeroGrain from "@/components/hero/HeroGrain";
import HeroVignette from "@/components/hero/HeroVignette";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { useParallax } from "@/hooks/useParallax";

/**
 * Full-viewport editorial hero.
 *
 * Layer order (back → front):
 *   0.  Pure black background (section)
 *   1.  Atmospheric flag        — HeroFlag       (z-10)
 *       Dark scrim               — this component (z-[12])
 *   2.  Editorial name           — EditorialName  (z-20)  *behind character*
 *   3.  Radial glow              — HeroGlow       (z-[22])
 *   4.  Ambient particles        — AmbientParticles (z-[24]) *behind character*
 *   5.  Character cut-out        — HeroCharacter  (z-30)  *always on top of bg*
 *   6.  Foreground copy + CTA    — HeroContent    (z-40)
 *       Vignette + film grain     — decorative     (z-[45] / z-50)
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  // Intro plays once per document load (replays only on a hard refresh).
  useHeroIntro(rootRef);
  // Subtle cursor parallax across the flag, editorial name and character.
  useParallax(rootRef);

  return (
    <section
      ref={rootRef}
      data-intro="pending"
      aria-label="Introduction"
      className="hero relative h-[100svh] w-full overflow-hidden bg-background"
    >
      {/* No-JS fallback: reveal every animated layer if scripts don't run. */}
      <noscript>
        <style>{`
          .hero [data-anim="char"],.hero [data-anim="line"],.hero [data-anim="cta"]{opacity:1!important;transform:none!important;filter:none!important}
          .hero [data-anim="glow"],.hero [data-anim="particles"]{opacity:1!important}
          .hero [data-anim="flag-base"]{opacity:.19!important}
          .hero [data-anim="flag-reveal"]{opacity:.15!important;clip-path:inset(0 0 0 0)!important}
          .hero [data-anim="editorial"]{opacity:.09!important;transform:none!important}
        `}</style>
      </noscript>

      {/* 1 — Atmospheric flag */}
      <HeroFlag />

      {/* Dark scrim to push the flag back (kept light so it stays readable) */}
      <div
        className="hero-flag-scrim pointer-events-none absolute inset-0 z-[12]"
        aria-hidden="true"
      />

      {/* 2 — Editorial branding behind the character */}
      <EditorialName />

      {/* 3 — Radial glow for separation */}
      <HeroGlow />

      {/* 4 — Ambient particles behind the character */}
      <AmbientParticles />

      {/* 5 — Character (always in front of the background) */}
      <HeroCharacter />

      {/* 6 — Foreground copy + CTA */}
      <HeroContent />

      {/* Decorative finish */}
      <HeroVignette />
      <HeroGrain />
    </section>
  );
}
