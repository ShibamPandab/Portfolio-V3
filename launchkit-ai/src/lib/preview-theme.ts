import type { ColorThemeId, VisualStyleId } from "@/lib/generation";

/**
 * Maps the wizard's style + theme picks to CSS custom properties consumed by
 * the generated-page sections (--gp-*). Sections never hardcode colors, so a
 * future AI-driven theme only needs to emit a new token set.
 */

interface ThemePalette {
  primary: string;
  primaryFg: string;
  gradientFrom: string;
  gradientTo: string;
}

const palettes: Record<ColorThemeId, ThemePalette> = {
  aurora: {
    primary: "#7c6cf0",
    primaryFg: "#ffffff",
    gradientFrom: "#8b7cf6",
    gradientTo: "#5fd4f4",
  },
  midnight: {
    primary: "#4a5cc7",
    primaryFg: "#ffffff",
    gradientFrom: "#3b4a8f",
    gradientTo: "#8ea2ff",
  },
  ember: {
    primary: "#e2653a",
    primaryFg: "#ffffff",
    gradientFrom: "#e2653a",
    gradientTo: "#ffb46b",
  },
  forest: {
    primary: "#2f8f5b",
    primaryFg: "#ffffff",
    gradientFrom: "#2f8f5b",
    gradientTo: "#a3e4c1",
  },
  mono: {
    primary: "#1a1a1a",
    primaryFg: "#ffffff",
    gradientFrom: "#333333",
    gradientTo: "#888888",
  },
};

interface StyleTokens {
  bg: string;
  fg: string;
  muted: string;
  card: string;
  border: string;
  radius: string;
  /** Tailwind classes applied to the page root (fonts, tracking, etc.). */
  rootClass: string;
  /** Dark surfaces flip the primary for contrast on some themes. */
  dark: boolean;
}

const styles: Record<VisualStyleId, StyleTokens> = {
  minimal: {
    bg: "#fafafa",
    fg: "#171717",
    muted: "#6b7280",
    card: "#ffffff",
    border: "#e5e7eb",
    radius: "0.75rem",
    rootClass: "font-sans",
    dark: false,
  },
  playful: {
    bg: "#fffdf5",
    fg: "#1c1917",
    muted: "#78716c",
    card: "#ffffff",
    border: "#e7e5e4",
    radius: "1.5rem",
    rootClass: "font-sans",
    dark: false,
  },
  corporate: {
    bg: "#f6f8fb",
    fg: "#0f172a",
    muted: "#64748b",
    card: "#ffffff",
    border: "#e2e8f0",
    radius: "0.5rem",
    rootClass: "font-sans",
    dark: false,
  },
  luxury: {
    bg: "#0c0c0e",
    fg: "#f5f3ef",
    muted: "#9c968c",
    card: "#151517",
    border: "#2a2a2e",
    radius: "0.25rem",
    rootClass: "font-serif tracking-wide",
    dark: true,
  },
};

export function buildPreviewTheme(style: VisualStyleId, theme: ColorThemeId) {
  const s = styles[style];
  const p = { ...palettes[theme] };

  // Mono primary is near-black; flip it on dark luxury surfaces.
  if (s.dark && theme === "mono") {
    p.primary = "#f5f3ef";
    p.primaryFg = "#111111";
    p.gradientFrom = "#dddddd";
    p.gradientTo = "#777777";
  }

  return {
    rootClass: s.rootClass,
    vars: {
      "--gp-bg": s.bg,
      "--gp-fg": s.fg,
      "--gp-muted": s.muted,
      "--gp-card": s.card,
      "--gp-border": s.border,
      "--gp-radius": s.radius,
      "--gp-primary": p.primary,
      "--gp-primary-fg": p.primaryFg,
      "--gp-grad-from": p.gradientFrom,
      "--gp-grad-to": p.gradientTo,
    } as React.CSSProperties,
  };
}
