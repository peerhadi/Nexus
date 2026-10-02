"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="relative px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
      <div className="relative mx-auto max-w-[1450px] overflow-hidden rounded-[44px] bg-gradient-to-br from-violet-500 via-fuchsia-400 to-blue-400 px-7 py-28 text-center text-white sm:px-12 lg:py-40">
        <motion.div
          animate={{
            x: [0, 70, -50, 0],
            y: [0, -40, 45, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-[90px]"
        />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
            005 — Your turn
          </p>

          <h2 className="mx-auto mt-10 max-w-6xl text-[clamp(4rem,9vw,9.5rem)] font-black leading-[0.88] tracking-[-0.095em]">
            NOW WE
            <br />
            KNOW EACH
            <br />
            <span className="text-white/35">OTHER.</span>
          </h2>

          <p className="mx-auto mt-12 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            You have the idea. We have the questionable amount of enthusiasm.
            Seems like a reasonable arrangement.
          </p>

          <Link
            href="/build"
            className="group mx-auto mt-10 flex w-fit items-center gap-4 rounded-full bg-white px-7 py-4 text-sm font-bold text-black shadow-2xl transition-all duration-500 hover:scale-105"
          >
            Let's build something
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
