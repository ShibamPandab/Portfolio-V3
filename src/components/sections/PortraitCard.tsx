import Image from "next/image";

/**
 * Large editorial portrait card — the second-section counterpart to the
 * cinematic landing portrait (a deliberately different visual moment).
 *
 * `object-contain` + `object-bottom` guarantee the full figure is shown with
 * the head never cropped, anchored to the bottom of the frame so as much of
 * the body as possible reads.
 *
 * The card's 3:4 aspect matches the source exactly, so the shot fills the
 * frame seamlessly with no letterboxing. The source carries its own opaque
 * black backdrop; the gradient bed in `.portrait-card` therefore mostly reads
 * at the edges, while the subtle glass border and drop shadow are what lift
 * the card off the black page.
 */
export default function PortraitCard() {
  return (
    <div className="portrait-card relative aspect-[3/4] w-full overflow-hidden rounded-[28px]">
      <Image
        src="/images/portrait-crossed.png"
        alt="Black and white portrait of Shibam Pandab with arms crossed"
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-contain object-bottom"
      />
    </div>
  );
}
