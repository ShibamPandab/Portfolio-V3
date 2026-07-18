"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// Register once at module scope (idempotent).
gsap.registerPlugin(ScrollTrigger);

/**
 * Grey → white word reveal, scrubbed to scroll. Each `[data-word]` inside the
 * root brightens from muted grey to white; the stagger is spread across the
 * scrub window, so words illuminate one after another as the heading scrolls
 * through view. Reduced-motion users get the finished (white) state.
 *
 * Words must be pre-split in the markup so the text stays natively selectable
 * and accessible. Scoped to a gsap.context.
 */
export function useWordReveal(rootRef: RefObject<HTMLElement | null>): void {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const words = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-word]"),
    );
    if (!words.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(words, { color: "#ffffff" });
        return;
      }

      gsap.set(words, { color: "rgba(255,255,255,0.22)" });
      gsap.to(words, {
        color: "#ffffff",
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "top 32%",
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
