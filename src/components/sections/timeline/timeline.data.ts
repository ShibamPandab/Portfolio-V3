export interface Entry {
  year: string;
  title: string;
  subtitle: string;
  body: string;
}

/**
 * Story beats, rendered top → bottom. Cards alternate left/right by index.
 * Marker positions are derived from the count, so adding entries needs no
 * changes to the animation (see useStoryTimeline).
 */
export const ENTRIES: Entry[] = [
  {
    year: "2025",
    title: "Started AI-Assisted Development",
    subtitle: "Frontend • AI Tools • Motion",
    body: "Built premium landing pages using modern frontend technologies and AI-assisted workflows. Focused on clean UI, smooth interactions and production-quality experiences.",
  },
  {
    year: "2026",
    title: "Building Cinematic Web Experiences",
    subtitle: "GSAP • Three.js • Premium Interfaces",
    body: "Creating immersive, motion-driven websites with cinematic scrolling, storytelling, 3D interactions and high-end user experiences inspired by Awwwards.",
  },
];
