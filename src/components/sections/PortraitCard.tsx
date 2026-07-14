import Image from "next/image";

interface PortraitCardProps {
  src: string;
  alt: string;
}

/**
 * Large editorial portrait card — shared by every content section so the
 * portraits sit in an identical frame, spacing and treatment (a deliberately
 * different visual moment from the cinematic landing portrait).
 *
 * `object-contain` + `object-bottom` guarantee the full figure is shown with
 * the head never cropped, anchored to the bottom of the frame so as much of
 * the body as possible reads.
 *
 * The card's 3:4 aspect matches both sources exactly (1086×1448), so each shot
 * fills the frame seamlessly with no letterboxing. The sources carry their own
 * opaque black backdrop; the gradient bed in `.portrait-card` therefore mostly
 * reads at the edges, while the subtle glass border and drop shadow are what
 * lift the card off the black page.
 */
export default function PortraitCard({ src, alt }: PortraitCardProps) {
  return (
    <div className="portrait-card relative aspect-[3/4] w-full overflow-hidden rounded-[28px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-contain object-bottom"
      />
    </div>
  );
}
