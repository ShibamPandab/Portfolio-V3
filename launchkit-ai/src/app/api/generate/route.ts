import Anthropic from "@anthropic-ai/sdk";
import { provider } from "@/lib/ai";
import {
  colorThemes,
  ctaGoals,
  visualStyles,
  type ColorThemeId,
  type CtaGoalId,
  type GenerationInput,
  type GenerationResult,
  type VisualStyleId,
} from "@/lib/generation";

export const runtime = "nodejs";
export const maxDuration = 120;

const IDEA_MAX = 600;
const AUDIENCE_MAX = 120;

const styleIds = new Set(visualStyles.map((s) => s.id));
const themeIds = new Set(colorThemes.map((t) => t.id));
const goalIds = new Set(ctaGoals.map((g) => g.id));

/** Strips control characters and clamps length. */
function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function validate(body: unknown): GenerationInput | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Request body must be a JSON object." };
  }
  const raw = body as Record<string, unknown>;
  const idea = sanitize(raw.idea, IDEA_MAX);
  const audience = sanitize(raw.audience, AUDIENCE_MAX);

  if (idea.length < 10) {
    return { error: "Please describe your idea in at least 10 characters." };
  }
  if (audience.length < 2) {
    return { error: "Please describe your target audience." };
  }
  if (!styleIds.has(raw.style as VisualStyleId)) {
    return { error: "Unknown visual style." };
  }
  if (!themeIds.has(raw.theme as ColorThemeId)) {
    return { error: "Unknown color theme." };
  }
  if (!goalIds.has(raw.ctaGoal as CtaGoalId)) {
    return { error: "Unknown CTA goal." };
  }

  return {
    idea,
    audience,
    style: raw.style as VisualStyleId,
    theme: raw.theme as ColorThemeId,
    ctaGoal: raw.ctaGoal as CtaGoalId,
  };
}

function friendlyError(err: unknown): string {
  if (
    err instanceof Error &&
    /authentication method/i.test(err.message)
  ) {
    return "The server isn't configured with an AI API key yet. Add ANTHROPIC_API_KEY or GEMINI_API_KEY to .env.local and restart.";
  }
  if (err instanceof Anthropic.AuthenticationError) {
    return "The server's AI credentials are missing or invalid.";
  }
  if (err instanceof Anthropic.RateLimitError) {
    return "We're a little busy right now — please try again in a minute.";
  }
  if (err instanceof Anthropic.APIConnectionError) {
    return "Couldn't reach the AI service. Check your connection and retry.";
  }
  if (err instanceof Anthropic.APIError) {
    return "The AI service returned an error. Please try again.";
  }
  if (err instanceof SyntaxError) {
    return "The AI returned an unexpected response. Please try again.";
  }
  return err instanceof Error && err.message
    ? err.message
    : "Something went wrong. Please try again.";
}

/**
 * POST /api/generate — streams newline-delimited JSON:
 *   {"type":"stage","stage":0..4}  progress for the loading overlay
 *   {"type":"result","result":GenerationResult}  exactly once on success
 *   {"type":"error","message":string}  on failure (stream then closes)
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const input = validate(body);
  if ("error" in input) {
    return Response.json({ error: input.error }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: object) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      try {
        for await (const event of provider.generate(input)) {
          if (event.type === "stage") {
            send(event);
          } else {
            const result: GenerationResult = {
              ...event.content,
              input,
              generatedAt: new Date().toISOString(),
            };
            send({ type: "result", result });
          }
        }
      } catch (err) {
        console.error("[api/generate]", err);
        send({ type: "error", message: friendlyError(err) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
