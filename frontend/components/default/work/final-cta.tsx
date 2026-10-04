"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
      <div className="relative mx-auto max-w-[1450px] overflow-hidden rounded-[44px] bg-[var(--gradient-hero)] px-7 py-28 text-center text-white sm:px-12 lg:py-40">
        <motion.div
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.12, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--surface)]/15 blur-[90px]"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
        />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
            005 — Your turn
          </p>

          <h2 className="mx-auto mt-10 max-w-6xl text-[clamp(4rem,9vw,9.5rem)] font-black leading-[0.88] tracking-[-0.095em] lg:text-[400%] text-[300%]!">
            BRING US
            <br />
            SOMETHING
            <br />
            <span className="text-white/35">IMPOSSIBLE.</span>
          </h2>

          <p className="mx-auto mt-12 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            A strange idea. A painful workflow. A completely unreasonable
            product concept. If it can be built, we want to hear about it.
          </p>

          <Link
            href="/build"
            className="group mx-auto mt-10 flex w-fit items-center gap-4 rounded-full bg-[var(--surface)] px-7 py-4 text-sm font-bold text-[var(--text-primary)] shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.25)]"
          >
            Start something great
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-white/40">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--surface)]" />
            Currently building something excellent.
          </div>
        </div>
      </div>
    </section>
  );
}
