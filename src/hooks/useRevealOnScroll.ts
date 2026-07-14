"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// Register once at module scope (idempotent).
gsap.registerPlugin(ScrollTrigger);

/** Reveal choreography (ease-out cubic ≈ power2.out). Shared by all sections. */
const REVEAL_DURATION = 0.7;
const REVEAL_STAGGER = 0.13; // 130ms between elements
const REVEAL_EASE = "power2.out";
const REVEAL_RISE = 30; // px travelled upward — vertical only, never horizontal

/**
 * Reusable staggered scroll reveal: `[data-reveal]` descendants rise from 30px
 * below and fade in as the section scrolls into view.
 *
 * Every section shares this one system, so easing, duration, distance and
 * stagger are identical site-wide by construction. Elements are expected to
 * carry the `.reveal-item` class, which hides them pre-JS so there is no flash
 * before GSAP takes over. Reduced-motion users get the content immediately with
 * no animation. Scoped to a gsap.context so every tween and ScrollTrigger is
 * cleaned up on unmount.
 */
export function useRevealOnScroll(
  rootRef: RefObject<HTMLElement | null>,
): void {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-reveal]"),
    );
    if (!items.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: REVEAL_RISE });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: REVEAL_DURATION,
        stagger: REVEAL_STAGGER,
        ease: REVEAL_EASE,
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
