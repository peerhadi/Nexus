"use client";

import { motion } from "framer-motion";

export function FloatingBlob({
  className,
  color,
  duration = 12,
}: {
  className: string;
  color: string;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{
        x: [0, 35, -25, 0],
        y: [0, -30, 25, 0],
        scale: [1, 1.08, 0.94, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`}
      style={{ background: color }}
    />
  );
}

export function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.028]"
      style={{
        backgroundImage:
          "linear-gradient(to right,#111 1px,transparent 1px),linear-gradient(to bottom,#111 1px,transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
  );
}
