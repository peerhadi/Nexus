"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)] px-5 py-36 sm:px-8 lg:px-12 lg:py-52">
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-[15%] top-[15%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16),transparent_68%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1250px] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
          002 — Why we exist
        </p>

        <h2 className="mt-10 text-[clamp(3.7rem,8vw,9rem)] font-black leading-[0.9] tracking-[-0.09em]">
          WE LIKE
          <br />
          <span className="text-[var(--text-disabled)]">MAKING</span>
          <br />
          <span className="bg-[var(--gradient-primary)] bg-clip-text ">
            THINGS REAL.
          </span>
        </h2>

        <p className="mx-auto mt-14 max-w-2xl text-lg leading-8 text-[var(--text-tertiary)]">
          An idea sitting in someone's head is interesting.
          <br />
          An idea running on a server is considerably more interesting.
        </p>

        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-3">
          {[
            "Curiosity",
            "Good software",
            "Ridiculous ideas",
            "Clean interfaces",
            "Late-night debugging",
            "Things that work",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--border)] bg-[var(--background)] px-5 py-3 text-xs font-bold text-[var(--text-tertiary)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
