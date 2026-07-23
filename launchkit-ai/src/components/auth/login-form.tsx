"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createClient();

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push(next);
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/confirm?next=${encodeURIComponent(next)}`,
          },
        });
        if (error) throw error;
        // If confirmation is disabled, a session comes back immediately.
        if (data.session) {
          router.push(next);
          router.refresh();
        } else {
          setConfirmSent(true);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setBusy(false);
    }
  };

  if (confirmSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-sm rounded-2xl bg-background/80 p-8 text-center"
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <MailCheck className="size-6" />
        </div>
        <h1 className="mt-4 text-lg font-medium">Check your email</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We sent a confirmation link to{" "}
          <span className="text-foreground">{email}</span>. Click it to finish
          creating your account.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass w-full max-w-sm rounded-2xl bg-background/80 p-8"
    >
      <h1 className="text-lg font-medium">
        {mode === "signin" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {mode === "signin"
          ? "Sign in to publish and manage your pages."
          : "Free forever. Publish your first page in minutes."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-input bg-secondary/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none"
        />
        <input
          type="password"
          required
          minLength={8}
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          placeholder="Password (8+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-input bg-secondary/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none"
        />

        {error && (
          <p className="text-xs leading-relaxed text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" disabled={busy} className="w-full">
          {busy && <Loader2 className="size-4 animate-spin" />}
          {mode === "signin" ? "Sign in" : "Sign up"}
        </Button>
      </form>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className={cn("font-medium text-foreground hover:underline")}
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </motion.div>
  );
}
