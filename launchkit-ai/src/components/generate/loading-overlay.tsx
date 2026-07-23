"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const messages = [
  "Researching your idea...",
  "Creating brand identity...",
  "Writing copy...",
  "Designing layout...",
  "Finalizing website...",
];

/**
 * Full-screen generation overlay. Controlled: the parent drives `stage`
 * (0–4, from real streaming progress) and passes `error` to switch into the
 * friendly retry state.
 */
export function LoadingOverlay({
  stage,
  error,
  onRetry,
  onDismiss,
}: {
  stage: number;
  error: string | null;
  onRetry: () => void;
  onDismiss: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="aurora fixed inset-0 z-50 flex items-center justify-center bg-background"
      role={error ? "alert" : "status"}
      aria-live="polite"
    >
      {/* breathing glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
        animate={
          reduce || error
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full max-w-sm px-6">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
                <AlertTriangle className="size-7" />
              </div>
              <p className="mt-6 text-lg font-medium">
                That didn&apos;t quite work
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {error}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button onClick={onRetry} className="group">
                  <RefreshCw className="size-4 transition-transform group-hover:rotate-90" />
                  Try again
                </Button>
                <Button variant="ghost" onClick={onDismiss}>
                  Back
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="progress" exit={{ opacity: 0, y: -16 }}>
              <motion.div
                className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary"
                animate={reduce ? undefined : { rotate: [0, 6, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="size-7" />
              </motion.div>

              <p className="mt-6 text-center text-lg font-medium text-gradient">
                Building your landing page
              </p>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                This usually takes under a minute
              </p>

              <ul className="mt-10 space-y-3">
                {messages.slice(0, stage + 1).map((message, i) => {
                  const done = i < stage;
                  return (
                    <motion.li
                      key={message}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm",
                        done && "text-muted-foreground",
                        !done && "border-primary/30!"
                      )}
                    >
                      {done ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex size-5 items-center justify-center rounded-full bg-primary/20 text-primary"
                        >
                          <Check className="size-3" />
                        </motion.span>
                      ) : (
                        <Loader2 className="size-5 animate-spin text-primary" />
                      )}
                      {message}
                    </motion.li>
                  );
                })}
              </ul>

              {/* progress bar */}
              <div className="mt-10 h-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-(--aurora-violet) via-(--aurora-blue) to-(--aurora-cyan)"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${Math.min(((stage + 0.5) / messages.length) * 100, 100)}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
