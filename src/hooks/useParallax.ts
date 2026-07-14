"use client";

import { gsap } from "gsap";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/** Per-layer parallax travel, in pixels, at the screen edge. */
const PARALLAX_DEPTH = {
  // Background flag drifts gently with the cursor.
  flag: { x: 14, y: 9 },
  // Editorial name sits mid-depth, moving opposite the flag.
  type: { x: -13, y: -8 },
} as const;

/**
 * Very subtle cursor parallax on the background layers only — the character is
 * intentionally excluded so it never moves. Targets inner `[data-parallax]`
 * layers so it never fights the intro timeline (which drives the outer
 * `[data-anim]` wrappers). Disabled for touch devices and reduced-motion users.
 */
export function useParallax(rootRef: RefObject<HTMLElement | null>): void {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarse) return;

    const flag = root.querySelector<HTMLElement>('[data-parallax="flag"]');
    const type = root.querySelector<HTMLElement>('[data-parallax="type"]');
    if (!flag && !type) return;

    const ctx = gsap.context(() => {
      // quickTo gives us a cheap, smoothed setter per axis. Use `undefined`
      // (not `false`) for absent layers so optional chaining short-circuits.
      const tween = {
        flagX: flag
          ? gsap.quickTo(flag, "x", { duration: 0.8, ease: "power3.out" })
          : undefined,
        flagY: flag
          ? gsap.quickTo(flag, "y", { duration: 0.8, ease: "power3.out" })
          : undefined,
        typeX: type
          ? gsap.quickTo(type, "x", { duration: 0.85, ease: "power3.out" })
          : undefined,
        typeY: type
          ? gsap.quickTo(type, "y", { duration: 0.85, ease: "power3.out" })
          : undefined,
      };

      const handleMove = (event: MouseEvent) => {
        // Normalised cursor position in the range [-0.5, 0.5].
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;

        tween.flagX?.(nx * PARALLAX_DEPTH.flag.x);
        tween.flagY?.(ny * PARALLAX_DEPTH.flag.y);
        tween.typeX?.(nx * PARALLAX_DEPTH.type.x);
        tween.typeY?.(ny * PARALLAX_DEPTH.type.y);
      };

      const handleLeave = () => {
        tween.flagX?.(0);
        tween.flagY?.(0);
        tween.typeX?.(0);
        tween.typeY?.(0);
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseleave", handleLeave);

      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseleave", handleLeave);
      };
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
