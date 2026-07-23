"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deletePublishedPage } from "@/lib/store";
import { createClient } from "@/lib/supabase/server";

export async function unpublishPage(slug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS restricts the delete to rows the user owns.
  await deletePublishedPage(supabase, slug);
  revalidatePath("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
