# Portfolio V3 — Creative Lab Vision

This is NOT a traditional portfolio.

The goal is to create a premium Awwwards-inspired **creative lab** focused on cinematic motion, storytelling and interactive frontend experiences.

The overall feeling should be:

- Minimal
- Luxury
- Experimental
- Cinematic
- Immersive
- Premium
- Smooth
- Story-driven

Never create generic portfolio sections. Every section should feel like an experience.

---

## Design Principles

- Black background
- Large typography
- Lots of whitespace
- Motion first
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Premium spacing
- Editorial layouts
- Micro interactions
- Consistent typography

---

## Motion Rules

Every animation must feel expensive. Never over-animate.

**Use:** Opacity · TranslateY · Scale · Clip-path reveal · Mask reveal · Text reveal · Parallax · Timeline animations · Mouse interactions

**Avoid:** Bounce · Cheap easing · Random spinning · Flashy animations

---

## Sections

| # | Section | Status |
| --- | --- | --- |
| 01 | Hero Intro | ✅ built |
| 02 | Creative Web Experiences | ✅ built (`CreativeSection`) |
| 03 | AI-Assisted Frontend | ✅ built (`EditorialSection`) |
| 04 | Infinite Marquee | ✅ built (`Marquee`) |
| 05 | Journey Timeline | ✅ built (`TimelineSection`) |
| 06 | Philosophy | ⬜ pending |
| 07 | Featured Projects | ✅ built (`ProjectsSection`) — placeholder data |
| 08 | Process | ⬜ pending |
| 09 | Motion Lab | ⬜ pending |
| 10 | UI Library | ⬜ pending |
| 11 | Tech Stack | ⬜ pending |
| 12 | About | ⬜ pending |
| 13 | Contact | ⬜ pending |
| 14 | Footer | ⬜ pending |

> Note: current on-page order is Hero → AI-Assisted (02 copy) → Creative Web Experiences → Marquee → Journey → Projects. Section numbering above follows the vision doc; on-page order can be reconciled when we revisit.

---

## Projects

- Total projects: **17**
- Only **featured** projects appear on the homepage.
- Every project has: Hero · Overview · Challenge · Solution · Motion · Tech · Result · Gallery

---

## Motion Lab

GSAP Experiments · Text Reveal · Timeline · Horizontal Scroll · Mouse Follow · Cursor · Parallax · Mask Reveal · 3D Motion

---

## Future Sections

Three.js Experiments · Playground · Concept Designs · UI Collection · Creative Process · Performance · Awards · Writing · Resources

---

## Coding Rules

- Always create reusable components.
- Never hardcode layouts.
- Everything should be responsive.
- Animations should use GSAP.
- Components should be modular.
- Use TypeScript.
- Maintain performance.

---

## Design References

Awwwards · Locomotive · Active Theory · Dogstudio · Obys · Cuberto · Studio Freight · Resn · Minimal Gallery · Obscura

---

## Workflow (STRICT)

1. Never generate the whole website at once.
2. Always build **one section**.
3. Wait for feedback.
4. Refine.
5. Only then move to the next section.

Maintain the same design language, spacing, typography, motion quality and component architecture across the entire portfolio.

---

## Current architecture (as of this document)

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Framer Motion (`motion`).
- **Typography:** Geist (sans, headings + body) · JetBrains Mono (mono labels), wired via `--font-sans` / `--font-mono` tokens.
- **Shared animation system:** `useRevealOnScroll` (staggered fade-up, `power2.out`, 0.7s / 130ms) · `useHeroIntro` / `useHeroScroll` · `useStoryTimeline` · `useParallax` · `useIsomorphicLayoutEffect`.
- **Pre-JS pattern:** `data-intro="pending"` / `.reveal-item` / `.timeline-card` hidden in CSS so GSAP owns the reveal with no flash; every section has a `<noscript>` fallback.
- **Not yet added:** Lenis smooth scrolling (design principle, pending a dedicated pass).
</content>
