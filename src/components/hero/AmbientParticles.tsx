const PARTICLE_COUNT = 16;

/**
 * Tiny ambient dust drifting through the atmosphere. Sits behind the
 * character (so it never distracts from the focal point) and eases in with
 * the background via `[data-anim="particles"]`.
 *
 * Each particle's position, size, drift and timing are assigned in
 * globals.css via `:nth-child`, keeping the markup free of inline styles and
 * deterministic (no SSR/CSR hydration mismatch).
 */
export default function AmbientParticles() {
  return (
    <div
      data-anim="particles"
      className="pointer-events-none absolute inset-0 z-[24] overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
        <span key={index} className="hero-particle" />
      ))}
    </div>
  );
}
