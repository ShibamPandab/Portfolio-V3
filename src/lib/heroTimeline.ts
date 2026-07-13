import { gsap } from "gsap";

/**
 * Elements the intro timeline drives. All are optional so the factory
 * degrades gracefully if a layer is not mounted yet.
 *
 * The flag is split into two layers so it can be both *identifiable early*
 * and still perform the signature bottom-to-top reveal later:
 *   • flagBase   — a faint, always-unclipped wash that fades in first
 *   • flagReveal — a brighter layer clipped bottom-to-top at 1.4s
 */
export interface HeroTimelineTargets {
  character: Element | null;
  glow: Element | null;
  flagBase: Element | null;
  flagReveal: Element | null;
  editorial: Element | null;
  particles: Element | null;
  lines: Element[];
  cta: Element | null;
}

/** Resting opacity of the decorative editorial name (kept faint: 8–10%). */
export const EDITORIAL_OPACITY = 0.09;

/** Flag layer opacities — base wash + brighter reveal stack to ~0.33. */
export const FLAG_BASE_OPACITY = 0.19;
export const FLAG_REVEAL_OPACITY = 0.15;

/**
 * Single source of truth for the intro choreography. Timings are absolute
 * positions on the timeline so the sequence reads top-to-bottom exactly like
 * the brief:
 *   0.3s  faint flag fades in
 *   0.8s  character reveals from the bottom
 *   1.4s  flag performs its bottom-to-top reveal + opacity swell
 *   2.0s  editorial name fades in
 *   2.5s  heading · 2.8s subtitle · 3.1s CTA
 * Everything uses Power3/Power4 easing for a slow, expensive feel.
 */
export const HERO_MOTION = {
  flagBase: {
    at: 0.3,
    duration: 0.9,
    ease: "power2.out",
  },
  character: {
    at: 0.8,
    duration: 0.95,
    ease: "power4.out",
    fromY: 120,
    fromScale: 1.05,
    fromBlur: 12,
  },
  glow: {
    at: 0.85,
    duration: 1.4,
    ease: "power3.out",
  },
  flagReveal: {
    at: 1.4,
    duration: 1.2,
    ease: "power3.out",
  },
  editorial: {
    at: 2.0,
    duration: 1.6, // slow, cinematic fade
    ease: "power3.out",
    fromScale: 1.04,
  },
  particles: {
    at: 1.7,
    duration: 1.6,
    ease: "power2.out",
  },
  // Kicker (2.2) → heading (2.5) → subtitle (2.8) via a 0.3s stagger.
  lines: {
    at: 2.2,
    duration: 0.9,
    stagger: 0.3,
    ease: "power3.out",
    fromY: 24,
  },
  cta: {
    at: 3.1,
    duration: 0.8,
    ease: "power4.out",
    fromY: 20,
  },
} as const;

