"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function VisualAi({
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
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute h-64 w-64 rounded-[35%] border border-orange-400/30"
      />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute h-48 w-48 rounded-[35%] border border-pink-400/40"
      />
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.06, 1], rotate: [0, 4, 0] }
        }
        transition={transition}
        className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/70 bg-gradient-to-br from-orange-300 via-pink-400 to-violet-400 text-white shadow-[0_25px_70px_rgba(236,72,153,0.25)]"
      >
        <Bot className="h-12 w-12" />
      </motion.div>
      {["01", "10", "AI", "✳", "↗", "•••"].map((item, index) => (
        <motion.div
          key={item + index}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, index % 2 ? 8 : -8, 0],
                  opacity: [0.5, 1, 0.5],
                }
          }
          transition={{ ...transition, delay: index * 0.3 }}
          className={`absolute flex h-9 min-w-9 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-2 text-xs font-bold text-[var(--text-secondary)] shadow-md ${
            [
              "left-[12%] top-[12%]",
              "right-[12%] top-[16%]",
              "left-[3%] top-[52%]",
              "right-[5%] top-[55%]",
              "bottom-[10%] left-[25%]",
              "bottom-[8%] right-[24%]",
            ][index]
          }`}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
