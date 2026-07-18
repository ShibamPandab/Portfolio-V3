"use client";

import { useId, useState } from "react";

/**
 * Accessible on/off switch (`role="switch"`, keyboard-operable via the native
 * button). The knob slides on a smooth eased transition — no bounce.
 */
export default function ToggleSwitch({
  defaultOn = false,
  label = "Toggle",
}: {
  defaultOn?: boolean;
  label?: string;
}) {
  const [on, setOn] = useState(defaultOn);
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          on ? "border-white bg-white" : "border-white/25 bg-white/5"
        }`}
      >
        <span
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-[left,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            on ? "left-6 bg-black" : "left-1 bg-white/80"
          }`}
        />
      </button>
    </div>
  );
}
