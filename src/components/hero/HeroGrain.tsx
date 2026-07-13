/**
 * Fine film-grain overlay for a cinematic finish. The texture is an inline
 * SVG turbulence pattern (see `.hero-grain` in globals.css) so it ships no
 * extra image assets. Sits on top of everything at a very low opacity.
 */
export default function HeroGrain() {
  return (
    <div
      className="hero-grain pointer-events-none absolute inset-0 z-50"
      aria-hidden="true"
    />
  );
}
