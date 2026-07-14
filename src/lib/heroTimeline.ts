import { gsap } from "gsap";

/**
 * Elements the load-intro timeline drives: the background video and the
 * oversized SHIBAM outline.
 *
 * The character is intentionally NOT animated — it is painted at its final
 * size on first render and never moves or scales. The left-side copy lives in
 * the editorial section below and reveals on scroll.
 */
export interface HeroTimelineTargets {
  video: Element | null;
  editorial: Element | null;
}

/**
 * Resting opacity of the SHIBAM outline element. The faint "12–15%" look comes
 * from the transparent-fill + low-alpha text-stroke (`.hero-editorial-outline`),
 * so the element itself rests at full opacity once revealed.
 */
export const EDITORIAL_OPACITY = 1;

/**
 * Flag video opacity: it swells to full on entry so the tricolour reads for a
 * beat, then settles to a subtler (still visible) resting level so the
 * character and typography stay the primary focus.
 */
export const VIDEO_PEAK_OPACITY = 1;
export const VIDEO_REST_OPACITY = 0.82;

/**
 * Single source of truth for the load choreography:
 *   0.0s  background video swells in, then settles
 *   0.6s  oversized SHIBAM outline fades in behind the character
 * The character is visible immediately; left-side copy is not part of the intro.
 */
export const HERO_MOTION = {
  video: { at: 0, duration: 1.0, ease: "power2.out" },
  // Ease the flag back down to its resting opacity after the swell.
  videoSettle: { at: 1.2, duration: 1.4, ease: "power2.inOut" },
  editorial: { at: 0.6, duration: 1.3, ease: "power3.out", fromScale: 1.04 },
} as const;

/** Push the intro layers to their hidden starting pose. */
export function setHeroInitialState({
  video,
  editorial,
}: HeroTimelineTargets): void {
  if (video) gsap.set(video, { opacity: 0 });
  if (editorial) {
    gsap.set(editorial, { opacity: 0, scale: HERO_MOTION.editorial.fromScale });
  }
}

/** Snap the intro layers to their final, revealed pose (no animation). */
export function setHeroFinalState({
  video,
  editorial,
}: HeroTimelineTargets): void {
  if (video) gsap.set(video, { opacity: VIDEO_REST_OPACITY });
  if (editorial) gsap.set(editorial, { opacity: EDITORIAL_OPACITY, scale: 1 });
}

/**
 * Build the reusable load-intro timeline. Pure and side-effect free beyond
 * the tween it returns — the caller owns play / revert.
 */
export function createHeroTimeline(
  targets: HeroTimelineTargets,
): gsap.core.Timeline {
  const { video, editorial } = targets;
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  setHeroInitialState(targets);

  // 1 — Background video swells to full on entry, then eases back to a
  //     subtler resting opacity so the flag supports rather than dominates.
  if (video) {
    tl.to(
      video,
      {
        opacity: VIDEO_PEAK_OPACITY,
        duration: HERO_MOTION.video.duration,
        ease: HERO_MOTION.video.ease,
      },
      HERO_MOTION.video.at,
    );
    tl.to(
      video,
      {
        opacity: VIDEO_REST_OPACITY,
        duration: HERO_MOTION.videoSettle.duration,
        ease: HERO_MOTION.videoSettle.ease,
      },
      HERO_MOTION.videoSettle.at,
    );
  }

  // 2 — Oversized editorial outline fades in behind the character.
  if (editorial) {
    tl.to(
      editorial,
      {
        opacity: EDITORIAL_OPACITY,
        scale: 1,
        duration: HERO_MOTION.editorial.duration,
        ease: HERO_MOTION.editorial.ease,
      },
      HERO_MOTION.editorial.at,
    );
  }

  return tl;
}
