"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

// Register once at module scope (idempotent).
gsap.registerPlugin(ScrollTrigger);

/**
 * Cards are never hidden — they are always at least partially visible so the
 * story overlaps instead of revealing one isolated card at a time:
 *   upcoming → dim (the next entry already peeks in while the current is active)
 *   active   → full
 *   past     → slightly reduced, but clearly still there
 */
const UPCOMING_CARD_OPACITY = 0.3;
const PAST_CARD_OPACITY = 0.5;
/** Distance (px) each card rises as it becomes the focus. */
const CARD_RISE = 60;

/**
 * Scrubbed storytelling timeline — deliberately NOT pinned, so the page keeps
 * scrolling naturally and the timeline animates as it passes through.
 *
 * Sync is derived rather than hand-tuned: rows are equal height and markers sit
 * at each row's centre, so marker `i` is at fraction `(i + 0.5) / n` of the
 * line. Normalising the line tween to duration 1 and placing marker `i` at that
 * same fraction makes the line arrive exactly as each dot lights up — for any
 * number of entries.
 *
 * Cards rise from below (translateY + opacity only) and earlier cards dim to
 * PAST_CARD_OPACITY instead of vanishing.
 *
 * Reduced-motion users get the finished state. Scoped to a gsap.context.
 */
export function useStoryTimeline(rootRef: RefObject<HTMLElement | null>): void {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const line = root.querySelector<HTMLElement>("[data-line]");
    const markers = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-marker]"),
    );
    const cards = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-card]"),
    );
    if (!cards.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const activeMarker = {
      scale: 1.4,
      backgroundColor: "#ffffff",
      borderColor: "#ffffff",
    };

    const ctx = gsap.context(() => {
      // Reduced motion: present the finished timeline, no scroll animation.
      if (prefersReduced) {
        if (line) gsap.set(line, { scaleY: 1 });
        if (markers.length) gsap.set(markers, activeMarker);
        gsap.set(cards, { y: 0, opacity: 1 });
        return;
      }

      const count = cards.length;

      // Base pose: every card sits dim-but-visible and slightly low, so an
      // entry is already on screen before it becomes the focus.
      gsap.set(cards, { opacity: UPCOMING_CARD_OPACITY, y: CARD_RISE });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          // Draws as the block travels through the viewport — no pinning.
          // The start is deliberately late (45% rather than the top of the
          // viewport): it shifts both activation moments into the window where
          // BOTH entries are on screen, so the next card is already peeking in
          // while the current one is the focus.
          start: "top 45%",
          end: "bottom 55%",
          scrub: 1, // 1s smoothing lag = cinematic, not snappy
          invalidateOnRefresh: true,
        },
      });

      // Line grows across the whole sequence (normalised to duration 1).
      if (line) {
        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);
      }

      cards.forEach((card, i) => {
        // Where the line reaches this row's centre.
        const at = (i + 0.5) / count;

        // Dot lights up exactly as the line arrives.
        if (markers[i]) {
          tl.to(
            markers[i],
            { ...activeMarker, duration: 0.1, ease: "power2.out" },
            at,
          );
        }

        // Card fades up from its dim base into focus.
        tl.fromTo(
          card,
          { y: CARD_RISE, opacity: UPCOMING_CARD_OPACITY },
          { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" },
          at,
        );

        // The previous card stays on screen, just recedes.
        if (i > 0) {
          tl.to(
            cards[i - 1],
            { opacity: PAST_CARD_OPACITY, duration: 0.2, ease: "power2.out" },
            at,
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
