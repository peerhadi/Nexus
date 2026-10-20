"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { process } from "./data";

export default function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              03 / The process
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
              Clear steps.
              <br />
              <span className="text-[var(--text-secondary)]">
                No guesswork.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              From the first conversation to the final handoff, the goal is
              simple: agree on the work, build it, and make sure you know
              what's happening along the way.
            </p>
            <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Agreed before we build</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Scope, deliverables, and price
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[var(--card-border)]" />
            <div className="space-y-3">
              {process.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="group relative flex gap-4 sm:gap-5"
                  >
                    <div className="relative z-10 flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-sm transition-colors group-hover:border-[var(--accent)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mb-1 min-w-0 flex-1 rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] p-5 transition-colors group-hover:bg-[var(--surface-secondary)] sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base font-black tracking-tight sm:text-lg">
                          {step.title}
                        </h3>
                        <span className="text-[10px] font-black tracking-wider text-[var(--text-muted)]">
                          {step.number}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
