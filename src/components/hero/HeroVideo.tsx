"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic looping Indian-flag video background.
 *
 * Kept deliberately subtle: heavy desaturation / low brightness / soft blur
 * (see `.hero-video` in globals.css) plus a dark scrim in the parent, so it
 * reads as atmosphere and never competes with the character.
 *
 * • `[data-anim="video"]` → intro fade-in target (opacity).
 * • `[data-parallax="flag"]` → subtle cursor parallax (scaled up so the drift
 *   never exposes an edge).
 * • Lazy: `preload="metadata"` + a still poster paints instantly while the
 *   video streams in. Playback is paused for reduced-motion users.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // Hold on the poster frame — no looping motion.
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    // Kick off playback (autoPlay can be blocked until JS nudges it).
    void video.play().catch(() => {
      /* Autoplay may be rejected; the poster remains as a graceful fallback. */
    });
  }, []);

  return (
    <div data-anim="video" className="absolute inset-0 z-0">
      <div data-parallax="flag" className="absolute inset-0 scale-110">
        <video
          ref={videoRef}
          className="hero-video h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/india-flag.jpg"
          aria-hidden="true"
        >
          <source src="/videos/india-flag.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
