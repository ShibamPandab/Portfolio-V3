"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import ProjectRow from "@/components/sections/projects/ProjectRow";
import { PROJECTS } from "@/components/sections/projects/projects.data";

/** Snappy spring for the cursor; softer one lets the thumbnail lag behind. */
const CURSOR_SPRING = { stiffness: 500, damping: 40, mass: 0.6 };
const THUMB_SPRING = { stiffness: 130, damping: 22, mass: 0.7 };

/** True on devices with a precise pointer (mouse) — SSR-safe, no flash. */
function usePointerFine(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

/**
 * Awwwards-style projects list.
 *
 * Full-width rows separated by hairline borders. Hovering a row inverts it
 * (see ProjectRow) and, on pointer-fine devices, reveals a custom floating
 * cursor ("Explore ↗") plus a project thumbnail that trails the cursor with a
 * softer spring. Both overlays stay mounted so their springs track the pointer
 * continuously; visibility is animated, and the thumbnail keeps showing the
 * last project while it fades out (no blank flash).
 */
export default function ProjectsSection() {
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState(0);
  // Only enable the custom cursor where a real pointer exists.
  const fine = usePointerFine();

  // Raw pointer position → springs (cursor snappy, thumbnail laggier).
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const cursorX = useSpring(mouseX, CURSOR_SPRING);
  const cursorY = useSpring(mouseY, CURSOR_SPRING);
  const thumbX = useSpring(mouseX, THUMB_SPRING);
  const thumbY = useSpring(mouseY, THUMB_SPRING);

  const handleMouseMove = (event: React.MouseEvent) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  const activate = (index: number) => {
    setActive(index);
    setLast(index);
  };

  // Clear the custom cursor when the page scrolls: if the pointer stays still
  // while a row scrolls out from under it, Framer's onHoverEnd never fires, so
  // the fixed cursor/thumbnail would otherwise linger over later sections.
  useEffect(() => {
    const clear = () => setActive(null);
    window.addEventListener("scroll", clear, { passive: true });
    return () => window.removeEventListener("scroll", clear);
  }, []);

  const visible = fine && active !== null;

  return (
    <section
      id="projects"
      aria-label="Selected projects"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActive(null)}
      className="relative w-full bg-background py-[clamp(5rem,12vh,9rem)]"
    >
      {/* Section header */}
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
          Selected Work
        </p>
        <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.02em] text-white/95">
          Projects
        </h2>
      </div>

      {/* Rows */}
      <div className="mt-[clamp(2.5rem,6vh,4.5rem)] border-t border-black/10">
        {PROJECTS.map((project, index) => (
          <div key={project.no} className="border-b border-black/10">
            <ProjectRow
              project={project}
              onActivate={() => activate(index)}
              onDeactivate={() => setActive(null)}
            />
          </div>
        ))}
      </div>

      {/* Custom floating cursor + trailing thumbnail (pointer-fine only) */}
      {fine && (
        <>
          {/* Thumbnail — trails with a softer spring, floats above the cursor */}
          <motion.div
            aria-hidden="true"
            style={{ x: thumbX, y: thumbY }}
            className="pointer-events-none fixed left-0 top-0 z-[58]"
          >
            <motion.div
              initial={false}
              animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0.85,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-40 w-56 -translate-x-1/2 -translate-y-[150%] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
            >
              <AnimatePresence>
                <motion.div
                  key={last}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                  style={{ backgroundImage: PROJECTS[last].thumb }}
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Cursor — "Explore ↗" */}
          <motion.div
            aria-hidden="true"
            style={{ x: cursorX, y: cursorY }}
            className="pointer-events-none fixed left-0 top-0 z-[59]"
          >
            <motion.div
              initial={false}
              animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-black/10 bg-white text-black"
            >
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em]">
                Explore
              </span>
              <span className="text-base leading-none">↗</span>
            </motion.div>
          </motion.div>
        </>
      )}
    </section>
  );
}
