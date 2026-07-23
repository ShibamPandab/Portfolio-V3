import type { GenerationInput, GenerationResult } from "@/lib/generation";

/**
 * Calls /api/generate and reads its NDJSON stream, invoking `onStage` as the
 * server reports progress (0–4, matching the loading overlay messages).
 * Resolves with the finished result or throws with a user-friendly message.
 */
export async function generateLandingPage(
  input: GenerationInput,
  onStage: (stage: number) => void
): Promise<GenerationResult> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(
      (data as { error?: string } | null)?.error ??
        "The generator is unavailable right now. Please try again."
    );
  }
  if (!response.body) {
    throw new Error("Streaming is not supported in this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let result: GenerationResult | null = null;

  const handleLine = (line: string) => {
    if (!line.trim()) return;
    const event = JSON.parse(line) as
      | { type: "stage"; stage: number }
      | { type: "result"; result: GenerationResult }
      | { type: "error"; message: string };
    if (event.type === "stage") onStage(event.stage);
    else if (event.type === "result") result = event.result;
    else throw new Error(event.message);
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let newline;
    while ((newline = buffer.indexOf("\n")) >= 0) {
      handleLine(buffer.slice(0, newline));
      buffer = buffer.slice(newline + 1);
    }
  }
  handleLine(buffer);

  if (!result) {
    throw new Error("The generation ended unexpectedly. Please try again.");
  }
  return result;
}
