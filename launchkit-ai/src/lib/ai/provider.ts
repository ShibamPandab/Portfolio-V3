import type { GeneratedContent, GenerationInput } from "@/lib/generation";

/**
 * Provider abstraction for landing-page generation. Each provider streams
 * coarse progress stages (matching the five loading messages in the UI)
 * followed by a single result. Swap providers by implementing this interface
 * and changing the export in `@/lib/ai` — nothing else in the app changes.
 */

/** Indices into the UI's loading-message sequence (0–4). */
export type GenerationStage = 0 | 1 | 2 | 3 | 4;

export type GenerationStreamEvent =
  | { type: "stage"; stage: GenerationStage }
  | { type: "result"; content: GeneratedContent };

export interface LandingPageProvider {
  /** Streams stage events, then exactly one result event. Throws on failure. */
  generate(input: GenerationInput): AsyncGenerator<GenerationStreamEvent>;
}
