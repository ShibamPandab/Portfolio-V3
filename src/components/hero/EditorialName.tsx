/**
 * Oversized editorial branding fixed behind the character. Purely decorative:
 * faint (5–8% opacity), heavy (900), tight tracking, slightly blurred so it
 * sits back in depth and the character partially overlaps it for a premium
 * magazine feel. Non-interactive and hidden from assistive tech.
 *
 * `[data-anim="editorial"]` → slow fade-in; `[data-parallax="type"]` → mid
 * depth parallax.
 */
export default function EditorialName() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15] flex items-center justify-center"
      aria-hidden="true"
    >
      <div data-parallax="type" className="w-full">
        <p
          data-anim="editorial"
          className="hero-editorial-outline select-none text-center font-black leading-[0.85] tracking-[-0.05em] text-[clamp(5rem,27vw,26rem)]"
        >
          SHIBAM
        </p>
      </div>
    </div>
  );
}
