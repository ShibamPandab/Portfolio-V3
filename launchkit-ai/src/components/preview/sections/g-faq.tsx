"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { GenerationResult } from "@/lib/generation";
import { cn } from "@/lib/utils";

export function GFaq({ faq }: { faq: GenerationResult["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="border-t"
      style={{
        borderColor: "var(--gp-border)",
        backgroundColor: "color-mix(in srgb, var(--gp-card) 55%, var(--gp-bg))",
      }}
    >
      <div className="mx-auto max-w-2xl px-6 py-16 @md:py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight @md:text-4xl">
          Questions, answered
        </h2>
        <div className="mt-10">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.question}
                className="border-b"
                style={{ borderColor: "var(--gp-border)" }}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.question}
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    style={{ color: "var(--gp-muted)" }}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                  )}
                >
                  <p
                    className="min-h-0 overflow-hidden text-sm leading-relaxed"
                    style={{ color: "var(--gp-muted)" }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
