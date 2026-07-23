import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, LogOut, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageCard } from "@/components/dashboard/page-card";
import { listOwnPages } from "@/lib/store";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site";
import { signOut, unpublishPage } from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your published LaunchKit AI pages.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const pages = await listOwnPages(supabase, user.id);

  return (
    <div className="aurora relative min-h-dvh overflow-hidden">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </span>
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {user.email}
          </span>
          <form action={signOut}>
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pt-14 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-gradient-brand">
              <LayoutDashboard className="size-4" />
              Your pages
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gradient">
              Dashboard
            </h1>
          </div>
          <Button asChild>
            <Link href="/generate">
              <Plus className="size-4" />
              New page
            </Link>
          </Button>
        </div>

        <div className="mt-10 space-y-3">
          {pages.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="font-medium">No published pages yet</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Generate a landing page and hit Publish — it&apos;ll show up
                here with a shareable link.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/generate">Generate your first page</Link>
              </Button>
            </div>
          ) : (
            pages.map((page) => (
              <PageCard key={page.slug} page={page} onUnpublish={unpublishPage} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
