"use client";

import { motion } from "framer-motion";
import { Layers3, Zap } from "lucide-react";

export default function VisualApplication({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 5, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className="relative mx-auto w-full max-w-[390px]">
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={transition}
        className="overflow-hidden rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] shadow-[0_24px_80px_rgba(40,90,150,0.12)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--card-border)] px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Layers3 className="h-4 w-4" />
            </div>
            <div className="h-2.5 w-20 rounded-full bg-[var(--text-primary)]/70" />
          </div>
          <div className="h-7 w-7 rounded-full bg-blue-400/20" />
        </div>
        <div className="grid grid-cols-[64px_1fr]">
          <div className="space-y-4 border-r border-[var(--card-border)] p-3">
            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-7 rounded-lg ${
                  item === 1
                    ? "bg-blue-500/15"
                    : "bg-[var(--surface-secondary)]"
                }`}
              />
            ))}
          </div>
          <div className="min-w-0 p-4">
            <div className="h-3 w-28 rounded-full bg-[var(--text-primary)]/75" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[0, 1].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[var(--card-border)] p-3"
                >
                  <div className="h-2 w-10 rounded-full bg-[var(--text-secondary)]/30" />
                  <div className="mt-3 h-5 w-12 rounded-md bg-blue-400/70" />
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-3 rounded-xl border border-[var(--card-border)] p-3">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-blue-400/20" />
                  <div className="h-2 flex-1 rounded-full bg-[var(--surface-secondary)]" />
                  <div className="h-2 w-8 rounded-full bg-blue-300/70" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={
          reduceMotion ? undefined : { y: [0, 6, 0], rotate: [0, -4, 0] }
        }
        transition={transition}
        className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 shadow-lg sm:-left-7"
      >
        <Zap className="h-4 w-4 text-blue-500" />
        <span className="text-xs font-bold">Built around you</span>
      </motion.div>
    </div>
  );
}
