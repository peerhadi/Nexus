"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import HeroToolkit from "./hero-toolkit";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28 lg:pt-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.6fr] lg:gap-20">
          <div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-2.5 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:text-xs">
                Nexus / Services
              </span>
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="max-w-5xl text-[clamp(3.8rem,9.4vw,9rem)] font-black leading-[0.88] tracking-[-0.09em]"
            >
              GOOD IDEAS.
              <br />
              <span className="bg-[var(--gradient-primary)] bg-clip-text pb-2">
                BUILT PROPERLY.
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-8 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8"
            >
              Websites, applications, automation, AI, and integrations. We
              turn problems and ideas into digital tools designed to do
              something useful.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="/build"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-bold !text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-6 py-3.5 text-sm font-bold transition-colors hover:bg-[var(--surface-secondary)]"
              >
                Explore services
                <ArrowDownRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <HeroToolkit />
        </div>

        <div className="mt-20 grid grid-cols-2 gap-3 border-t border-[var(--card-border)] pt-6 sm:grid-cols-4 sm:gap-5 lg:mt-28">
          {[
            ["01", "Understand the problem"],
            ["02", "Define the scope"],
            ["03", "Build the solution"],
            ["04", "Deliver the work"],
          ].map(([number, label]) => (
            <div key={number} className="flex items-center gap-3 py-2">
              <span className="text-xs font-black text-[var(--text-muted)]">
                {number}
              </span>
              <span className="text-xs font-semibold text-[var(--text-secondary)] sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
