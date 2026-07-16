const MARQUEE_ITEMS = [
  "AI-Assisted Frontend",
  "Motion Design",
  "Interactive UI",
  "Premium Landing Pages",
  "Three.js",
  "React",
  "Next.js",
  "GSAP",
  "Framer Motion",
  "Creative Development",
  "UI Engineering",
  "Performance",
  "Scroll Storytelling",
] as const;

/** One full copy of the track's contents (item + trailing separator). */
function MarqueeGroup() {
  return (
    <>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          {item}
          <span aria-hidden="true" className="marquee-sep">
            ✦
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * Premium infinite marquee — pure CSS for a perfectly smooth, jump-free loop.
 *
 * Seamlessness comes from rendering the content twice inside one track and
 * translating the track by exactly -50%: when the first copy has fully scrolled
 * off, the second copy sits pixel-identical to the start, so the reset is
 * invisible. Because the track width is content-driven, this holds at any
 * screen size with no measurement.
 *
 * The whole thing is decorative (`aria-hidden`) so screen readers don't read
 * the duplicated list. Edge fade + pause-on-hover live in `.marquee` /
 * `.marquee-track` in globals.css, and the animation is disabled under
 * `prefers-reduced-motion`.
 */
export default function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="marquee relative w-full overflow-hidden border-y border-white/10 bg-transparent"
    >
      <div className="marquee-track flex w-max whitespace-nowrap">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </section>
  );
}
