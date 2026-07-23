import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Handles email confirmation links. Supports both the PKCE `code` param and
 * the `token_hash`/`type` template variant, then redirects into the app.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get("next") ?? "/dashboard";
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const supabase = await createClient();
  let ok = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    ok = !error;
  }

  const redirectTo = request.nextUrl.clone();
  redirectTo.search = "";
  redirectTo.pathname = ok ? next : "/login";
  if (!ok) redirectTo.searchParams.set("error", "confirm");
  return NextResponse.redirect(redirectTo);
}
