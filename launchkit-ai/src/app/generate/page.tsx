import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { GenerateWizard } from "@/components/generate/wizard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Generate your page",
  description:
    "Answer five quick questions and let LaunchKit AI build your landing page.",
};

export default function GeneratePage() {
  return (
    <div className="aurora relative min-h-dvh overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(1_0_0/3%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/3%)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <header className="flex items-center justify-center pt-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </span>
          {siteConfig.name}
        </Link>
      </header>
      <main className="px-6 pt-12 pb-24 sm:pt-16">
        <GenerateWizard />
      </main>
    </div>
  );
}
