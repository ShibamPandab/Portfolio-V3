"use client";

import { gsap } from "gsap";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import {
  createHeroTimeline,
  setHeroFinalState,
  type HeroTimelineTargets,
} from "@/lib/heroTimeline";

/**
 * Module-scoped guard. A JS module is evaluated once per document load and
 * kept alive across client-side (App Router) navigations, but is thrown away
 * on a hard refresh. That gives us exactly the requested behaviour:
 *   • plays on the very first load / after a browser refresh
 *   • does NOT replay when navigating around the site and coming back
 */
let hasIntroPlayed = false;

function collectTargets(root: HTMLElement): HeroTimelineTargets {
  return {
    character: root.querySelector('[data-anim="char"]'),
    glow: root.querySelector('[data-anim="glow"]'),
    flagBase: root.querySelector('[data-anim="flag-base"]'),
    flagReveal: root.querySelector('[data-anim="flag-reveal"]'),
    editorial: root.querySelector('[data-anim="editorial"]'),
    particles: root.querySelector('[data-anim="particles"]'),
    lines: Array.from(root.querySelectorAll('[data-anim="line"]')),
    cta: root.querySelector('[data-anim="cta"]'),
  };
}

/**
 * Drives the hero intro. Reads the once-per-load guard and respects
 * `prefers-reduced-motion`, snapping to the final frame in either case.
 */
export function useHeroIntro(rootRef: RefObject<HTMLElement | null>): void {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = collectTargets(root);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // gsap.context scopes every tween created inside so cleanup is a single
    // revert() — important for React strict-mode double invocation and for
    // reverting inline styles when the component unmounts.
    const ctx = gsap.context(() => {
      if (hasIntroPlayed || prefersReduced) {
        setHeroFinalState(targets);
        root.dataset.intro = "done";
        return;
      }

      const tl = createHeroTimeline(targets);
      root.dataset.intro = "playing";
      tl.eventCallback("onComplete", () => {
        root.dataset.intro = "done";
      });

      hasIntroPlayed = true;
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
