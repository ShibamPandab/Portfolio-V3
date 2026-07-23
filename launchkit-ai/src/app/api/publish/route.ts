import { makeSlug, savePublishedPage } from "@/lib/store";
import { createClient } from "@/lib/supabase/server";
import type { GenerationResult } from "@/lib/generation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 256 * 1024;

/** Light structural check — the payload came from our own generator. */
function isGenerationResult(value: unknown): value is GenerationResult {
  if (typeof value !== "object" || value === null) return false;
  const r = value as Record<string, unknown>;
  return (
    typeof (r.brand as { name?: unknown } | undefined)?.name === "string" &&
    typeof (r.hero as { headline?: unknown } | undefined)?.headline ===
      "string" &&
    Array.isArray(r.features) &&
    Array.isArray(r.pricing) &&
    Array.isArray(r.faq) &&
    typeof r.input === "object" &&
    r.input !== null
  );
}

/**
 * POST /api/publish — persists a generation and returns its public path.
 * Body: GenerationResult. Response: { slug, path }.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json(
      { error: "Please sign in to publish your page." },
      { status: 401 }
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ error: "Page is too large to publish." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isGenerationResult(body)) {
    return Response.json(
      { error: "That doesn't look like a generated page." },
      { status: 400 }
    );
  }

  const slug = makeSlug(body.brand.name);
  await savePublishedPage(supabase, {
    slug,
    result: body,
    publishedAt: new Date().toISOString(),
  });

  return Response.json({ slug, path: `/p/${slug}` });
}
