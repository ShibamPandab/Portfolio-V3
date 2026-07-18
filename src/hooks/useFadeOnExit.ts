"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// Register once at module scope (idempotent).
gsap.registerPlugin(ScrollTrigger);

/**
 * Softly fades an element out (and gently lifts it) as it scrolls up out of
 * view — used so a closing block dissolves into the next section instead of
 * cutting away. Scrubbed to scroll; the fade-IN is handled separately by the
 * reveal system. No-op for reduced motion. Scoped to a gsap.context.
 */
export function useFadeOnExit(ref: RefObject<HTMLElement | null>): void {
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "center 35%",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [ref]);
}
