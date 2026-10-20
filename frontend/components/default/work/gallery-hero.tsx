"use client";

import { ArrowDown, ArrowDownRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import HeroCollectionCard from "./hero-collection-card";

export default function GalleryHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-[18%] top-[-5%] h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{ background: "var(--glow-primary)" }}
          animate={reducedMotion ? undefined : { x: [0, 45, 0], y: [0, 35, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[16%] top-[8%] h-[580px] w-[580px] rounded-full blur-[110px]"
          style={{ background: "var(--glow-secondary)" }}
          animate={
            reducedMotion ? undefined : { x: [0, -35, 0], y: [0, 28, 0] }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-25%] left-[30%] h-[450px] w-[450px] rounded-full blur-[110px]"
          style={{ background: "var(--glow-tertiary)" }}
          animate={reducedMotion ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-9 flex flex-wrap items-center gap-3 sm:mb-12"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl"
            style={{
              background: "var(--gradient-primary)",
              color: "white",
              boxShadow: "0 8px 32px var(--hero-glow-primary)",
            }}
          >
            <Sparkles size={18} />
          </span>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--text-primary)" }}
            >
              Nexus / Selected work
            </p>
            <p
              className="mt-1 text-[11px]"
              style={{ color: "var(--text-muted)" }}
            >
              Independent ideas, made real
            </p>
          </div>
          <div
            className="ml-auto hidden items-center gap-2 rounded-full border px-4 py-2.5 sm:flex"
            style={{
              borderColor: "var(--border)",
              background: "var(--glass)",
              color: "var(--text-secondary)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{ background: "var(--success)" }}
                animate={
                  reducedMotion
                    ? undefined
                    : { scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="relative h-2 w-2 rounded-full"
                style={{ background: "var(--success)" }}
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
              Built with intent
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1250px] text-[clamp(4rem,11.5vw,10.8rem)] font-black leading-[0.79] tracking-[-0.05em]"
        >
          Ideas become
          <span className="mt-3 block sm:mt-5">
            <span className="relative inline-block">
              <span className="relative z-10">experiences.</span>
              <motion.span
                className="absolute -bottom-[5%] left-0 h-[18%] w-full rounded-full"
                style={{ background: "var(--gradient-primary)", opacity: 0.2 }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              />
            </span>
          </span>
        </motion.h1>

        <div className="mt-12 grid items-end gap-8 sm:mt-16 lg:grid-cols-[1fr_auto] lg:gap-16">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-base leading-8 sm:text-xl sm:leading-9"
            style={{ color: "var(--text-secondary)" }}
          >
            A closer look at what we make.{" "}
            <span style={{ color: "var(--text-muted)" }}>
              Different problems, distinct personalities, one thing in common:
              the details matter.
            </span>
          </motion.p>

          <motion.a
            href="#selected-work"
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={reducedMotion ? undefined : { y: -3 }}
            className="group inline-flex w-fit items-center gap-4 rounded-full px-5 py-3.5 text-sm font-bold transition-shadow"
            style={{
              background: "var(--accent)",
              color: "white",
              boxShadow: "var(--shadow-md)",
            }}
          >
            Explore the work
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0.5">
              <ArrowDown size={17} />
            </span>
          </motion.a>
        </div>

        <HeroCollectionCard />

        <a
          href="#selected-work"
          className="mt-7 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.05em] transition-opacity hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll to discover
          <ArrowDownRight size={15} />
        </a>
      </div>
    </section>
  );
}
