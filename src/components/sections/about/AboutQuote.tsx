"use client";

import { useRef } from "react";
import { useFadeOnExit } from "@/hooks/useFadeOnExit";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const LINES = [
  "Still learning.",
  "Still building.",
  "Still obsessed with creating great interfaces.",
];

/**
 * Block 03 — the end quote. Full viewport, centred. Lines fade up on enter;
 * the whole quote then softly dissolves (fade + lift) as it scrolls away, so it
 * melts into the Contact section rather than cutting.
 */
export default function AboutQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref);
  useFadeOnExit(innerRef);

  return (
    <div
      ref={ref}
      className="flex min-h-[100svh] items-center justify-center px-6 py-24 text-center"
    >
      <div ref={innerRef} className="max-w-4xl">
        <blockquote className="text-[clamp(1.75rem,5vw,4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-white/95">
          {LINES.map((line) => (
            <span key={line} data-reveal className="reveal-item block">
              {line}
            </span>
          ))}
        </blockquote>
        <p
          data-reveal
          className="reveal-item mt-10 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-white/45"
        >
          — Shibam
        </p>
      </div>
    </div>
  );
}
