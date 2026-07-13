import Image from "next/image";

/**
 * Foreground character cut-out — the primary focal point. Always sits in
 * front of every background layer (z-30), horizontally centred and aligned
 * toward the bottom.
 *
 * `object-cover` keeps the figure large on every viewport; because the
 * subject is horizontally centred in the source frame the crop only trims
 * transparent margins, so the face is never cut off. A soft `drop-shadow`
 * (applied to the image, not the animated wrapper) separates it from the
 * background without conflicting with the intro's blur tween.
 *
 * Outer `[data-anim="char"]`  → intro timeline (translate / blur / scale / fade)
 * Inner `[data-parallax="char"]` → cursor parallax
 */
export default function HeroCharacter() {
  return (
    <div data-anim="char" className="absolute inset-0 z-30">
      <div data-parallax="char" className="absolute inset-0">
        <Image
          src="/images/character.png"
          alt="Portrait of Shibam Pandab, AI-assisted frontend developer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_30%] drop-shadow-[0_28px_60px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
}
