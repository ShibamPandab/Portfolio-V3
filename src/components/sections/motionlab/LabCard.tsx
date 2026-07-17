"use client";

import type { Experiment } from "@/components/sections/motionlab/motionlab.data";
import { useTilt } from "@/hooks/useTilt";

/**
 * One motion experiment card.
 *
 * Outer `[data-reveal]` wrapper handles the scroll fade-up (shared reveal
 * system); the inner `.lab-card` is the 3D-tilting face. `preserve-3d` lets the
 * inner layers sit at different `translateZ` depths, so they part slightly as
 * the card tilts for a tactile, premium feel.
 */
export default function LabCard({ experiment }: { experiment: Experiment }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt(9);

  return (
    <div
      data-reveal
      className="reveal-item shrink-0 snap-start [perspective:1000px]"
    >
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="lab-card relative flex h-[clamp(20rem,52vh,30rem)] w-[clamp(15rem,74vw,24rem)] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-7"
        style={{ backgroundImage: experiment.accent }}
      >
        {/* Soft dark scrim so text stays legible over the gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"
        />

        {/* Top row — index + tag (lifted toward the viewer) */}
        <div className="relative flex items-start justify-between [transform:translateZ(45px)]">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/60">
            {experiment.tag}
          </span>
          <span className="font-mono text-[0.68rem] tracking-[0.2em] text-white/50">
            {experiment.no}
          </span>
        </div>

        {/* Bottom — title + blurb */}
        <div className="relative [transform:translateZ(30px)]">
          <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-none tracking-[-0.02em] text-white">
            {experiment.title}
          </h3>
          <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-white/70">
            {experiment.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}
