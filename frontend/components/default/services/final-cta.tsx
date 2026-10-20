"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] border border-[var(--card-border)] bg-[var(--card)] sm:rounded-[42px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.16),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.12),transparent_40%)]"
        />
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-40 -top-48 h-[430px] w-[430px] rounded-full border border-[var(--card-border)]"
        />
        <motion.div
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-20 -top-28 h-[290px] w-[290px] rounded-full border border-dashed border-[var(--card-border)]"
        />

        <div className="relative grid items-center gap-10 px-7 py-14 sm:px-12 sm:py-20 lg:grid-cols-[1fr_auto] lg:px-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              05 / Your move
            </p>
            <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.02em] sm:text-7xl lg:text-8xl">
              Have something
              <br />
              <span className="bg-[var(--gradient-primary)] bg-clip-text tracking-[-0.02em]">
                in mind?
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              Bring the idea, the problem, or the task you want to improve.
              We'll work from there and define a clear starting point.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Link
              href="/build"
              className="group inline-flex items-center gap-4 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-bold !text-white shadow-lg transition-transform hover:-translate-y-1 sm:px-7 sm:py-4"
            >
              Start a project
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
