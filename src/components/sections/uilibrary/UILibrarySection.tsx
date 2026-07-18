"use client";

import { useRef, type ReactNode } from "react";
import CopyChip from "@/components/ui/CopyChip";
import MagneticButton from "@/components/ui/MagneticButton";
import SegmentedControl from "@/components/ui/SegmentedControl";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

/**
 * UI Library — live specimens of reusable interface components (from
 * components/ui). Each sits in a bordered cell with a mono label and reveals on
 * scroll via the shared system. Distinct from Motion Lab (motion experiments):
 * this is engineered, interactive UI.
 */
export default function UILibrarySection() {
  const rootRef = useRef<HTMLElement>(null);
  useRevealOnScroll(rootRef);

  return (
    <section
      ref={rootRef}
      id="ui-library"
      aria-label="UI library"
      className="relative w-full bg-background px-6 py-[clamp(6rem,16vh,11rem)] sm:px-10 lg:px-16 xl:px-24"
    >
      <noscript>
        <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* Header */}
      <div data-reveal className="reveal-item max-w-2xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
          UI Library
        </p>
        <h2 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white/95">
          Interface, engineered.
        </h2>
      </div>

      {/* Specimen grid */}
      <div className="mt-[clamp(3rem,8vh,6rem)] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Specimen no="01" name="Magnetic Button">
          <MagneticButton>Let&apos;s talk</MagneticButton>
        </Specimen>

        <Specimen no="02" name="Toggle Switch">
          <ToggleSwitch defaultOn label="Reduce motion" />
        </Specimen>

        <Specimen no="03" name="Segmented Control">
          <SegmentedControl options={["Design", "Motion", "Code"]} />
        </Specimen>

        <Specimen no="04" name="Copy Chip">
          <CopyChip value="npx shibam-ui add" />
        </Specimen>

        <Specimen no="05" name="Tags">
          <div className="flex flex-wrap justify-center gap-2.5">
            {["React", "GSAP", "Three.js", "Motion"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/12 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/55 transition-colors duration-300 hover:border-white/30 hover:text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        </Specimen>

        <Specimen no="06" name="Status">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] py-2 pl-3 pr-4 text-xs tracking-tight text-white/80">
            <span className="ui-status-dot h-2 w-2 rounded-full bg-white" />
            Available for work
          </span>
        </Specimen>
      </div>
    </section>
  );
}

/** Consistent specimen cell: centred live component + labelled footer. */
function Specimen({
  no,
  name,
  children,
}: {
  no: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <div
      data-reveal
      className="reveal-item flex min-h-[13.5rem] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.015] p-6"
    >
      <div className="flex flex-1 items-center justify-center py-6">
        {children}
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/45">
          {name}
        </span>
        <span className="font-mono text-[0.62rem] tracking-[0.2em] text-white/25">
          {no}
        </span>
      </div>
    </div>
  );
}
