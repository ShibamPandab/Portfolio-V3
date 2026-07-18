"use client";

import { useRef } from "react";
import {
  TECH_GROUPS,
  type TechGroup,
} from "@/components/sections/techstack/techstack.data";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

/**
 * Tech Stack — an editorial, categorized toolkit.
 *
 * Each discipline is a row: a small mono label on the left, the technologies as
 * large hover-lit type on the right, separated by hairline dividers. Rows fade
 * up on scroll via the shared reveal system. Consistent with the Process /
 * Journey editorial rhythm; distinct interaction (per-item hover highlight).
 */
export default function TechStackSection() {
  const rootRef = useRef<HTMLElement>(null);
  useRevealOnScroll(rootRef);

  return (
    <section
      ref={rootRef}
      id="tech-stack"
      aria-label="Tech stack"
      className="relative w-full bg-background px-6 py-[clamp(6rem,16vh,11rem)] sm:px-10 lg:px-16 xl:px-24"
    >
      <noscript>
        <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* Header */}
      <div data-reveal className="reveal-item max-w-2xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
          Tech Stack
        </p>
        <h2 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white/95">
          The toolkit.
        </h2>
      </div>

      {/* Groups */}
      <div className="mt-[clamp(3rem,8vh,6rem)]">
        {TECH_GROUPS.map((group) => (
          <TechRow key={group.no} group={group} />
        ))}
      </div>
    </section>
  );
}

function TechRow({ group }: { group: TechGroup }) {
  return (
    <div
      data-reveal
      className="reveal-item grid grid-cols-1 gap-6 border-t border-white/10 py-[clamp(2rem,4.5vw,3.5rem)] lg:grid-cols-12 lg:gap-12"
    >
      {/* Label */}
      <div className="flex items-baseline gap-4 lg:col-span-3">
        <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/30">
          {group.no}
        </span>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-white/50">
          {group.label}
        </span>
      </div>

      {/* Items */}
      <ul className="flex flex-wrap gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-3 lg:col-span-9">
        {group.items.map((item) => (
          <li
            key={item}
            className="cursor-default text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.02em] text-white/45 transition-colors duration-300 hover:text-white/95"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
