"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

/**
 * Pill button with a magnetic pull toward the cursor. Reusable across the site.
 * The eased return is CSS-driven (no bounce). Renders a real <button>.
 */
export default function MagneticButton({
  children = "Hover me",
  onClick,
}: {
  children?: ReactNode;
  onClick?: () => void;
}) {
  const { ref, onPointerMove, onPointerLeave } =
    useMagnetic<HTMLButtonElement>(0.4);

  return (
    <button
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-medium tracking-tight text-white/95 [transition:transform_0.45s_cubic-bezier(0.22,1,0.36,1),background-color_0.3s,border-color_0.3s] hover:border-white/40 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}
