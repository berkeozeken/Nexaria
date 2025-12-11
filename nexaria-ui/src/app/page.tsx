"use client";

//import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="pb-20">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">

          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Local AI · Llama 3.1 · Privacy-first
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Turn your CV, emails and posts into{" "}
            <span className="underline decoration-emerald-400">sharp professional content</span>{" "}
            with Nexaria.
          </h1>

          <p className="text-zinc-600 dark:text-zinc-300">
            Nexaria runs on a local Llama 3.1 model to optimize your CV, LinkedIn posts,
            emails and cover letters — without leaking your data to external APIs.
          </p>

          <div className="flex items-center gap-3">
            <Link href="/optimize">
              <Button className="h-10 px-5 text-sm bg-zinc-900 hover:bg-zinc-800 text-white 
                dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 shadow">
                Start optimizing
              </Button>
            </Link>

            <a href="#features" className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50">
              Learn more →
            </a>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            No cloud AI costs. No rate limits. Everything runs on your machine.
          </p>
        </div>

        {/* PREVIEW CARD */}
        <div className="hidden md:block">
          <Card className="p-4 space-y-3 shadow-lg border-zinc-200 dark:border-zinc-700 
            bg-white/85 dark:bg-zinc-900/80 backdrop-blur-sm">

            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Preview · CV Optimization
            </p>

            <div className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-3 text-xs space-y-2">
              <p className="font-semibold">Before</p>
              <p>I am a software engineer. I like coding and I did some projects for school.</p>
            </div>

            <div className="rounded-md border border-emerald-200 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 p-3 text-xs space-y-2">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">After (Nexaria)</p>
              <p>
                Software engineer focusing on building reliable web applications with hands-on full-stack project experience.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-5xl mx-auto px-4 pb-12 md:pb-16 space-y-6">
        <h2 className="text-xl font-semibold">What Nexaria can do</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white/85 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold">CV & Resume Optimizer</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Clean and ATS-friendly CV sections without inventing fake experience.
            </p>
          </Card>

          <Card className="p-4 bg-white/85 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold">LinkedIn Post Refiner</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Turn raw thoughts into engaging LinkedIn posts with better hooks.
            </p>
          </Card>

          <Card className="p-4 bg-white/85 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-700">
            <h3 className="font-semibold">Email & Cover Letter Helper</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Rewrite emails and cover letters in a clear and confident tone.
            </p>
          </Card>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 pb-12 space-y-4">
        <h2 className="text-xl font-semibold">Plans (coming soon)</h2>
        <p className="text-zinc-600 dark:text-zinc-300">
          Free basic plan + Pro and Premium tiers with advanced features.
        </p>
      </section>
    </div>
  );
}
