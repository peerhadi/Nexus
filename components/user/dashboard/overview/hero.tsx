"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";

export default function OverviewHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[30px] border border-white bg-gradient-to-br from-violet-500 via-fuchsia-400 to-pink-400 px-6 py-9 text-white shadow-[0_20px_60px_rgba(168,85,247,0.18)] lg:px-10 lg:py-11"
    >
      <motion.div
        animate={{
          x: [0, 100, -40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-24 -top-32 h-[360px] w-[360px] rounded-full bg-cyan-300/35 blur-[80px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.8, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-180px] left-[25%] h-[380px] w-[380px] rounded-full bg-orange-300/35 blur-[90px]"
      />

      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[30%] top-[-180px] h-[300px] w-[300px] rounded-full bg-pink-200/25 blur-[80px]"
      />

      {[...Array(12)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 2.5 + index * 0.2,
            repeat: Infinity,
            delay: index * 0.15,
          }}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/50"
          style={{
            left: `${8 + ((index * 17) % 88)}%`,
            top: `${15 + ((index * 23) % 70)}%`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/70"
        >
          <Sparkles size={13} />
          Your Nexus workspace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-5xl"
        >
          Good evening,
          <br />
          <span className="text-white">Hadi.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 max-w-xl text-sm leading-7 text-white/75"
        >
          Two projects are currently moving through the Nexus pipeline. Here’s
          everything happening with them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-7 flex flex-wrap gap-3"
        >
          <Link
            href="/dashboard/projects"
            className="group flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-[11px] font-black text-violet-600 shadow-lg shadow-violet-900/10 transition hover:-translate-y-1 hover:shadow-xl"
          >
            View projects
            <ArrowUpRight
              size={14}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            href="/dashboard/messages"
            className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/15 px-4 py-3 text-[11px] font-black text-white backdrop-blur-xl transition hover:bg-white/25"
          >
            <MessageCircle size={14} />
            Message us
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
