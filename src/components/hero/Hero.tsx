"use client";

import { useRef } from "react";
import EditorialName from "@/components/hero/EditorialName";
import HeroCharacter from "@/components/hero/HeroCharacter";
import HeroGrain from "@/components/hero/HeroGrain";
import HeroVideo from "@/components/hero/HeroVideo";
import HeroVignette from "@/components/hero/HeroVignette";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import { useParallax } from "@/hooks/useParallax";

/**
 * Landing hero — purely cinematic (no copy; the editorial content lives in
 * the section below).
 *
 * The <section> is intentionally taller than the viewport (200vh) with a
 * `sticky` 100vh stage inside: the visible hero stays a clean 100vh while the
 * extra scroll distance lets the SHIBAM outline fade out as the user scrolls
 * toward the editorial section. Overflow on the stage clips the ~130vh
 * character's lower body below the fold.
 *
 * Layer order inside the stage (back → front):
 *   0.  Looping flag video      — HeroVideo      (z-0)
 *       Dark scrim               — this component (z-[5])
 *   1.  Editorial "SHIBAM"       — EditorialName  (z-[15]) *behind character*
 *   2.  Character (~130vh)       — HeroCharacter  (z-30)   *always on top of bg*
 *       Vignette + film grain     — decorative     (z-[45] / z-50)
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useHeroIntro(rootRef); // one-time load intro (replays only on hard refresh)
  useHeroScroll(rootRef); // ScrollTrigger reveal + idle float
  useParallax(rootRef); // subtle cursor parallax

  return (
    <section
      ref={rootRef}
      data-intro="pending"
      aria-label="Introduction"
      className="hero relative h-[200svh] w-full bg-background"
    >
      {/* No-JS fallback: reveal every animated layer if scripts don't run. */}
      <noscript>
        <style>{`
          .hero [data-anim="video"]{opacity:1!important}
          .hero [data-anim="editorial"]{opacity:1!important;transform:none!important}
        `}</style>
      </noscript>

      {/* Sticky 100vh stage — the visible hero */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* 0 — Video background */}
        <HeroVideo />

        {/* Dark scrim (65–70%) so the video stays subtle */}
        <div
          className="hero-video-scrim pointer-events-none absolute inset-0 z-[5]"
          aria-hidden="true"
        />

        {/* 1 — Editorial branding behind the character */}
        <EditorialName />

        {/* 2 — Character */}
        <HeroCharacter />

        {/* Decorative finish */}
        <HeroVignette />
        <HeroGrain />
      </div>
    </section>
  );
}
