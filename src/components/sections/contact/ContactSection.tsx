"use client";

import { useRef } from "react";
import { EMAIL, SOCIALS } from "@/components/sections/contact/contact.data";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

/**
 * Contact — the closing call to action.
 *
 * Full-breathing section: an inviting headline, a giant magnetic email link as
 * the primary action, secondary socials and an availability status. Reuses the
 * shared reveal system and the magnetic hook — no new motion language.
 */
export default function ContactSection() {
  const rootRef = useRef<HTMLElement>(null);
  useRevealOnScroll(rootRef);

  // Magnetic pull on the primary email CTA.
  const { ref, onPointerMove, onPointerLeave } =
    useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section
      ref={rootRef}
      id="contact"
      aria-label="Contact"
      className="relative flex min-h-[100svh] w-full flex-col justify-between bg-background px-6 py-[clamp(4rem,10vh,7rem)] sm:px-10 lg:px-16 xl:px-24"
    >
      <noscript>
        <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* Center — invitation + email CTA */}
      <div className="flex flex-1 flex-col justify-center py-16">
        <p
          data-reveal
          className="reveal-item font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45"
        >
          Contact
        </p>

        <h2
          data-reveal
          className="reveal-item mt-8 max-w-[18ch] text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white/95"
        >
          Let&apos;s build something people remember.
        </h2>

        {/* Giant magnetic email link */}
        <div className="mt-[clamp(2.5rem,7vh,5rem)]">
          <a
            ref={ref}
            href={`mailto:${EMAIL}`}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            data-reveal
            className="reveal-item group inline-flex items-center gap-[0.4em] text-[clamp(1.5rem,4.5vw,3.75rem)] font-medium tracking-[-0.02em] text-white/70 [transition:transform_0.45s_cubic-bezier(0.22,1,0.36,1),color_0.3s] hover:text-white focus-visible:outline-none focus-visible:text-white"
          >
            {EMAIL}
            <span
              aria-hidden="true"
              className="text-[0.7em] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
            >
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Bottom — socials + availability */}
      <div className="flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <ul
          data-reveal
          className="reveal-item flex flex-wrap gap-x-8 gap-y-3"
        >
          {SOCIALS.map((social) => {
            const external = social.href.startsWith("http");
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white/90 focus-visible:outline-none focus-visible:text-white/90"
                >
                  {social.label}
                </a>
              </li>
            );
          })}
        </ul>

        <span
          data-reveal
          className="reveal-item inline-flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="ui-status-dot h-2 w-2 rounded-full bg-white" />
          Available for work
        </span>
      </div>
    </section>
  );
}
