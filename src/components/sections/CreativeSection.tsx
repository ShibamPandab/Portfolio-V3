"use client";

import { useRef } from "react";
import PortraitCard from "@/components/sections/PortraitCard";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

/**
 * Third section — the mirror of the editorial section above it.
 *
 * Where that one runs text-left / portrait-right (45/55), this runs
 * portrait-left / text-right (55/45), so the two read as one continuous story.
 *
 * Only the *layout* is mirrored — the motion is not. Every element uses the
 * plain `data-reveal` from the shared system, so the portrait and copy rise
 * vertically and fade in with exactly the same distance, easing, duration and
 * 130ms stagger as the section above. No horizontal movement.
 *
 * Typography scale, spacing rhythm and the black aesthetic are deliberately
 * kept identical to the section above.
 */
export default function CreativeSection() {
  const rootRef = useRef<HTMLElement>(null);
  useRevealOnScroll(rootRef);

  return (
    <section
      ref={rootRef}
      id="experiments"
      aria-label="Creative web experiences"
      className="relative w-full bg-background px-6 py-[clamp(6rem,16vh,11rem)] sm:px-10 lg:px-16 xl:px-24"
    >
      {/* No-JS fallback: show the content if scripts don't run. */}
      <noscript>
        <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* Full-bleed: no max-width cap, so the layout spans the whole browser
          width (bounded only by the section's side padding). The wider gap keeps
          generous breathing room between the portrait and the copy. */}
      <div className="flex w-full flex-col gap-14 lg:flex-row lg:items-center lg:gap-24 xl:gap-32">
        {/* LEFT — portrait card (55%) — mirrors the 55% card in the section above */}
        <div
          data-reveal
          className="reveal-item order-2 w-full lg:order-1 lg:w-[55%]"
        >
          <PortraitCard
            src="/images/back-show.jpeg"
            alt="Shibam Pandab seen from behind, wearing a jersey reading 12 SHIBAM"
          />
        </div>

        {/* RIGHT — copy (45%) */}
        <div className="order-1 w-full lg:order-2 lg:w-[45%]">
          <p
            data-reveal
            className="reveal-item font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/55"
          >
            Creative Web Experiences
          </p>

          <h2 className="hero-text-shadow mt-6 text-[clamp(2.25rem,4vw,3.5rem)] font-medium leading-[1.03] tracking-[-0.025em] text-white/95">
            <span data-reveal className="reveal-item block">
              Creative Web Experiences
            </span>
          </h2>

          <p
            data-reveal
            className="reveal-item mt-5 text-[clamp(0.9rem,1.2vw,1rem)] tracking-[0.01em] text-white/50"
          >
            3D Interfaces • Motion Design • Interactive UI
          </p>

          <p
            data-reveal
            className="reveal-item mt-7 max-w-md text-pretty text-[clamp(0.95rem,1.35vw,1.075rem)] leading-relaxed text-white/70"
          >
            I build immersive landing pages with smooth animations, premium
            interactions, cinematic scrolling and modern web experiences.
          </p>

          <div data-reveal className="reveal-item mt-10">
            <a
              href="#experiments"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-medium tracking-tight text-white/95 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Explore Experiments
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
    </section>
  );
}