/** Push every layer to its hidden starting pose. */
export function setHeroInitialState({
  character,
  glow,
  flagBase,
  flagReveal,
  editorial,
  particles,
  lines,
  cta,
}: HeroTimelineTargets): void {
  if (flagBase) gsap.set(flagBase, { opacity: 0 });
  if (flagReveal) {
    gsap.set(flagReveal, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
  }
  if (character) {
    gsap.set(character, {
      y: HERO_MOTION.character.fromY,
      autoAlpha: 0,
      scale: HERO_MOTION.character.fromScale,
      filter: `blur(${HERO_MOTION.character.fromBlur}px)`,
    });
  }
  if (glow) gsap.set(glow, { opacity: 0 });
  if (editorial) {
    gsap.set(editorial, { opacity: 0, scale: HERO_MOTION.editorial.fromScale });
  }
  if (particles) gsap.set(particles, { opacity: 0 });
  if (lines.length) gsap.set(lines, { y: HERO_MOTION.lines.fromY, opacity: 0 });
  if (cta) gsap.set(cta, { y: HERO_MOTION.cta.fromY, opacity: 0 });
}

/** Snap every layer to its final, fully-revealed pose (no animation). */
export function setHeroFinalState({
  character,
  glow,
  flagBase,
  flagReveal,
  editorial,
  particles,
  lines,
  cta,
}: HeroTimelineTargets): void {
  if (flagBase) gsap.set(flagBase, { opacity: FLAG_BASE_OPACITY });
  if (flagReveal) {
    gsap.set(flagReveal, {
      opacity: FLAG_REVEAL_OPACITY,
      clipPath: "inset(0% 0 0 0)",
    });
  }
  if (character) {
    gsap.set(character, { y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)" });
  }
  if (glow) gsap.set(glow, { opacity: 1 });
  if (editorial) gsap.set(editorial, { opacity: EDITORIAL_OPACITY, scale: 1 });
  if (particles) gsap.set(particles, { opacity: 1 });
  if (lines.length) gsap.set(lines, { y: 0, opacity: 1 });
  if (cta) gsap.set(cta, { y: 0, opacity: 1 });
}

/**
 * Build the reusable hero intro timeline. Pure and side-effect free beyond
 * the tween it returns — call `.play()` / `.revert()` from the caller.
 */
export function createHeroTimeline(
  targets: HeroTimelineTargets,
): gsap.core.Timeline {
  const { character, glow, flagBase, flagReveal, editorial, particles, lines, cta } =
    targets;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  setHeroInitialState(targets);

  // 1 — Faint flag whispers in first, establishing the tricolour early.
  if (flagBase) {
    tl.to(
      flagBase,
      {
        opacity: FLAG_BASE_OPACITY,
        duration: HERO_MOTION.flagBase.duration,
        ease: HERO_MOTION.flagBase.ease,
      },
      HERO_MOTION.flagBase.at,
    );
  }

  // 2 — Character rises out of the black.
  if (character) {
    tl.to(
      character,
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: HERO_MOTION.character.duration,
        ease: HERO_MOTION.character.ease,
      },
      HERO_MOTION.character.at,
    );
  }

  // 2b — Soft glow blooms in behind the character for separation.
  if (glow) {
    tl.to(
      glow,
      {
        opacity: 1,
        duration: HERO_MOTION.glow.duration,
        ease: HERO_MOTION.glow.ease,
      },
      HERO_MOTION.glow.at,
    );
  }

  // 3 — Brighter flag layer performs the bottom-to-top clip reveal, lifting
  //     the overall flag opacity as it sweeps up.
  if (flagReveal) {
    tl.to(
      flagReveal,
      {
        opacity: FLAG_REVEAL_OPACITY,
        clipPath: "inset(0% 0 0 0)",
        duration: HERO_MOTION.flagReveal.duration,
        ease: HERO_MOTION.flagReveal.ease,
      },
      HERO_MOTION.flagReveal.at,
    );
  }

  // 4 — Oversized editorial name fades in slowly behind the character.
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

  // 4b — Ambient particles ease in with the background.
  if (particles) {
    tl.to(
      particles,
      {
        opacity: 1,
        duration: HERO_MOTION.particles.duration,
        ease: HERO_MOTION.particles.ease,
      },
      HERO_MOTION.particles.at,
    );
  }

  // 5 — Kicker → heading → subtitle fade upward with a gentle cascade.
  if (lines.length) {
    tl.to(
      lines,
      {
        y: 0,
        opacity: 1,
        duration: HERO_MOTION.lines.duration,
        stagger: HERO_MOTION.lines.stagger,
        ease: HERO_MOTION.lines.ease,
      },
      HERO_MOTION.lines.at,
    );
  }

  // 6 — CTA fades upward last.
  if (cta) {
    tl.to(
      cta,
      {
        y: 0,
        opacity: 1,
        duration: HERO_MOTION.cta.duration,
        ease: HERO_MOTION.cta.ease,
      },
      HERO_MOTION.cta.at,
    );
  }

  return tl;
}
