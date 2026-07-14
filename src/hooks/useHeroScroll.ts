"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// Register once at module scope (idempotent).
gsap.registerPlugin(ScrollTrigger);

/**
 * Share of the portrait's height cropped off the top to remove the source's
 * transparent headroom. Must stay in sync with the `-translate-y-[4%]` wrapper
 * in HeroCharacter, which holds that opening frame before GSAP runs (and for
 * reduced-motion / no-JS). The pan itself always starts from y = 0.
 */
const HEADROOM_CROP = 0.04;

/**
 * Scroll behaviour for the landing hero.
 *
 * 1. Camera pan — the character is rendered far taller than the stage, so the
 *    stage's overflow acts as a camera aperture. Scrolling pans the figure
 *    upward by exactly its overflow, so the camera travels down the body:
 *    head + upper chest → chest → folded arms → waist. A linear ease keeps the
 *    camera at a constant, cinematic speed.
 * 2. The oversized SHIBAM outline fades out over the same scroll (unchanged).
 *
 * The pan distance is resolved from the *rendered* height at refresh time
 * (`invalidateOnRefresh`), so it stays correct across viewport sizes and
 * orientation changes rather than assuming a fixed vh value.
 *
 * Skipped for reduced-motion users, who keep the static head + chest framing.
 * Scoped to a gsap.context for clean teardown.
 */
export function useHeroScroll(rootRef: RefObject<HTMLElement | null>): void {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const pan = root.querySelector<HTMLElement>('[data-pan="char"]');
    const editorial = root.querySelector<HTMLElement>('[data-anim="editorial"]');

    const ctx = gsap.context(() => {
      // Reduced motion: hold the opening frame, no camera move.
      if (prefersReduced) return;

      // 1 — Camera pans down the giant figure: from the opening frame (y = 0,
      //     the wrapper already holds the headroom crop) to the point where the
      //     figure's bottom rests on the viewport bottom. Resolved at refresh so
      //     it stays correct across viewport and orientation changes.
      if (pan) {
        const endY = () => {
          const visibleHeight = (1 - HEADROOM_CROP) * pan.offsetHeight;
          // Clamp at 0 so a portrait that doesn't overflow never pans backwards.
          return Math.min(0, window.innerHeight - visibleHeight);
        };

        gsap.fromTo(
          pan,
          { y: 0 },
          {
            y: endY,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 1, // 1s smoothing lag = cinematic, not snappy
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // 2 — SHIBAM outline slowly fades out as the hero is scrolled through.
      if (editorial) {
        gsap.to(editorial, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top+=5% top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
