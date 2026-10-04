"use client";

import { motion } from "framer-motion";

export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, -30, 0],
          y: [0, -70, 40, 0],
          scale: [1, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[18%] -top-[18%] h-[800px] w-[800px] rounded-full bg-[var(--hero-glow-primary)] blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[18%] top-[15%] h-[850px] w-[850px] rounded-full bg-[var(--hero-glow-secondary)] blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 60, -50, 0],
          y: [0, -30, 70, 0],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-25%] left-[20%] h-[750px] w-[750px] rounded-full bg-[var(--hero-glow-tertiary)] blur-3xl"
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,var(--text-primary) 1px,transparent 1px),linear-gradient(to bottom,var(--text-primary) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
    </div>
  );
}
