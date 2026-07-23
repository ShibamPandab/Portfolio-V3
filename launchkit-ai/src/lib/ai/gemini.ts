import { ApiError, GoogleGenAI } from "@google/genai";
import type { GeneratedContent, GenerationInput } from "@/lib/generation";
import {
  buildUserPrompt,
  outputSchema,
  stageMarkers,
  SYSTEM_PROMPT,
} from "@/lib/ai/prompt";
import type {
  GenerationStreamEvent,
  LandingPageProvider,
} from "@/lib/ai/provider";

const DEFAULT_MODEL = "gemini-3.5-flash";
/** Tried automatically when the primary model is overloaded or unavailable. */
const FALLBACK_MODEL = "gemini-flash-lite-latest";

function friendlyGeminiError(err: unknown): Error {
  if (err instanceof ApiError) {
    if (err.status === 503 || err.status === 429) {
      return new Error(
        "The AI model is overloaded right now. Give it a moment and try again."
      );
    }
    if (err.status === 404) {
      return new Error(
        "The configured Gemini model isn't available for this API key. Set GEMINI_MODEL in .env.local to a model you have access to."
      );
    }
    if (err.status === 400 || err.status === 401 || err.status === 403) {
      return new Error(
        "The Gemini API key was rejected. Double-check GEMINI_API_KEY in .env.local."
      );
    }
    return new Error("The AI service returned an error. Please try again.");
  }
  return err instanceof Error ? err : new Error(String(err));
}

/** Overload/availability errors are worth one retry on the fallback model. */
function isRetryable(err: unknown): boolean {
  return (
    err instanceof ApiError &&
    (err.status === 503 || err.status === 429 || err.status === 404)
  );
}

export const geminiProvider: LandingPageProvider = {
  async *generate(
    input: GenerationInput
  ): AsyncGenerator<GenerationStreamEvent> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "The server isn't configured with a Gemini API key yet. Add GEMINI_API_KEY to .env.local and restart."
      );
    }
    const ai = new GoogleGenAI({ apiKey });
    const primaryModel = process.env.GEMINI_MODEL ?? DEFAULT_MODEL;

    yield { type: "stage", stage: 0 };

    // Track the highest stage already emitted so a fallback attempt doesn't
    // rewind the progress UI.
    let stage = 0;

    async function* attempt(
      model: string
    ): AsyncGenerator<GenerationStreamEvent> {
      const stream = await ai.models.generateContentStream({
        model,
        contents: buildUserPrompt(input),
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseJsonSchema: outputSchema,
        },
      });

      let buffer = "";
      for await (const chunk of stream) {
        buffer += chunk.text ?? "";
        for (const { marker, stage: next } of stageMarkers) {
          if (next > stage && buffer.includes(marker)) {
            stage = next;
            yield { type: "stage", stage: next };
          }
        }
      }

      if (!buffer.trim()) {
        throw new Error(
          "The model returned an empty response. Please try again."
        );
      }
      const content = JSON.parse(buffer) as GeneratedContent;
      yield { type: "result", content };
    }

    try {
      yield* attempt(primaryModel);
    } catch (err) {
      if (!isRetryable(err) || primaryModel === FALLBACK_MODEL) {
        throw friendlyGeminiError(err);
      }
      console.warn(
        `[gemini] ${primaryModel} unavailable (${(err as ApiError).status}); retrying with ${FALLBACK_MODEL}`
      );
      try {
        yield* attempt(FALLBACK_MODEL);
      } catch (fallbackErr) {
        throw friendlyGeminiError(fallbackErr);
      }
    }
  },
};
