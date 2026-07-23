"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OptionCard({
  selected,
  onSelect,
  children,
  className,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={cn(
        "glass relative w-full rounded-2xl p-5 text-left transition-colors duration-200",
        selected
          ? "border-primary/50! bg-primary/10! shadow-[0_0_40px_-12px] shadow-primary/50"
          : "hover:bg-white/[0.06]",
        className
      )}
    >
      <span
        className={cn(
          "absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border transition-all duration-200",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-transparent"
        )}
      >
        <Check className="size-3" />
      </span>
      {children}
    </motion.button>
  );
}
