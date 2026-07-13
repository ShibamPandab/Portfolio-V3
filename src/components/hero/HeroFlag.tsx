import Image from "next/image";

/**
 * Atmospheric flag background, built from two stacked layers so the flag can
 * be recognisable early *and* keep its signature reveal:
 *
 *   • `[data-anim="flag-base"]`   — faint wash, always unclipped, fades in at
 *     0.3s so the tricolour is identifiable within the first second.
 *   • `[data-anim="flag-reveal"]` — a brighter layer clipped bottom-to-top at
 *     1.4s; stacking on the base lifts the overall opacity as it sweeps up.
 *
 * Both share the desaturated / slightly brightened / softly blurred texture
 * treatment (`.hero-flag-texture`) so the flag reads as atmosphere, never
 * competing with the character. The shared `[data-parallax="flag"]` wrapper
 * drifts with the cursor and is scaled up so the drift never exposes an edge.
 */
export default function HeroFlag() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div data-parallax="flag" className="absolute inset-0 scale-110">
        <div data-anim="flag-base" className="absolute inset-0">
          <Image
            src="/images/india-flag.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-flag-texture object-cover"
          />
        </div>
        <div data-anim="flag-reveal" className="absolute inset-0">
          <Image
            src="/images/india-flag.jpg"
            alt=""
            fill
            sizes="100vw"
            className="hero-flag-texture object-cover"
          />
        </div>
      </div>
    </div>
  );
}
