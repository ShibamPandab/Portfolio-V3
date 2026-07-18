import AboutQuote from "@/components/sections/about/AboutQuote";
import AboutStatement from "@/components/sections/about/AboutStatement";
import AboutStory from "@/components/sections/about/AboutStory";

/**
 * About — "Behind the Work". The emotional closing chapter before Contact,
 * composed of three full-breathing blocks: a big statement, a portrait + short
 * story, and an end quote that dissolves into the next section. Each block is
 * its own client component with its own scoped scroll animation.
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative w-full bg-background"
    >
      <AboutStatement />
      <AboutStory />
      <AboutQuote />
    </section>
  );
}
