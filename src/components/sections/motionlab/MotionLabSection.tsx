"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import LabCard from "@/components/sections/motionlab/LabCard";
import { EXPERIMENTS } from "@/components/sections/motionlab/motionlab.data";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

/**
 * Motion Lab — a horizontal, drag-scrollable gallery of motion experiments.
 *
 * Deliberately un-pinned: the page keeps flowing (per the storytelling
 * preference); the horizontal track is its own scroll context, driven by drag,
 * trackpad or the progress affordance. Each card tilts in 3D on pointer move
 * (see LabCard), so the section itself demonstrates Horizontal Scroll +
 * Mouse Follow + 3D Motion — three of the techniques it lists.
 *
 * Cards fade up on enter via the shared reveal system; a bottom bar tracks
 * horizontal progress.
 */
export default function MotionLabSection() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);

  // Pointer drag-to-scroll (mouse). Trackpad/touch scroll natively.
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  const onPointerDown = (event: ReactPointerEvent) => {
    const track = trackRef.current;
    if (!track || event.pointerType === "touch") return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startLeft: track.scrollLeft,
    };
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    track.scrollLeft = drag.current.startLeft - (event.clientX - drag.current.startX);
  };

  const endDrag = (event: ReactPointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current.active = false;
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  // Progress bar follows horizontal scroll (ref-only, no re-render).
  const onScroll = () => {
    const track = trackRef.current;
    const bar = barRef.current;
    if (!track || !bar) return;
    const max = track.scrollWidth - track.clientWidth;
    bar.style.transform = `scaleX(${max > 0 ? track.scrollLeft / max : 0})`;
  };

  return (
    <section
      ref={rootRef}
      id="motion-lab"
      aria-label="Motion lab"
      className="relative w-full overflow-hidden bg-background py-[clamp(6rem,16vh,11rem)]"
    >
      {/* No-JS fallback */}
      <noscript>
        <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* Header */}
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal className="reveal-item max-w-2xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
              Motion Lab
            </p>
            <h2 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white/95">
              Experiments in motion.
            </h2>
          </div>
          <p
            data-reveal
            className="reveal-item font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/40"
          >
            Drag to explore →
          </p>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="lab-track mt-[clamp(2.5rem,6vh,4.5rem)] flex cursor-grab gap-6 overflow-x-auto px-6 pb-2 active:cursor-grabbing sm:px-10 lg:gap-8 lg:px-16 xl:px-24"
      >
        {EXPERIMENTS.map((experiment) => (
          <LabCard key={experiment.no} experiment={experiment} />
        ))}
        {/* Trailing gutter so the last card can clear the edge */}
        <div aria-hidden="true" className="shrink-0 basis-2 lg:basis-8" />
      </div>

      {/* Progress bar */}
      <div className="mx-6 mt-8 h-px bg-white/10 sm:mx-10 lg:mx-16 xl:mx-24">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 bg-white/60"
        />
      </div>
    </section>
  );
}
