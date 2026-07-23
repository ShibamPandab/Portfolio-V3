"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="aurora relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(1_0_0/3%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/3%)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
          >
            <Sparkles className="size-3 text-primary" />
            Now in public beta
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-gradient sm:text-6xl md:text-7xl"
        >
          Your startup idea, live on the web in{" "}
          <span className="text-gradient-brand">60 seconds</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Describe your idea in one sentence. LaunchKit AI writes the copy,
          designs the page, and ships a production-ready landing page — before
          your coffee gets cold.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" className="group w-full sm:w-auto" asChild>
            <Link href="/generate">
              Generate my page
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" className="w-full sm:w-auto">
            <Zap className="size-4" />
            See a live example
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          No credit card required · Free plan forever
        </motion.p>

        {/* Product frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.45 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="absolute -inset-x-8 -top-8 -z-10 h-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="border-glow glass overflow-hidden rounded-2xl p-2">
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="ml-3 rounded-md bg-secondary px-3 py-1 font-mono text-[10px] text-muted-foreground">
                  yourstartup.launchkit.ai
                </span>
              </div>
              <div className="space-y-4 p-8 text-left sm:p-12">
                <div className="h-3 w-24 rounded-full bg-primary/40" />
                <div className="h-6 w-3/4 rounded-full bg-white/15" />
                <div className="h-6 w-1/2 rounded-full bg-white/10" />
                <div className="h-3 w-2/3 rounded-full bg-white/5" />
                <div className="flex gap-3 pt-2">
                  <div className="h-9 w-28 rounded-lg bg-primary/50" />
                  <div className="h-9 w-28 rounded-lg bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
