/**
 * Soft vignette that frames the hero and focuses the eye toward the centre.
 * Purely decorative and non-interactive.
 */
export default function HeroVignette() {
  return (
    <div
      className="hero-vignette pointer-events-none absolute inset-0 z-[45]"
      aria-hidden="true"
    />
  );
}
