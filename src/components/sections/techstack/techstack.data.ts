export interface TechGroup {
  no: string;
  label: string;
  items: string[];
}

/** The toolkit, grouped by discipline. */
export const TECH_GROUPS: TechGroup[] = [
  {
    no: "01",
    label: "Core",
    items: ["React", "Next.js", "TypeScript"],
  },
  {
    no: "02",
    label: "Styling",
    items: ["Tailwind CSS", "CSS Architecture", "Design Tokens"],
  },
  {
    no: "03",
    label: "Motion",
    items: ["GSAP", "ScrollTrigger", "Framer Motion", "Lenis"],
  },
  {
    no: "04",
    label: "3D & WebGL",
    items: ["Three.js", "React Three Fiber", "WebGL", "GLSL"],
  },
  {
    no: "05",
    label: "Tooling",
    items: ["Git", "Turbopack", "Figma", "Vercel"],
  },
  {
    no: "06",
    label: "Foundations",
    items: ["Accessibility", "Performance", "Responsive"],
  },
];
