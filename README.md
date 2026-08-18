# Portfolio V3 — Creative Lab

> Not a traditional portfolio — a premium, Awwwards-inspired creative lab focused on cinematic motion, storytelling, and interactive frontend experiences.

A motion-first personal site built with **Next.js 16** and **GSAP**, designed to feel minimal, luxurious, and immersive. Every section is an experience: clip-path and mask reveals, scroll-driven timelines, parallax, magnetic interactions, and smooth scrolling over a deep black canvas.

**🔗 Live site: [portfolio-v3-zeta-three.vercel.app](https://portfolio-v3-zeta-three.vercel.app/)**

<p>
  <a href="https://portfolio-v3-zeta-three.vercel.app/"><img alt="Live Demo" src="https://img.shields.io/badge/Live_Demo-000000?logo=vercel&logoColor=white"></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js_16-000000?logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=black">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white">
</p>

---

## ✨ Highlights

- **Motion-first** — GSAP + ScrollTrigger timelines drive every reveal; **Lenis** provides buttery smooth scrolling.
- **Cinematic hero** — layered video, character portrait, film grain, and vignette with a scripted intro timeline.
- **No-flash reveals** — content is hidden in CSS (`data-intro`, `.reveal-item`) so GSAP owns the reveal, with `<noscript>` fallbacks for every section.
- **Editorial layouts** — large typography, generous whitespace, and premium spacing throughout.
- **Reusable animation system** — a library of custom hooks (`useRevealOnScroll`, `useHeroIntro`, `useStoryTimeline`, `useParallax`, `useMagnetic`, `useWordReveal`, `useTilt`…).
- **Custom UI primitives** — magnetic buttons, copy chips, segmented controls, and toggles.

## 🧩 Sections

Hero · Creative Web Experiences · AI-Assisted Frontend (Editorial) · Infinite Marquee · Journey Timeline · Featured Projects · Process · Motion Lab · Tech Stack · UI Library · About · Contact · Footer

## 🧱 Tech stack

| Layer | Tools |
| --- | --- |
| Framework | **Next.js 16** (App Router), **React 19** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** |
| Motion | **GSAP** + ScrollTrigger · **Motion** (Framer Motion) · **Lenis** smooth scroll |
| Type | Geist (sans) · JetBrains Mono (mono labels) |

## 🚀 Getting started

### Prerequisites

- Node.js 18.18+ (Node 20+ recommended)

### Install & run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## 🗂 Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + fonts
│   ├── page.tsx            # Section composition
│   └── globals.css         # Tailwind + pre-JS reveal styles
├── components/
│   ├── hero/               # Hero: video, character, grain, vignette, editorial name
│   ├── sections/           # Creative, Editorial, Marquee, Timeline, Projects,
│   │                       #   Process, MotionLab, TechStack, UILibrary, About,
│   │                       #   Contact, Footer (+ per-section *.data.ts)
│   ├── ui/                 # MagneticButton, CopyChip, SegmentedControl, ToggleSwitch
│   └── SmoothScroll.tsx    # Lenis wrapper
├── hooks/                  # Reusable GSAP/motion hooks
└── lib/                    # heroTimeline + helpers
```

## 🎨 Design principles

Black background · large typography · lots of whitespace · motion first · editorial layouts · micro-interactions. Animations favor opacity, translate, scale, clip-path/mask reveals, parallax, and timelines — never bounce, cheap easing, or flashy spinning. Every animation should feel expensive; never over-animate.

See [`PROJECT_VISION.md`](PROJECT_VISION.md) for the full creative direction, section roadmap, and motion rules.

## 🌐 Deploy

Deployed on **Vercel** → [portfolio-v3-zeta-three.vercel.app](https://portfolio-v3-zeta-three.vercel.app/). Import the repo into Vercel — no extra build configuration is required.

## 📄 License

This project is a personal portfolio. Code is shared for reference; please don't republish the content or design as your own.
