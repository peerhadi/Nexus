"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-5 pb-32 pt-36 sm:px-8 lg:px-12 lg:pb-48 lg:pt-48">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-10 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-white"
          >
            <Gamepad2 className="h-5 w-5" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]"
          >
            About / The people behind the pixels
          </motion.p>
        </div>

        <h1 className="max-w-[1400px] text-[clamp(4.3rem,11vw,11.5rem)] font-black leading-[0.86] tracking-[-0.1em]">
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="block"
          >
            FOUR PEOPLE.
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="block text-[var(--text-disabled)]"
          >
            ONE INTERNET.
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="block bg-[var(--gradient-primary)] bg-clip-text pb-3 text-transparent"
          >
            TOO MANY IDEAS.
          </motion.span>
        </h1>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="max-w-3xl text-lg leading-8 text-[var(--text-tertiary)] sm:text-xl"
          >
            Nexus is a small group of builders who like making software,
            breaking software, fixing software, and occasionally staring at
            software wondering why it behaved like that.
            <span className="font-semibold text-[var(--text-secondary)]">
              {" "}
              Mostly, we like building things that should exist.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 lg:justify-end"
          >
            <div className="flex -space-x-3">
              {["H", "S", "A", "I"].map((letter, index) => (
                <motion.div
                  key={letter}
                  whileHover={{
                    y: -7,
                    rotate: index % 2 ? 5 : -5,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#f8f8f6] bg-[var(--surface)] text-sm font-black shadow-sm"
                >
                  {letter}
                </motion.div>
              ))}
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              4 builders
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
