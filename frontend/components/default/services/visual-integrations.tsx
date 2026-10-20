"use client";

import { motion } from "framer-motion";
import { Code2, Globe2, Layers3, Puzzle, Zap } from "lucide-react";

export default function VisualIntegrations({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 5, repeat: Infinity, ease: "easeInOut" as const };

  return (
  <div className="relative mx-auto flex min-h-[290px] w-full max-w-[390px] items-center justify-center">
    <motion.div
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      className="absolute h-64 w-64 rounded-full border border-dashed border-emerald-400/40"
    />
    <svg
      viewBox="0 0 340 280"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M75 75 L170 140 L265 75 M75 205 L170 140 L265 205"
        stroke="currentColor"
        strokeOpacity=".25"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
    </svg>
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
      transition={transition}
      className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/70 bg-gradient-to-br from-emerald-300 via-cyan-300 to-blue-400 text-white shadow-[0_25px_70px_rgba(16,185,129,0.2)]"
    >
      <Puzzle className="h-10 w-10" />
    </motion.div>
    {[
      { x: "left-[12%] top-[12%]", icon: Globe2 },
      { x: "right-[12%] top-[12%]", icon: DatabaseIcon },
      { x: "left-[12%] bottom-[12%]", icon: Code2 },
      { x: "right-[12%] bottom-[12%]", icon: Zap },
    ].map(({ x, icon: Icon }, index) => (
      <motion.div
        key={index}
        animate={reduceMotion ? undefined : { y: [0, index % 2 ? 6 : -6, 0] }}
        transition={{ ...transition, delay: index * 0.25 }}
        className={`absolute ${x} flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-lg`}
      >
        <Icon className="h-5 w-5 text-emerald-500" />
      </motion.div>
    ))}
  </div>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return <Layers3 className={className} />;
}
