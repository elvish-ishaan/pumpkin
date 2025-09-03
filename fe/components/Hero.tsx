"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/90 to-background px-4 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(800px_400px_at_50%_10%,rgba(59,130,246,0.15),transparent),radial-gradient(600px_300px_at_80%_20%,rgba(236,72,153,0.1),transparent)]" />

      <div className="mx-auto max-w-4xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-4 py-1 text-sm text-muted-foreground backdrop-blur">
          <Sparkles className="h-4 w-4 text-primary" /> Forget complex tools, just prompt ✨
        </div>

        <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Edit Images Your Way with <span className="text-primary">Pumpkin AI</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:mt-6">
          No more struggling with heavy, complex editing software. With Pumpkin AI, simply <span className="font-semibold text-foreground">describe what you want</span> and watch your images transform. <br /> From <span className="underline decoration-primary/50 decoration-2">enhancements</span> to <span className="underline decoration-primary/50 decoration-2">style changes</span>, it’s all at your fingertips.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="h-12 rounded-xl px-6 text-base">Get Started Free</Button>
          <Button size="lg" variant="secondary" className="h-12 rounded-xl px-6 text-base" asChild>
            <Link href="#learn-more">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
