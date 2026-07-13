/**
 * Soft radial glow that blooms in behind the character to separate it from
 * the atmospheric background. Sits above the editorial name but behind the
 * character. `[data-anim="glow"]` fades in alongside the character reveal.
 */
export default function HeroGlow() {
  return (
    <div
      data-anim="glow"
      className="hero-glow pointer-events-none absolute inset-0 z-[22]"
      aria-hidden="true"
    />
  );
}
