"use client";

import { useRef } from "react";
import { ENTRIES, type Entry } from "@/components/sections/timeline/timeline.data";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useStoryTimeline } from "@/hooks/useStoryTimeline";

/**
 * Cinematic storytelling timeline — part of the normal page flow (no pinning,
 * so the page never "stops" to play the animation).
 *
 * Rows are tall (~78vh) and equal-height, which does two things: it keeps the
 * current entry and its neighbour on screen together, and it puts every marker
 * at a predictable fraction of the line so the draw stays in sync (see
 * useStoryTimeline). Total section height lands around 200vh.
 *
 * Cards are full-bleed within their half of the grid — matching the scale of
 * the Projects rows below — and alternate left/right around a centred line.
 */
export default function TimelineSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  useStoryTimeline(rootRef);
  useRevealOnScroll(outroRef); // shared fade-up system, same easing as sections above

  return (
    <section
      id="process"
      aria-label="Journey"
      className="relative w-full bg-background px-6 py-[clamp(4rem,10vh,7rem)] sm:px-10 lg:px-16 xl:px-24"
    >
      {/* No-JS fallback: present the finished timeline. */}
      <noscript>
        <style>{`
          .timeline-card{opacity:1!important;transform:none!important}
          .timeline-progress{transform:scaleY(1)!important}
          .reveal-item{opacity:1!important;transform:none!important}
        `}</style>
      </noscript>

      <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
        Journey
      </p>

      {/* Timeline body — the scrub trigger */}
      <div ref={rootRef} className="relative mt-[clamp(3rem,8vh,6rem)] w-full">
        {/* Static track (desktop only — mobile stacks without a line) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 lg:block"
        />
        {/* Progress line — grows from the top as you scroll */}
        <div
          data-line
          aria-hidden="true"
          className="timeline-progress absolute inset-y-0 left-1/2 hidden w-px origin-top -translate-x-1/2 bg-white/70 lg:block"
        />

        <ol className="relative">
          {ENTRIES.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li
                key={entry.year}
                className="relative flex min-h-[62vh] items-center lg:min-h-[68vh]"
              >
                {/* One card per entry; the column start alternates the side.
                    On mobile the grid collapses and the card spans full width. */}
                <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20 xl:gap-28">
                  <div className={isLeft ? "lg:col-start-1" : "lg:col-start-2"}>
                    <StoryCard entry={entry} />
                  </div>
                </div>

                {/* Marker — sits on the line at the row's centre */}
                <span
                  data-marker
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black lg:block"
                />
              </li>
            );
          })}
        </ol>
      </div>

      {/* Outro — hands off to the Projects section below */}
      <div
        ref={outroRef}
        className="mt-[clamp(3rem,8vh,5rem)] max-w-3xl"
      >
        <p
          data-reveal
          className="reveal-item font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45"
        >
          Next
        </p>
        <h2
          data-reveal
          className="reveal-item mt-6 text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.025em] text-white/95"
        >
          Building unforgettable digital experiences.
        </h2>
        <p
          data-reveal
          className="reveal-item mt-6 text-[clamp(0.95rem,1.35vw,1.075rem)] leading-relaxed text-white/60"
        >
          Always learning.
          <br />
          Always creating.
          <br />
          Always pushing the web forward.
        </p>
      </div>
    </section>
  );
}

/**
 * One story beat. Large-format to match the Projects rows below. Rises from
 * below on scroll — never enters from the side.
 */
function StoryCard({ entry }: { entry: Entry }) {
  return (
    <article
      data-card
      className="timeline-card w-full rounded-2xl border border-white/10 bg-white/[0.02] p-[clamp(1.75rem,3vw,3rem)]"
    >
      <span className="block text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.03em] text-white/95">
        {entry.year}
      </span>
      <h3 className="mt-6 text-[clamp(1.15rem,1.7vw,1.6rem)] font-medium leading-snug tracking-[-0.015em] text-white/90">
        {entry.title}
      </h3>
      <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/45">
        {entry.subtitle}
      </p>
      <p className="mt-6 text-pretty text-[clamp(0.9rem,1.15vw,1rem)] leading-relaxed text-white/60">
        {entry.body}
      </p>
    </article>
  );
}
