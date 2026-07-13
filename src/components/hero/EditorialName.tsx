/**
 * Oversized editorial branding that sits *behind* the character. Purely
 * decorative — faint (5–8% opacity), heavy (900), tight tracking and line
 * height — so the character partially overlaps it for a premium magazine
 * feel. Non-interactive and hidden from assistive tech.
 *
 * `[data-anim="editorial"]` is the slow fade target; `[data-parallax="type"]`
 * is the mid-depth parallax target.
 */
export default function EditorialName() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      aria-hidden="true"
    >
      <div data-parallax="type" className="w-full">
        <p
          data-anim="editorial"
          className="select-none text-center font-black leading-[0.85] tracking-[-0.04em] text-white text-[clamp(4rem,22vw,20rem)]"
        >
          <span className="block">SHIBAM</span>
          <span className="block">PANDAB</span>
        </p>
      </div>
    </div>
  );
}
