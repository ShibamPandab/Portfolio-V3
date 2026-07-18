"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// Register once at module scope (idempotent).
gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle scroll parallax: each `[data-scroll-parallax]` element drifts
 * vertically (in yPercent, so it scales with the element) as it travels through
 * the viewport, scrubbed to scroll. Kept intentionally small — atmosphere, not
 * spectacle. Disabled for reduced motion. Scoped to a gsap.context.
 */
export function useScrollParallax(
  rootRef: RefObject<HTMLElement | null>,
  strength = 7,
): void {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-scroll-parallax]"),
    );
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: strength },
          {
            yPercent: -strength,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef, strength]);
}
