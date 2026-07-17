"use client";

import { useRef } from "react";
import { PHASES, type Phase } from "@/components/sections/process/process.data";
import { useSequentialReveal } from "@/hooks/useSequentialReveal";

/**
 * Process — the working method as an editorial, numbered sequence.
 *
 * Deliberately distinct from the other scroll sections: no centred line (that's
 * the Journey timeline) and no hover-invert (that's Projects). Instead,
 * oversized outlined index numbers anchor each phase, and every phase reveals
 * on its own as it enters — the number wiping up via clip-path while the copy
 * fades up (see useSequentialReveal). Generous whitespace, hairline dividers.
 */
export default function ProcessSection() {
  const rootRef = useRef<HTMLElement>(null);
  useSequentialReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="process"
      aria-label="Process"
      className="process-section relative w-full bg-background px-6 py-[clamp(6rem,16vh,11rem)] sm:px-10 lg:px-16 xl:px-24"
    >
      {/* No-JS fallback */}
      <noscript>
        <style>{`
          .process-section [data-step]{opacity:1!important;transform:none!important}
          .process-section [data-clip]{clip-path:inset(0 0 0 0)!important}
        `}</style>
      </noscript>

      {/* Header */}
      <div data-step className="max-w-3xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
          Process
        </p>
        <h2 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white/95">
          How the work
          <br />
          gets made.
        </h2>
      </div>

      {/* Phases */}
      <ol className="mt-[clamp(3.5rem,9vh,7rem)]">
        {PHASES.map((phase) => (
          <PhaseRow key={phase.no} phase={phase} />
        ))}
      </ol>
    </section>
  );
}

function PhaseRow({ phase }: { phase: Phase }) {
  return (
    <li
      data-step
      className="grid grid-cols-1 items-baseline gap-6 border-t border-white/10 py-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-12 lg:gap-12"
    >
      {/* Oversized outlined index */}
      <div className="lg:col-span-4">
        <span
          data-clip
          aria-hidden="true"
          className="process-index block text-[clamp(4rem,11vw,10rem)] font-semibold leading-none tracking-[-0.04em]"
        >
          {phase.no}
        </span>
      </div>

      {/* Copy */}
      <div className="lg:col-span-7 lg:col-start-6">
        <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium tracking-[-0.02em] text-white/95">
          {phase.title}
        </h3>
        <p className="mt-5 max-w-xl text-pretty text-[clamp(0.95rem,1.35vw,1.1rem)] leading-relaxed text-white/60">
          {phase.body}
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {phase.deliverables.map((item) => (
            <li
              key={item}
              className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/40"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
