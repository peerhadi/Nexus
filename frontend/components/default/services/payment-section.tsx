"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

export default function PaymentSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--surface-secondary)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
            04 / Transparent payment
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.07em] sm:text-6xl">
            Two payments. One clear agreement.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            The project scope and price are agreed in advance. You don't pay
            the entire project cost upfront, and the remaining payment is tied
            to completion of the agreed work.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -4 }}
            className="relative overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-[var(--card)] p-7 sm:p-10"
          >
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  To begin
                </span>
                <span className="rounded-full border border-[var(--card-border)] px-3 py-1 text-[10px] font-bold text-[var(--text-secondary)]">
                  Project kickoff
                </span>
              </div>
              <p className="mt-6 text-7xl font-black tracking-[-0.09em] sm:text-8xl">
                30
                <span className="text-4xl text-[var(--text-secondary)]">
                  %
                </span>
              </p>
              <h3 className="mt-5 text-xl font-black">Project advance</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                Paid after the scope, price, and deliverables are agreed. This
                starts the project.
              </p>
              <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                <div className="h-full w-[30%] rounded-full bg-[var(--accent)]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -4 }}
            className="relative overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-[var(--card)] p-7 sm:p-10"
          >
            <div className="absolute -bottom-16 -right-12 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  At completion
                </span>
                <span className="rounded-full border border-[var(--card-border)] px-3 py-1 text-[10px] font-bold text-[var(--text-secondary)]">
                  Final handoff
                </span>
              </div>
              <p className="mt-6 text-7xl font-black tracking-[-0.09em] sm:text-8xl">
                70
                <span className="text-4xl text-[var(--text-secondary)]">
                  %
                </span>
              </p>
              <h3 className="mt-5 text-xl font-black">Remaining balance</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                Paid once the agreed work is complete, before final handoff or
                deployment.
              </p>
              <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                <div className="h-full w-[70%] rounded-full bg-[var(--accent)]" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {[
            "Agreed scope",
            "Clear deliverables",
            "Defined price",
            "Progress updates",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-2.5 text-xs font-semibold text-[var(--text-secondary)]"
            >
              <Check className="h-3.5 w-3.5" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
