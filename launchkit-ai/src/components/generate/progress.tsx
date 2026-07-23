"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function WizardProgress({
  steps,
  current,
  onStepClick,
}: {
  steps: { id: string; label: string }[];
  current: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <nav aria-label="Progress" className="mx-auto w-full max-w-lg">
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li
              key={step.id}
              className={cn("flex items-center", i > 0 && "flex-1")}
            >
              {i > 0 && (
                <div className="relative mx-2 h-px flex-1 bg-border">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary"
                    initial={false}
                    animate={{ width: done || active ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => done && onStepClick?.(i)}
                disabled={!done}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "group flex flex-col items-center gap-2",
                  done && "cursor-pointer"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border text-xs font-medium transition-colors duration-300",
                    active &&
                      "border-primary bg-primary/15 text-primary shadow-[0_0_20px_-4px] shadow-primary/60",
                    done && "border-primary/40 bg-primary text-primary-foreground",
                    !active && !done && "border-border text-muted-foreground"
                  )}
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-[11px] tracking-wide sm:block",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
