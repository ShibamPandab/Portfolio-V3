export interface Phase {
  no: string;
  title: string;
  body: string;
  deliverables: string[];
}

/** The working method — four phases, rendered top → bottom. */
export const PHASES: Phase[] = [
  {
    no: "01",
    title: "Discovery",
    body: "Understanding the brief, the audience and the constraints before a single pixel moves — so every decision that follows has a reason.",
    deliverables: ["Research", "Audit", "Strategy"],
  },
  {
    no: "02",
    title: "Direction",
    body: "Art direction, a motion language and a typographic system the whole product inherits — the feel is defined once, then applied everywhere.",
    deliverables: ["Art Direction", "Motion Language", "Type System"],
  },
  {
    no: "03",
    title: "Build",
    body: "Component architecture, performance budgets and accessibility engineered from the first commit — premium on the surface, disciplined underneath.",
    deliverables: ["Architecture", "Performance", "Accessibility"],
  },
  {
    no: "04",
    title: "Launch",
    body: "Polish, QA and a cinematic hand-off — shipped, measured and refined until the experience feels effortless.",
    deliverables: ["QA", "Launch", "Iterate"],
  },
];
