"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden px-5 py-40 text-center sm:px-8 lg:py-56">
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(139,92,246,0.18),rgba(236,72,153,0.12),rgba(59,130,246,0.18),rgba(139,92,246,0.18))] blur-[80px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-[clamp(3.2rem,8vw,8.5rem)] font-black leading-[0.86] tracking-[-0.085em]">
          GOOD SOFTWARE
          <br />
          <span className="text-[var(--text-disabled)]">SHOULD FEEL</span>
          <br />
          <span className="bg-[var(--gradient-primary)] bg-clip-text ">
            LIKE MAGIC.
          </span>
        </p>

        <p className="mx-auto mt-14 max-w-2xl text-lg leading-8 text-[var(--text-tertiary)]">
          Not because it's complicated. Because someone took the complicated
          part away.
        </p>
      </div>
    </section>
  );
}
