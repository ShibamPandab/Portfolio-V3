"use client";

import { useRef } from "react";
import { EMAIL, SOCIALS } from "@/components/sections/contact/contact.data";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const MENU = [
  { label: "Projects", href: "#projects" },
  { label: "Motion Lab", href: "#motion-lab" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Footer — the final chord. A quick-contact + sitemap + socials row, a meta
 * line, and the oversized SHIBAM® wordmark (the signature Awwwards mark).
 * Reuses the shared reveal system and the contact data (no duplication).
 */
export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  useRevealOnScroll(rootRef);

  const backToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={rootRef}
      className="relative w-full overflow-hidden bg-background px-6 pb-10 pt-[clamp(4rem,10vh,7rem)] sm:px-10 lg:px-16 xl:px-24"
    >
      <noscript>
        <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* Top — quick contact + menu + social */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div data-reveal className="reveal-item lg:col-span-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
            Have a project in mind?
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-5 inline-flex items-center gap-2 text-[clamp(1.25rem,2.6vw,2rem)] font-medium tracking-[-0.02em] text-white/85 transition-colors duration-300 hover:text-white"
          >
            {EMAIL}
            <span
              aria-hidden="true"
              className="text-[0.7em] transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </a>
        </div>

        <nav
          data-reveal
          aria-label="Footer"
          className="reveal-item lg:col-span-3"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/35">
            Menu
          </p>
          <ul className="mt-5 space-y-2.5">
            {MENU.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-white/95"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div data-reveal className="reveal-item lg:col-span-3">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/35">
            Social
          </p>
          <ul className="mt-5 space-y-2.5">
            {SOCIALS.map((social) => {
              const external = social.href.startsWith("http");
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-white/95"
                  >
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Meta row */}
      <div
        data-reveal
        className="reveal-item mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/40 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>© {new Date().getFullYear()} Shibam Pandab</span>
        <span className="hidden sm:inline">Built with Next.js · GSAP · Motion</span>
        <button
          type="button"
          onClick={backToTop}
          className="inline-flex items-center gap-1.5 text-left uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white/90 focus-visible:outline-none focus-visible:text-white/90"
        >
          Back to top
          <span aria-hidden="true">↑</span>
        </button>
      </div>

      {/* Oversized wordmark */}
      <div
        data-reveal
        className="reveal-item mt-[clamp(3rem,9vh,6rem)] flex items-start justify-center"
      >
        <p className="select-none text-[clamp(3.5rem,19vw,15rem)] font-semibold leading-[0.8] tracking-[-0.04em] text-white">
          SHIBAM
        </p>
        <span
          aria-hidden="true"
          className="mt-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 font-mono text-[0.55rem] text-white/70 lg:mt-4 lg:h-10 lg:w-10 lg:text-xs"
        >
          R
        </span>
      </div>
    </footer>
  );
}
