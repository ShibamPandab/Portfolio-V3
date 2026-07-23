"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-6xl rounded-2xl glass">
        <nav className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </span>
            {siteConfig.name}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/generate">Get started</Link>
            </Button>
          </div>

          <button
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        <div
          className={cn(
            "grid overflow-hidden px-4 transition-all duration-300 md:hidden",
            open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
          )}
        >
          <div className="min-h-0">
            <ul className="flex flex-col gap-1 border-t border-border pt-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href="/generate">Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
