"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Atmosphere() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[1000px] overflow-hidden"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 35, -20, 0],
                y: [0, 30, -15, 0],
                scale: [1, 1.08, 0.96, 1],
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-64 -top-52 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.15),transparent_70%)] blur-3xl"
      />
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -35, 20, 0],
                y: [0, -15, 35, 0],
                scale: [1, 0.94, 1.06, 1],
              }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-64 top-48 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_70%)] blur-3xl"
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
    </div>
  );
}
