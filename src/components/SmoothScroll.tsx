"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    /** The active Lenis instance, for programmatic smooth scrolls. */
    __lenis?: Lenis;
  }
}

/**
 * Site-wide Lenis smooth scrolling, driven off GSAP's ticker.
 *
 * Every scroll-driven section uses ScrollTrigger, so Lenis MUST share GSAP's
 * clock rather than run its own rAF — otherwise scrubbed animations and the
 * smoothed scroll drift out of sync. We forward Lenis' scroll events to
 * `ScrollTrigger.update` and advance `lenis.raf` from the GSAP ticker, with
 * lag smoothing disabled so a heavy frame never desyncs the two.
 *
 * Renders nothing. Disabled for reduced-motion users (native scroll).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // expo-out — long, weighted glide with no bounce.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose the instance so components (e.g. "Back to top") can request a
    // smooth programmatic scroll — native smooth is disabled under Lenis.
    window.__lenis = lenis;

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP default
      delete window.__lenis;
    };
  }, []);

  return null;
}
