"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MousePointer2, Sparkles } from "lucide-react";
import { useRef } from "react";
import { FloatingBlob, GridBackground } from "./background";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-36 sm:px-8 lg:px-12 lg:pt-44"
    >
      <FloatingBlob
        className="-left-[15%] -top-[15%] h-[700px] w-[700px]"
        color="rgba(167,139,250,0.24)"
        duration={20}
      />

      <FloatingBlob
        className="-right-[12%] top-[5%] h-[750px] w-[750px]"
        color="rgba(56,189,248,0.2)"
        duration={24}
      />

      <FloatingBlob
        className="bottom-[-25%] left-[35%] h-[650px] w-[650px]"
        color="rgba(251,146,60,0.18)"
        duration={18}
      />

      <GridBackground />

      <motion.div
        style={{
          y: heroY,
          scale: heroScale,
          opacity: heroOpacity,
        }}
        className="relative mx-auto w-full max-w-[1450px]"
      >
        <div className="mb-10 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111] text-white shadow-lg"
          >
            <MousePointer2 className="h-4 w-4" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-black/35"
          >
            Selected work / 2026
          </motion.p>
        </div>

        <h1 className="max-w-[1350px] text-[clamp(4.2rem,11vw,11.5rem)] font-black leading-[0.86] tracking-[-0.095em]">
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="block text-[70%] lg:text-[100%]"
          >
            BUILT
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.8 }}
            className="block text-[70%] lg:text-[100%]"
          >
            TO BE
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.8 }}
            className="block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 bg-clip-text pb-2 text-transparent text-[70%] lg:text-[100%]"
          >
            REMEMBERED.
          </motion.span>
        </h1>

        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [-3, 2, -3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[3%] top-[16%] hidden rounded-2xl border border-black/[0.08] bg-white/75 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:block"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-400 text-white">
              <Sparkles className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-black">PRECISION: MAXIMUM</p>
              <p className="mt-1 text-[10px] text-black/35">
                Every pixel accounted for.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[11%] top-[48%] hidden h-32 w-32 rounded-full border border-dashed border-black/10 lg:block"
        >
          <span className="absolute right-0 top-1/2 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.45)]" />
        </motion.div>

        <div className="mt-12 flex max-w-3xl items-end justify-between gap-10">
          <p className="text-lg leading-8 text-black/45 sm:text-xl">
            A collection of systems, applications, experiments, and aggressively
            polished ideas built to prove one thing:
            <span className="font-semibold text-black/65">
              {" "}
              software can be extraordinary.
            </span>
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="hidden shrink-0 lg:block"
          >
            <ArrowDown className="h-10 w-10 text-black/20" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
