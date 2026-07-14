import Image from "next/image";

/**
 * Foreground character — a giant, dominant full-body cut-out.
 *
 * Sized to reproduce the reference framing exactly. The reference is the source
 * PNG at 120% zoom in a ~908px-tall window: image height ÷ viewport height =
 * 1843/908 ≈ 2.03, hence `max-h-[204vh]`. The starting `-translate-y-[4%]`
 * crops the source's transparent headroom so the head lands ~8.8% down the
 * frame, matching the reference; together these frame PNG rows ~4%→53%
 * (head + shoulders + upper chest, down to the jersey badge).
 *
 * Because the figure deliberately overflows the 100vh stage, the stage's
 * `overflow-hidden` acts as the camera aperture, and useHeroScroll pans the
 * figure upward so the camera travels down the body as you scroll.
 *
 * The height is set EXPLICITLY (`h-[204vh]`, width auto from the intrinsic
 * 2:3 ratio) rather than via `max-h` on an auto-sized image: with next/image's
 * `w`-descriptor srcset the browser derives an auto-sized layout box from the
 * `sizes` hint, so a `max-h` cap never binds and the figure renders far too
 * small. `max-w-none` then lets it exceed the viewport width on narrow screens
 * — the subject is horizontally centred in the source, so the crop only trims
 * the outer arms and the face always stays centred.
 *
 * The pan is applied to the `[data-pan="char"]` wrapper (never the <Image>
 * itself), keeping the transform on a single dedicated element.
 */
export default function HeroCharacter() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center">
      {/* Static framing offset — crops the source's transparent headroom so the
          head lands ~8.8% down the frame. Kept on its own element so GSAP never
          compounds with it (gsap `y` and `yPercent` are additive). */}
      <div className="-translate-y-[4%]">
        {/* GSAP exclusively owns this element's transform (the camera pan). */}
        <div data-pan="char">
          <Image
            src="/images/character-bw.png"
            alt="Portrait of Shibam Pandab, AI-assisted frontend developer"
            width={1024}
            height={1536}
            priority
            sizes="136vh"
            className="block h-[204vh] w-auto max-w-none select-none"
          />
        </div>
      </div>
    </div>
  );
}
