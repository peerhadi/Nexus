"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function VisualWebsite({
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
        animate={
          reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, 1, 0] }
        }
        transition={transition}
        className="relative overflow-hidden rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] shadow-[0_24px_80px_rgba(60,40,100,0.12)]"
      >
        <div className="flex items-center gap-1.5 border-b border-[var(--card-border)] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-rose-300" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          <div className="ml-3 h-2 w-24 rounded-full bg-[var(--surface-secondary)]" />
        </div>
        <div className="grid grid-cols-[1fr_0.8fr] gap-4 p-5 sm:p-6">
          <div className="flex flex-col justify-center py-3">
            <div className="h-2 w-14 rounded-full bg-violet-400/70" />
            <div className="mt-4 h-5 w-full rounded-md bg-[var(--text-primary)]/85" />
            <div className="mt-2 h-5 w-4/5 rounded-md bg-[var(--text-primary)]/65" />
            <div className="mt-4 h-2 w-full rounded-full bg-[var(--surface-secondary)]" />
            <div className="mt-2 h-2 w-4/5 rounded-full bg-[var(--surface-secondary)]" />
            <div className="mt-5 h-8 w-24 rounded-full bg-[var(--accent)]" />
          </div>
          <div className="relative flex min-h-[175px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-300/70 via-fuchsia-200/60 to-sky-200/80">
            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-36 w-36 rounded-full border border-white/80"
            />
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -9, 0], rotate: [0, 8, 0] }
              }
              transition={transition}
              className="relative h-24 w-20 rounded-[18px] border border-white/80 bg-white/50 shadow-xl backdrop-blur-md"
            >
              <div className="absolute left-3 right-3 top-3 h-2 rounded-full bg-violet-400/70" />
              <div className="absolute left-3 right-5 top-8 h-2 rounded-full bg-white/90" />
              <div className="absolute bottom-3 left-3 right-3 h-7 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400" />
            </motion.div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 px-5 pb-5">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-[var(--card-border)] p-3"
            >
              <div className="h-2 w-8 rounded-full bg-violet-300" />
              <div className="mt-3 h-2 rounded-full bg-[var(--surface-secondary)]" />
            </div>
          ))}
        </div>
      </motion.div>
      <div className="absolute -right-3 top-12 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-3 shadow-lg sm:-right-7">
        <Check className="h-5 w-5 text-emerald-500" />
      </div>
    </div>
  );
}
