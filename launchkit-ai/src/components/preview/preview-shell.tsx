"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  loadGeneration,
  saveGeneration,
  type GenerationResult,
} from "@/lib/generation";
import { generateLandingPage } from "@/lib/generation-client";
import { publishLandingPage } from "@/lib/publish-client";
import { GeneratedPage } from "@/components/preview/generated-page";
import { PreviewToolbar, type Viewport } from "@/components/preview/toolbar";
import { LoadingOverlay } from "@/components/generate/loading-overlay";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function PreviewShell() {
  const router = useRouter();
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "empty">("loading");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [regenerating, setRegenerating] = useState(false);
  const [regenStage, setRegenStage] = useState(0);
  const [regenError, setRegenError] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadGeneration();
    if (!stored) {
      setStatus("empty");
      router.replace("/generate");
      return;
    }
    // Brief beat so the reveal reads as intentional, not a flash.
    const t = setTimeout(() => {
      setResult(stored);
      setStatus("ready");
    }, 400);
    return () => clearTimeout(t);
  }, [router]);

  const handleRegenerate = useCallback(async () => {
    if (!result) return;
    setRegenerating(true);
    setRegenError(null);
    setRegenStage(0);
    try {
      const next = await generateLandingPage(result.input, setRegenStage);
      saveGeneration(next);
      setResult(next);
      setRegenerating(false);
    } catch (err) {
      setRegenError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }, [result]);

  if (status !== "ready" || !result) {
    return (
      <div className="aurora flex min-h-dvh items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {status === "empty"
              ? "No page yet — taking you to the generator..."
              : "Preparing your preview..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh pb-16">
        <PreviewToolbar
          viewport={viewport}
          onViewportChange={setViewport}
          onRegenerate={handleRegenerate}
          onPublish={() => publishLandingPage(result)}
        />

        <motion.main
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease }}
          className="px-4 pt-6 sm:px-6"
        >
          <motion.div
            layout
            transition={{ duration: 0.45, ease }}
            className={cn(
              "mx-auto overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/40",
              viewport === "desktop" ? "max-w-6xl" : "max-w-[24.375rem]"
            )}
          >
            {/* key remounts on regenerate so new content fades in */}
            <AnimatePresence mode="wait">
              <motion.div
                key={result.generatedAt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GeneratedPage result={result} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Preview of <span className="text-foreground">{result.brand.name}</span>{" "}
            — generated from your idea. Content is mocked until the AI milestone.
          </p>
        </motion.main>

        <AnimatePresence>
          {regenerating && (
            <LoadingOverlay
              stage={regenStage}
              error={regenError}
              onRetry={handleRegenerate}
              onDismiss={() => {
                setRegenerating(false);
                setRegenError(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
