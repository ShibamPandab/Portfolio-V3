"use client";

import { useRef } from "react";
import PortraitCard from "@/components/sections/PortraitCard";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

/**
 * Second section — the editorial, content-focused counterpart to the cinematic
 * landing hero.
 *
 * Two-column layout: copy on the left (45%), large portrait card on the right
 * (55%), stacking on smaller screens. Every `[data-reveal]` element fades up
 * with a 130ms stagger as the section scrolls into view.
 */
export default function EditorialSection() {
  const rootRef = useRef<HTMLElement>(null);
  useRevealOnScroll(rootRef);

  return (
    <section
      ref={rootRef}
      id="about"
      aria-label="About"
      className="relative w-full bg-background px-6 py-[clamp(6rem,16vh,11rem)] sm:px-10 lg:px-12"
    >
      {/* No-JS fallback: show the copy if scripts don't run. */}
      <noscript>
        <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <div className="mx-auto flex max-w-6xl flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
        {/* Left — 45% */}
        <div className="w-full lg:w-[45%]">
          <p
            data-reveal
            className="reveal-item font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/55"
          >
            Frontend Engineer • Motion • AI
          </p>

          <h2 className="hero-text-shadow mt-6 text-[clamp(2.25rem,4vw,3.5rem)] font-medium leading-[1.03] tracking-[-0.025em] text-white/95">
            <span data-reveal className="reveal-item block">
              AI-Assisted
            </span>
            <span
              data-reveal
              className="reveal-item block bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent"
            >
              Frontend Developer
            </span>
          </h2>

          <p
            data-reveal
            className="reveal-item mt-7 max-w-md text-pretty text-[clamp(0.95rem,1.35vw,1.075rem)] leading-relaxed text-white/70"
          >
            Crafting premium AI-powered web experiences with modern frontend
            engineering, motion design and thoughtful user experiences.
          </p>

          <div data-reveal className="reveal-item mt-10">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-medium tracking-tight text-white/95 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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

        {/* Right — 55% */}
        <div data-reveal className="reveal-item w-full lg:w-[55%]">
          <PortraitCard />
        </div>
      </div>
    </section>
  );
}
