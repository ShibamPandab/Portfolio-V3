export interface Project {
  /** Two-digit index label, e.g. "01". */
  no: string;
  title: string;
  /** Short discipline tag shown under the title. */
  tag: string;
  href: string;
  /**
   * Thumbnail preview. No real screenshots exist yet, so each project gets a
   * distinct CSS gradient placeholder — swap `thumb` for an <img> later.
   */
  thumb: string;
}

export const PROJECTS: Project[] = [
  {
    no: "01",
    title: "Aurora Commerce",
    tag: "3D Product Configurator",
    href: "#",
    thumb: "linear-gradient(135deg, #1b2a4a 0%, #4a2f6b 55%, #0c0c14 100%)",
  },
  {
    no: "02",
    title: "Nebula Studio",
    tag: "Motion-Driven Agency Site",
    href: "#",
    thumb: "linear-gradient(135deg, #3a1c2b 0%, #6b2f3a 50%, #120a0c 100%)",
  },
  {
    no: "03",
    title: "Flux Dashboard",
    tag: "Realtime Data Interface",
    href: "#",
    thumb: "linear-gradient(135deg, #10333a 0%, #1f6b5c 55%, #08110f 100%)",
  },
  {
    no: "04",
    title: "Monolith",
    tag: "Cinematic Scroll Landing",
    href: "#",
    thumb: "linear-gradient(135deg, #2a2a2e 0%, #5a5a63 50%, #0d0d10 100%)",
  },
  {
    no: "05",
    title: "Prism",
    tag: "WebGL Portfolio",
    href: "#",
    thumb: "linear-gradient(135deg, #23325e 0%, #b06a2f 90%, #0c0c14 100%)",
  },
];
