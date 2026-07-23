import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { GeneratedPage } from "@/components/preview/generated-page";
import { getPublishedPage } from "@/lib/store";

export const runtime = "nodejs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedPage(slug);
  if (!page) return { title: "Page not found" };

  const seo = page.result.seo;
  return {
    title: { absolute: seo?.title ?? page.result.brand.name },
    description: seo?.description ?? page.result.hero.subheadline,
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? page.result.brand.name,
      description: seo?.description ?? page.result.hero.subheadline,
      type: "website",
    },
  };
}

export default async function PublishedPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPublishedPage(slug);
  if (!page) notFound();

  return (
    <>
      <GeneratedPage result={page.result} />
      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <Link
          href="/"
          className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <Sparkles className="size-3 text-primary" />
          Made with LaunchKit AI
        </Link>
      </div>
    </>
  );
}
