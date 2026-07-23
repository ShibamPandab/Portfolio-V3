import { randomBytes } from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { GenerationResult } from "@/lib/generation";

/**
 * Persistence for published pages, backed by Supabase.
 *  - Public reads (serving /p/[slug]) use a shared anon client — RLS allows
 *    select for everyone.
 *  - Writes and listings are owner-scoped: pass the request-bound client from
 *    `@/lib/supabase/server` so RLS sees the signed-in user.
 */

export interface PublishedPage {
  slug: string;
  result: GenerationResult;
  publishedAt: string;
}

export interface PageSummary {
  slug: string;
  brandName: string;
  headline: string;
  publishedAt: string;
}

const SLUG_PATTERN = /^[a-z0-9-]{3,80}$/;
const TABLE = "published_pages";

function supabaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? ""
  );
}
function supabaseKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_KEY ?? ""
  );
}

let anonClient: SupabaseClient | null = null;
function getAnonClient(): SupabaseClient {
  if (!anonClient) {
    anonClient = createClient(supabaseUrl(), supabaseKey(), {
      auth: { persistSession: false },
    });
  }
  return anonClient;
}

/** Public read — anyone can view a published page. */
export async function getPublishedPage(
  slug: string
): Promise<PublishedPage | null> {
  if (!SLUG_PATTERN.test(slug)) return null;
  const { data, error } = await getAnonClient()
    .from(TABLE)
    .select("slug, result, published_at")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[store] select failed:", error.message);
    return null;
  }
  if (!data) return null;
  return {
    slug: data.slug,
    result: data.result as GenerationResult,
    publishedAt: data.published_at,
  };
}

/** Owner-scoped save — RLS requires the client to carry a signed-in user. */
export async function savePublishedPage(
  client: SupabaseClient,
  page: PublishedPage
): Promise<void> {
  const { error } = await client.from(TABLE).insert({
    slug: page.slug,
    result: page.result,
    published_at: page.publishedAt,
  });
  if (error) {
    console.error("[store] insert failed:", error.message);
    throw new Error("Could not save the page. Please try again.");
  }
}

/** Lists the signed-in user's pages, newest first. */
export async function listOwnPages(
  client: SupabaseClient,
  ownerId: string
): Promise<PageSummary[]> {
  // Select RLS is public (pages are public), so filter by owner explicitly.
  const { data, error } = await client
    .from(TABLE)
    .select("slug, result, published_at")
    .eq("owner_id", ownerId)
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[store] list failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => {
    const result = row.result as GenerationResult;
    return {
      slug: row.slug,
      brandName: result.brand?.name ?? row.slug,
      headline: result.hero?.headline ?? "",
      publishedAt: row.published_at,
    };
  });
}

/** Owner-scoped delete — RLS ensures users can only remove their own pages. */
export async function deletePublishedPage(
  client: SupabaseClient,
  slug: string
): Promise<void> {
  if (!SLUG_PATTERN.test(slug)) return;
  const { error } = await client.from(TABLE).delete().eq("slug", slug);
  if (error) {
    console.error("[store] delete failed:", error.message);
    throw new Error("Could not unpublish the page. Please try again.");
  }
}

/** kebab-cases the brand name and appends a short random suffix. */
export function makeSlug(brandName: string): string {
  const base =
    brandName
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "page";
  const suffix = randomBytes(4).toString("hex").slice(0, 6);
  return `${base}-${suffix}`;
}
