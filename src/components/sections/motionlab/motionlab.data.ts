export interface Experiment {
  no: string;
  title: string;
  tag: string;
  blurb: string;
  /** Distinct CSS gradient for the card face. */
  accent: string;
}

/** Motion experiments — the "lab". Dragged through horizontally. */
export const EXPERIMENTS: Experiment[] = [
  {
    no: "01",
    title: "Text Reveal",
    tag: "Typography",
    blurb: "Line-by-line masked type that wipes up on scroll.",
    accent: "linear-gradient(150deg, #1b2a4a 0%, #34215a 60%, #0b0b12 100%)",
  },
  {
    no: "02",
    title: "Mask Reveal",
    tag: "Clip-path",
    blurb: "Image and shape wipes driven by animated clip-paths.",
    accent: "linear-gradient(150deg, #10333a 0%, #1f6b5c 60%, #08110f 100%)",
  },
  {
    no: "03",
    title: "Parallax",
    tag: "Depth",
    blurb: "Layered depth from pointer position and scroll velocity.",
    accent: "linear-gradient(150deg, #3a1c2b 0%, #6b2f3a 55%, #120a0c 100%)",
  },
  {
    no: "04",
    title: "Horizontal Scroll",
    tag: "Layout",
    blurb: "Sideways storytelling — the technique you're using now.",
    accent: "linear-gradient(150deg, #23325e 0%, #b06a2f 90%, #0c0c14 100%)",
  },
  {
    no: "05",
    title: "Mouse Follow",
    tag: "Cursor",
    blurb: "Cursor-driven interfaces with smoothed, lagging springs.",
    accent: "linear-gradient(150deg, #2a2a2e 0%, #5a5a63 55%, #0d0d10 100%)",
  },
  {
    no: "06",
    title: "3D Motion",
    tag: "Perspective",
    blurb: "Tactile perspective tilt — drag and hover this card to feel it.",
    accent: "linear-gradient(150deg, #14324f 0%, #2f7ab0 85%, #0a0f14 100%)",
  },
];
