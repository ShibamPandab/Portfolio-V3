"use client";

import { useState, useTransition } from "react";
import { Check, Copy, ExternalLink, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PageSummary } from "@/lib/store";

export function PageCard({
  page,
  onUnpublish,
}: {
  page: PageSummary;
  onUnpublish: (slug: string) => Promise<void>;
}) {
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  const url = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${page.slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="glass flex flex-col gap-4 rounded-2xl bg-card/60 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h3 className="truncate font-medium">{page.brandName}</h3>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {page.headline}
        </p>
        <p className="mt-1.5 font-mono text-xs text-muted-foreground">
          /p/{page.slug} ·{" "}
          {new Date(page.publishedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <Button size="sm" variant="secondary" asChild>
          <a href={`/p/${page.slug}`} target="_blank" rel="noreferrer">
            <ExternalLink className="size-3.5" />
            Open
          </a>
        </Button>
        <Button size="sm" variant="ghost" onClick={handleCopy} title="Copy link">
          {copied ? (
            <Check className="size-3.5 text-primary" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
        {confirming ? (
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="destructive"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  await onUnpublish(page.slug);
                })
              }
            >
              {pending ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
              Confirm
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={pending}
              onClick={() => setConfirming(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => setConfirming(true)}
            title="Unpublish"
          >
            <Trash2 className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
