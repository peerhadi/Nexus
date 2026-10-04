"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export default function InternetEnergy() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-secondary)] px-5 py-36 sm:px-8 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1100px] text-center">
        <motion.div
          animate={{
            rotate: [0, 4, -4, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-[var(--surface)] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        >
          <Coffee className="h-8 w-8" />
        </motion.div>

        <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
          004 — Completely necessary information
        </p>

        <h2 className="mt-8 text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.9] tracking-[-0.09em]">
          WE ARE
          <br />
          <span className="bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            VERY NORMAL.
          </span>
        </h2>

        <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-[var(--text-tertiary)]">
          We definitely don't spend an unreasonable amount of time deciding
          whether a button should move 2px when you hover it.
          <br />
          <span className="font-semibold text-[var(--text-secondary)]">
            That would be ridiculous.
          </span>
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            "100% real people",
            "0% corporate jargon",
            "Questionable sleep schedules",
            "Suspiciously many tabs",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-bold text-[var(--text-tertiary)] shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
