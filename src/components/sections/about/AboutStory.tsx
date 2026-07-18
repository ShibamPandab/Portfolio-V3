"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useScrollParallax } from "@/hooks/useScrollParallax";

/**
 * Block 02 — portrait + story. Two-column editorial (portrait 55% / copy 45%,
 * stacking on mobile). Portrait uses the same B&W cut-out + radial glow
 * treatment as the hero, with a very subtle scroll parallax. Image and copy
 * reveal independently on a staggered fade-up.
 */
export default function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref);
  useScrollParallax(ref, 6);

  return (
    <div
      ref={ref}
      className="px-6 py-[clamp(5rem,14vh,9rem)] sm:px-10 lg:px-16 xl:px-24"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20 xl:gap-28">
        {/* Portrait */}
        <div data-reveal className="reveal-item w-full lg:w-[55%]">
          <div className="relative h-[clamp(26rem,64vh,42rem)] w-full overflow-hidden">
            <div
              className="portrait-glow pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <div data-scroll-parallax className="absolute inset-0">
              <Image
                src="/images/character-bw.png"
                alt="Portrait of Shibam Pandab"
                fill
                sizes="(max-width: 1024px) 90vw, 55vw"
                className="select-none object-contain object-bottom"
              />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="w-full lg:w-[45%]">
          <h3
            data-reveal
            className="reveal-item text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium tracking-[-0.02em] text-white/95"
          >
            Who I Am
          </h3>

          <div className="mt-8 space-y-6 text-[clamp(0.95rem,1.35vw,1.1rem)] leading-relaxed text-white/60">
            <p data-reveal className="reveal-item text-pretty">
              I&apos;m Shibam, an AI-assisted frontend engineer passionate about
              crafting premium digital experiences.
            </p>
            <p data-reveal className="reveal-item text-pretty">
              I combine frontend engineering, motion design and thoughtful
              interaction to create websites that feel cinematic, immersive and
              memorable.
            </p>
            <p data-reveal className="reveal-item text-pretty">
              Every project is an opportunity to refine details, experiment with
              motion and push my creative standards further.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
