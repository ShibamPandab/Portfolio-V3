"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// Register once at module scope (idempotent).
gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable per-item sequential reveal driven by ScrollTrigger.batch — each
 * `[data-step]` element reveals as it enters the viewport (not all at once on a
 * single trigger, which is what a tall, whitespace-heavy section needs).
 *
 * Each step fades up (translateY + opacity). If a step contains a
 * `[data-clip]` child, that child additionally does a bottom-to-top clip-path
 * reveal on the same curve — used here for the oversized ghost index numbers.
 *
 * Reveal is one-way (no re-hide on scroll-back) for a calm, premium feel.
 * Reduced-motion users get the finished state. Scoped to a gsap.context.
 */
export function useSequentialReveal(
  rootRef: RefObject<HTMLElement | null>,
): void {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const steps = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-step]"),
    );
    if (!steps.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const clips = (el: HTMLElement) =>
      el.querySelectorAll<HTMLElement>("[data-clip]");

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(steps, { opacity: 1, y: 0 });
        steps.forEach((s) =>
          gsap.set(clips(s), { clipPath: "inset(0% 0 0 0)" }),
        );
        return;
      }

      // Hidden starting pose.
      gsap.set(steps, { opacity: 0, y: 40 });
      steps.forEach((s) =>
        gsap.set(clips(s), { clipPath: "inset(100% 0 0 0)" }),
      );

      ScrollTrigger.batch(steps, {
        start: "top 82%",
        onEnter: (batch) =>
          batch.forEach((el, i) => {
            const tl = gsap.timeline({ delay: i * 0.1 });
            tl.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            });
            const clip = (el as HTMLElement).querySelectorAll("[data-clip]");
            if (clip.length) {
              tl.to(
                clip,
                {
                  clipPath: "inset(0% 0 0 0)",
                  duration: 1.1,
                  ease: "power3.out",
                },
                0,
              );
            }
          }),
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
