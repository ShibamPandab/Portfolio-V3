"use client";

import { useState } from "react";

/**
 * Segmented control with a sliding active indicator. Equal-width segments, so
 * the indicator is positioned by `translateX(index * 100%)` on an eased
 * transition — no layout thrash, no bounce.
 */
export default function SegmentedControl({
  options = ["Design", "Motion", "Code"],
  defaultIndex = 0,
}: {
  options?: string[];
  defaultIndex?: number;
}) {
  const [index, setIndex] = useState(defaultIndex);

  return (
    <div
      role="tablist"
      aria-label="View"
      className="relative flex rounded-full border border-white/12 bg-white/[0.03] p-1"
    >
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 rounded-full bg-white transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={i === index}
          onClick={() => setIndex(i)}
          className={`relative z-10 flex-1 rounded-full px-4 py-1.5 text-xs font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none ${
            i === index ? "text-black" : "text-white/60 hover:text-white/90"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
