"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers3, Orbit } from "lucide-react";

export default function HeroCollectionCard() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative mt-16 overflow-hidden rounded-[30px] border sm:mt-20 sm:rounded-[40px]"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden p-6 sm:p-10 lg:min-h-[350px] lg:p-12">
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-[85px]"
            style={{ background: "var(--glow-primary)" }}
          />
          <div
            className="relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.05em]"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            The collection
          </div>
          <div className="relative mt-12">
            <div className="text-[clamp(3.5rem,7vw,6.8rem)] font-black leading-[0.8] tracking-[-0.05em]">
              Made to
              <br />
              <span style={{ color: "var(--text-muted)" }}>stand out.</span>
            </div>
            <p
              className="mt-6 max-w-sm text-sm leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              Scroll through the work. Every project gets its own visual world.
            </p>
          </div>
        </div>
        <div
          className="relative min-h-[280px] overflow-hidden border-t lg:border-l lg:border-t-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(var(--border-strong)_1px,transparent_1px)] [background-size:20px_20px]" />
          <motion.div
            className="absolute left-[12%] top-[16%] h-36 w-36 rounded-[32px] border"
            style={{
              borderColor: "var(--border-strong)",
              background: "var(--gradient-soft)",
            }}
            animate={
              reducedMotion ? undefined : { rotate: [12, 22, 12], y: [0, -12, 0] }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-[12%] top-[12%] h-28 w-28 rounded-full border"
            style={{
              borderColor: "var(--accent)",
              boxShadow: "0 0 70px var(--hero-glow-primary)",
            }}
            animate={
              reducedMotion
                ? undefined
                : { rotate: [0, 180, 360], scale: [1, 1.08, 1] }
            }
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute inset-[20%] rounded-full border border-dashed"
              style={{ borderColor: "var(--border-strong)" }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-[13%] left-[23%] flex h-24 w-24 items-center justify-center rounded-[26px] shadow-xl"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 18px 60px var(--hero-glow-secondary)",
            }}
            animate={
              reducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, -8, 0] }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Orbit size={35} color="white" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute bottom-[16%] right-[12%] rounded-2xl border p-4 shadow-lg backdrop-blur-xl"
            style={{
              background: "var(--glass-strong)",
              borderColor: "var(--glass-border)",
            }}
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                <Layers3 size={16} />
              </span>
              <div>
                <div className="text-xs font-bold">Made with purpose</div>
                <div
                  className="mt-1 text-[10px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  No two alike
                </div>
              </div>
            </div>
          </motion.div>
          <div
            className="absolute right-5 top-5 text-[9px] font-bold uppercase tracking-[0.05em]"
            style={{ color: "var(--text-muted)" }}
          >
            Nexus / 001—004
          </div>
        </div>
      </div>
    </div>
  );
}
