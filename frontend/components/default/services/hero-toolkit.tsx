"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers3, Rocket } from "lucide-react";
import { services } from "./data";

export default function HeroToolkit() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 25, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[430px] lg:mb-2"
    >
      <div className="absolute -inset-5 rounded-[38px] bg-gradient-to-br from-violet-400/15 via-cyan-300/10 to-pink-300/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-[30px] border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.07)] sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              The bigger picture
            </p>
            <p className="mt-2 text-lg font-black tracking-tight">
              One connected toolkit.
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
            <Layers3 className="h-5 w-5" />
          </div>
        </div>

        <div className="relative my-7 flex items-center justify-center py-4">
          <motion.div
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-48 w-48 rounded-full border border-dashed border-[var(--text-secondary)]/20"
          />
          <motion.div
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-36 w-36 rounded-full border border-[var(--accent)]/20"
          />
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[28px] bg-[var(--accent)] text-white shadow-[0_15px_45px_rgba(99,102,241,0.25)]">
            <Rocket className="h-10 w-10" />
          </div>
          {services.map((service, index) => {
            const Icon = service.icon;
            const positions = [
              "left-[8%] top-0",
              "right-[8%] top-0",
              "left-0 bottom-0",
              "right-0 bottom-0",
              "left-1/2 -translate-x-1/2 -bottom-3",
            ];

            return (
              <motion.div
                key={service.number}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, index % 2 ? 5 : -5, 0] }
                }
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute ${positions[index]} z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-lg`}
              >
                <Icon className="h-5 w-5 text-[var(--text-primary)]" />
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-5 gap-1.5 border-t border-[var(--card-border)] pt-5">
          {services.map((service) => (
            <div key={service.number} className="text-center">
              <p className="text-[10px] font-black text-[var(--text-muted)]">
                {service.number}
              </p>
              <div className="mx-auto mt-2 h-1 w-5 rounded-full bg-[var(--accent)]/60" />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
        Five capabilities. One place to start.
      </p>
    </motion.div>
  );
}
