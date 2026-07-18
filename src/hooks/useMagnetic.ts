"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Reusable magnetic pull: the element drifts toward the pointer while hovered,
 * then eases back on leave. Transform is written straight to the node in a rAF
 * callback (no re-renders); the eased return lives in CSS (a `transition` on
 * the element), so there's no bounce.
 *
 * Disabled for reduced-motion users. Generic over the element type.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onPointerMove = (event: ReactPointerEvent) => {
    const el = ref.current;
    if (!el || reduced()) return;
    const rect = el.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "translate(0px, 0px)";
  };

  return { ref, onPointerMove, onPointerLeave };
}
