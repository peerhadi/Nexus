"use client";

import { motion } from "framer-motion";
import { steps } from "./data";

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-hover)]0 px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              The process
            </p>

            <h2 className="text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.82] tracking-[-0.08em]">
              SIMPLE
              <br />
              <span className="text-[var(--text-disabled)]">ON PURPOSE.</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[var(--surface-hover)]" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.6,
                  }}
                  className="group relative flex items-center gap-7"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-black shadow-sm"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.div>

                  <div className="rounded-2xl border border-transparent px-5 py-4 transition-all duration-300 group-hover:border-[var(--border)] group-hover:bg-[var(--surface)] group-hover:shadow-sm">
                    <p className="text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                      {step}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
