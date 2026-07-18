"use client";

import { useRef, useState } from "react";

/**
 * Click-to-copy chip. Copies its own displayed text to the clipboard and shows
 * a transient "Copied" state. Fails gracefully if the Clipboard API is
 * unavailable (older browsers / insecure contexts).
 */
export default function CopyChip({ value = "npx shibam-ui add" }: { value?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(value);
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy: ${value}`}
      className="group inline-flex items-center gap-3 rounded-lg border border-white/12 bg-white/[0.03] py-2.5 pl-4 pr-3 font-mono text-xs text-white/80 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <span>{value}</span>
      <span
        aria-hidden="true"
        className={`inline-flex w-14 shrink-0 items-center justify-center rounded-md border px-2 py-1 text-[0.6rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
          copied
            ? "border-white/30 bg-white text-black"
            : "border-white/12 text-white/50 group-hover:text-white/80"
        }`}
      >
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
