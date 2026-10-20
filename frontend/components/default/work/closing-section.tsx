"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./reveal";

export default function ClosingSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12 lg:pb-40">
      <Reveal>
        <div
          className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[32px] border sm:rounded-[44px]"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface-secondary)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -right-[10%] -top-[55%] h-[520px] w-[520px] rounded-full blur-[100px]"
              style={{ background: "var(--glow-primary)" }}
              animate={
                reducedMotion ? undefined : { x: [0, -35, 0], y: [0, 25, 0] }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-[65%] left-[8%] h-[560px] w-[560px] rounded-full blur-[100px]"
              style={{ background: "var(--glow-secondary)" }}
              animate={reducedMotion ? undefined : { x: [0, 40, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
          <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20 lg:p-16">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--glass)",
                  color: "var(--text-secondary)",
                }}
              >
                <Sparkles size={13} style={{ color: "var(--accent)" }} />
                Your idea could be next
              </div>
              <h2 className="mt-8 max-w-4xl text-[clamp(3.3rem,8vw,8rem)] font-black leading-[0.85] tracking-[-0.09em]">
                Have an idea?
                <span
                  className="mt-2 block"
                  style={{ color: "var(--text-muted)" }}
                >
                  Let&apos;s make it.
                </span>
              </h2>
              <p
                className="mt-7 max-w-xl text-sm leading-7 sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                Tell us what you are imagining. We can figure out the right way
                to build it together.
              </p>
            </div>
            <Link
              href="/build"
              className="group inline-flex w-fit items-center gap-4 rounded-full px-6 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--accent)",
                color: "white",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              Start a project
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
