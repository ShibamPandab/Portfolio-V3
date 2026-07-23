"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  Monitor,
  RefreshCw,
  Rocket,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Viewport = "desktop" | "mobile";

type PublishState =
  | { status: "idle" }
  | { status: "publishing" }
  | { status: "published"; url: string }
  | { status: "error"; message: string };

export function PreviewToolbar({
  viewport,
  onViewportChange,
  onRegenerate,
  onPublish,
}: {
  viewport: Viewport;
  onViewportChange: (v: Viewport) => void;
  onRegenerate: () => void;
  onPublish: () => Promise<string>;
}) {
  const [publish, setPublish] = useState<PublishState>({ status: "idle" });
  const [copied, setCopied] = useState(false);

  const handlePublish = async () => {
    setPublish({ status: "publishing" });
    setCopied(false);
    try {
      const url = await onPublish();
      setPublish({ status: "published", url });
    } catch (err) {
      setPublish({
        status: "error",
        message:
          err instanceof Error ? err.message : "Publishing failed. Please try again.",
      });
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the URL is still visible to select */
    }
  };

  return (
    <div className="sticky top-0 z-40 px-4 pt-4">
      <div className="glass mx-auto flex h-14 max-w-4xl items-center justify-between gap-2 rounded-2xl px-3">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/generate">
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back to editor</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={onRegenerate}>
            <RefreshCw className="size-4" />
            <span className="hidden sm:inline">Regenerate</span>
          </Button>
        </div>

        <div
          className="flex items-center rounded-lg border border-border p-0.5"
          role="group"
          aria-label="Preview viewport"
        >
          {(
            [
              { id: "desktop", icon: Monitor, label: "Desktop" },
              { id: "mobile", icon: Smartphone, label: "Mobile" },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              onClick={() => onViewportChange(option.id)}
              aria-pressed={viewport === option.id}
              title={option.label}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                viewport === option.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <option.icon className="size-3.5" />
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Button
            size="sm"
            onClick={handlePublish}
            disabled={publish.status === "publishing"}
            className="group"
          >
            {publish.status === "publishing" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : publish.status === "published" ? (
              <Check className="size-4" />
            ) : (
              <Rocket className="size-4 transition-transform group-hover:-translate-y-0.5" />
            )}
            {publish.status === "published" ? "Published" : "Publish"}
          </Button>

          <AnimatePresence>
            {(publish.status === "published" || publish.status === "error") && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="glass absolute right-0 top-full z-50 mt-2 w-72 rounded-xl bg-background/90 p-4 text-sm"
              >
                {publish.status === "published" ? (
                  <>
                    <p className="flex items-center gap-2 font-medium">
                      <Rocket className="size-4 text-primary" />
                      Your page is live
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-2">
                      <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
                        {publish.url}
                      </span>
                      <button
                        onClick={() => handleCopy(publish.url)}
                        title="Copy link"
                        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {copied ? (
                          <Check className="size-3.5 text-primary" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="secondary" className="flex-1" asChild>
                        <a href={publish.url} target="_blank" rel="noreferrer">
                          <ExternalLink className="size-3.5" />
                          Open page
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPublish({ status: "idle" })}
                      >
                        Close
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="flex items-center gap-2 font-medium">
                      <AlertTriangle className="size-4 text-destructive" />
                      Publishing failed
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {publish.message}
                    </p>
                    <div className="mt-3 flex gap-2">
                      {/sign in/i.test(publish.message) ? (
                        <Button size="sm" className="flex-1" asChild>
                          <Link href="/login?next=/preview">Sign in</Link>
                        </Button>
                      ) : (
                        <Button size="sm" onClick={handlePublish} className="flex-1">
                          Try again
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPublish({ status: "idle" })}
                      >
                        Close
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
