"use client";

import { useRef } from "react";
import { useWordReveal } from "@/hooks/useWordReveal";

const LINES = [
  "I don't just build websites.",
  "I build digital experiences people remember.",
];

/**
 * Block 01 — the big statement. Full viewport; the heading dominates and
 * illuminates word-by-word (grey → white) as it scrolls into view. Words are
 * pre-split so the text stays selectable and accessible.
 */
export default function AboutStatement() {
  const ref = useRef<HTMLDivElement>(null);
  useWordReveal(ref);

  return (
    <div
      ref={ref}
      className="flex min-h-[100svh] flex-col justify-center px-6 py-24 sm:px-10 lg:px-16 xl:px-24"
    >
      <noscript>
        <style>{`.about-word{color:#fff!important}`}</style>
      </noscript>

      <p className="mb-[clamp(1.5rem,4vh,2.5rem)] font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
        About
      </p>

      <h2 className="max-w-[16ch] text-[clamp(2rem,6.4vw,5.5rem)] font-medium leading-[1.06] tracking-[-0.03em]">
        {LINES.map((line, i) => (
          <span key={i} className="block">
            {line.split(" ").map((word, j) => (
              <span key={j} data-word className="about-word">
                {word}{" "}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </div>
  );
}
