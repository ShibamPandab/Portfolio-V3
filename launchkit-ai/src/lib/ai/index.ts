import { anthropicProvider } from "@/lib/ai/anthropic";
import { geminiProvider } from "@/lib/ai/gemini";
import type { LandingPageProvider } from "@/lib/ai/provider";

/**
 * Provider selection:
 *  - AI_PROVIDER=anthropic | gemini forces a provider explicitly.
 *  - Otherwise, whichever vendor has an API key configured wins
 *    (Anthropic first if both are set).
 */
function resolveProvider(): LandingPageProvider {
  const forced = process.env.AI_PROVIDER?.toLowerCase();
  if (forced === "gemini") return geminiProvider;
  if (forced === "anthropic") return anthropicProvider;
  if (!process.env.ANTHROPIC_API_KEY && process.env.GEMINI_API_KEY) {
    return geminiProvider;
  }
  return anthropicProvider;
}

/** The active provider. Configured via env — see resolveProvider. */
export const provider: LandingPageProvider = resolveProvider();

export type { GenerationStage, GenerationStreamEvent } from "@/lib/ai/provider";
