"use client";

import { motion } from "framer-motion";

export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 35, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[15%] -top-[15%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.2),transparent_68%)] blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -70, 30, 0],
          y: [0, 50, -35, 0],
          scale: [1, 0.94, 1.08, 1],
        }}
        transition={{
          duration: 27,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[18%] top-[15%] h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_68%)] blur-3xl"
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#111 1px,transparent 1px),linear-gradient(to bottom,#111 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
