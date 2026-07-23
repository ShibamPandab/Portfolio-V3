import type { GenerationResult } from "@/lib/generation";

/** Publishes a generation and returns the absolute shareable URL. */
export async function publishLandingPage(
  result: GenerationResult
): Promise<string> {
  const response = await fetch("/api/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });

  const data = (await response.json().catch(() => null)) as
    | { path?: string; error?: string }
    | null;

  if (!response.ok || !data?.path) {
    throw new Error(data?.error ?? "Publishing failed. Please try again.");
  }
  return new URL(data.path, window.location.origin).toString();
}
