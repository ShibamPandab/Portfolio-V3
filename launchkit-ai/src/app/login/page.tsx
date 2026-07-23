import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to publish and manage your LaunchKit AI pages.",
};

export default function LoginPage() {
  return (
    <div className="aurora relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6">
      <Link href="/" className="mb-8 flex items-center gap-2 font-semibold">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Sparkles className="size-4" />
        </span>
        {siteConfig.name}
      </Link>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
