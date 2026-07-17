"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Reusable, dependency-free 3D tilt. Pointer position over the element maps to
 * a small rotateX/rotateY, applied directly to the node in a rAF callback (no
 * React re-renders). Easing/return live in CSS (`.lab-card` transition), so
 * there's no bounce or overshoot — motion stays "expensive but restrained".
 *
 * Disabled for reduced-motion users. Returns the ref plus pointer handlers to
 * spread onto the tilting element.
 */
export function useTilt(maxDeg = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onPointerMove = (event: ReactPointerEvent) => {
    const el = ref.current;
    if (!el || reduced()) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateY(${px * maxDeg}deg) rotateX(${-py * maxDeg}deg)`;
    });
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return { ref, onPointerMove, onPointerLeave };
}
