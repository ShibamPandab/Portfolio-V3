export const EMAIL = "shibampandab@gmail.com";

export interface Social {
  label: string;
  href: string;
}

/**
 * Social links. GitHub is the known handle; the others are placeholders (`#`)
 * — swap in real profile URLs.
 */
export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/ShibamPandab" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "Instagram", href: "#" },
];
