"use client";

import { motion, type Variants } from "motion/react";
import type { Project } from "@/components/sections/projects/projects.data";

/** Shared easing / duration for the whole hover interaction (0.45–0.6s). */
const TRANSITION = { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const;

/* Parent drives bg + text colour; children inherit `color` via currentColor.
   Rest = white / black; hover inverts to black / white (the hovered row's
   black blends into the page so it reads as a clean dissolve). */
const rowVariants: Variants = {
  rest: { backgroundColor: "#ffffff", color: "#0a0a0a" },
  hover: { backgroundColor: "#000000", color: "#ffffff" },
};

const titleVariants: Variants = {
  rest: { y: 0 },
  hover: { y: -6 },
};

const arrowVariants: Variants = {
  rest: { rotate: 0, x: 0, y: 0 },
  hover: { rotate: 45, x: 4, y: -4 },
};

interface ProjectRowProps {
  project: Project;
  onActivate: () => void;
  onDeactivate: () => void;
}

/**
 * A single full-width project row. On hover the whole row inverts (transparent
 * → white background, muted text → black), the title lifts, and the arrow
 * slides up-right and rotates. Framer variant propagation keeps every piece on
 * the same timing curve. The native cursor is hidden (`cursor-none`) so the
 * section's custom floating cursor shows instead.
 */
export default function ProjectRow({
  project,
  onActivate,
  onDeactivate,
}: ProjectRowProps) {
  return (
    <motion.a
      href={project.href}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={rowVariants}
      transition={TRANSITION}
      onHoverStart={onActivate}
      onHoverEnd={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className="group relative flex items-center justify-between gap-6 px-6 py-[clamp(1.75rem,4.5vw,3.25rem)] sm:px-10 lg:px-16 lg:[cursor:none] xl:px-24"
    >
      {/* Left — number */}
      <span className="w-10 shrink-0 font-mono text-xs tracking-[0.2em] opacity-60 sm:w-14">
        {project.no}
      </span>

      {/* Center — title + tag */}
      <div className="min-w-0 flex-1">
        <motion.h3
          variants={titleVariants}
          transition={TRANSITION}
          className="truncate text-[clamp(1.75rem,5.5vw,4.25rem)] font-medium leading-none tracking-[-0.02em]"
        >
          {project.title}
        </motion.h3>
        <span className="mt-2 block truncate font-mono text-[0.7rem] uppercase tracking-[0.24em] opacity-50">
          {project.tag}
        </span>
      </div>

      {/* Right — arrow */}
      <motion.span
        variants={arrowVariants}
        transition={TRANSITION}
        aria-hidden="true"
        className="shrink-0"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:h-8 sm:w-8"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </motion.span>
    </motion.a>
  );
}
