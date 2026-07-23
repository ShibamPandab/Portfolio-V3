export type VisualStyleId = "minimal" | "playful" | "corporate" | "luxury";
export type ColorThemeId = "aurora" | "midnight" | "ember" | "forest" | "mono";
export type CtaGoalId = "waitlist" | "demo" | "purchase" | "download";

export interface GenerationInput {
  idea: string;
  audience: string;
  style: VisualStyleId;
  theme: ColorThemeId;
  ctaGoal: CtaGoalId;
}

export const visualStyles: {
  id: VisualStyleId;
  name: string;
  description: string;
}[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean lines, generous whitespace, quiet confidence.",
  },
  {
    id: "playful",
    name: "Bold & Playful",
    description: "Vivid colors, big type, personality everywhere.",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Trustworthy, structured, enterprise-ready.",
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Editorial type, dark tones, premium restraint.",
  },
];

export const colorThemes: {
  id: ColorThemeId;
  name: string;
  swatches: [string, string, string];
}[] = [
  { id: "aurora", name: "Aurora", swatches: ["#8b7cf6", "#5b8def", "#5fd4f4"] },
  { id: "midnight", name: "Midnight", swatches: ["#0f1226", "#3b4a8f", "#8ea2ff"] },
  { id: "ember", name: "Ember", swatches: ["#2b1408", "#e2653a", "#ffb46b"] },
  { id: "forest", name: "Forest", swatches: ["#0d1f16", "#2f8f5b", "#a3e4c1"] },
  { id: "mono", name: "Mono", swatches: ["#111111", "#666666", "#eeeeee"] },
];

export const ctaGoals: {
  id: CtaGoalId;
  name: string;
  description: string;
}[] = [
  {
    id: "waitlist",
    name: "Collect waitlist signups",
    description: "Email capture for a product that isn't live yet.",
  },
  {
    id: "demo",
    name: "Book demos",
    description: "Drive qualified leads to a calendar or sales call.",
  },
  {
    id: "purchase",
    name: "Sell directly",
    description: "Send visitors straight to checkout or pricing.",
  },
  {
    id: "download",
    name: "Drive downloads",
    description: "Push installs of a mobile or desktop app.",
  },
];

export const audienceSuggestions = [
  "Startup founders",
  "Indie hackers",
  "Small business owners",
  "Developers",
  "Designers",
  "Students",
];

export const ideaExamples = [
  "An app that matches dog owners with trusted local sitters",
  "AI meal planner that builds grocery lists from your macros",
  "A marketplace for renting high-end camera gear nearby",
];

/** The AI-authored content for a generated landing page. */
export interface GeneratedContent {
  brand: { name: string; tagline: string };
  hero: { headline: string; subheadline: string; cta: string; secondaryCta: string };
  features: { title: string; description: string }[];
  testimonials: { quote: string; name: string; role: string }[];
  pricing: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    featured: boolean;
    cta: string;
  }[];
  faq: { question: string; answer: string }[];
  cta: { headline: string; subheadline: string };
  seo: { title: string; description: string; keywords: string[] };
  /** The AI's recommended style/theme — may differ from what the user picked. */
  themePreference: { style: VisualStyleId; colorTheme: ColorThemeId };
}

/** A full generation: what the user asked for + what the AI produced. */
export interface GenerationResult extends GeneratedContent {
  input: GenerationInput;
  generatedAt: string;
}

const STORAGE_KEY = "launchkit:generation";

export function saveGeneration(result: GenerationResult) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function loadGeneration(): GenerationResult | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GenerationResult) : null;
  } catch {
    return null;
  }
}
