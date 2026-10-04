"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HeroVisual from "./hero-visual";

export default function Hero() {
  return (
    <section className="relative min-h-screen px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 flex w-fit items-center gap-3 rounded-full border border-black/10 bg-white/65 px-4 py-2.5 shadow-sm backdrop-blur-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
              </span>

              <span className="text-xs font-bold tracking-wide text-black/60">
                We build useful things.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9 }}
              className="max-w-5xl text-[clamp(4rem,9.5vw,9.5rem)] font-black leading-[0.79] tracking-[-0.09em]"
            >
              MAKE
              <br />
              <span className="relative inline-block">
                WORK
                <motion.span
                  animate={{
                    width: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                  className="absolute bottom-[3%] left-0 h-[0.07em] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500"
                />
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent text-[90%]">
                DISAPPEAR.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-10 max-w-xl text-lg leading-8 text-black/50 sm:text-xl"
            >
              Nexus builds automations, applications, and intelligent systems
              that take annoying work out of your day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-10 flex items-center gap-4"
            >
              <Link
                href="build"
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-black/10 bg-white/75 px-5 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-black/15 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,0,0,0.1)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-100 via-fuchsia-100 to-blue-100 transition-transform duration-700 group-hover:translate-x-0" />

                <span className="relative flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111] text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>

                  <span className="text-sm font-bold tracking-[-0.01em]">
                    Tell us what you're trying to fix
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>

          <HeroVisual />
        </div>

        <div className="mt-10 overflow-hidden border-y border-black/[0.08] py-5">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-10 whitespace-nowrap"
          >
            {[...Array(2)].flatMap((_, copy) =>
              [
                "AUTOMATION",
                "APPLICATIONS",
                "INTEGRATIONS",
                "AI SYSTEMS",
                "GOOD IDEAS",
              ].map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-10 text-xs font-bold tracking-[0.22em] text-black/25"
                >
                  {item}
                  <span className="text-black/10">✦</span>
                </span>
              )),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
