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
        className="absolute -left-[18%] -top-[18%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(157,122,255,0.34),rgba(157,122,255,0)_68%)] blur-3xl"
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
        className="absolute -right-[18%] top-[15%] h-[850px] w-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(84,188,255,0.28),rgba(84,188,255,0)_68%)] blur-3xl"
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
        className="absolute bottom-[-25%] left-[20%] h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,166,137,0.25),rgba(255,166,137,0)_68%)] blur-3xl"
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#111 1px,transparent 1px),linear-gradient(to bottom,#111 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
    </div>
  );
}
