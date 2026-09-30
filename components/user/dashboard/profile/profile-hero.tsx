"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function ProfileHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[28px] border border-white bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400 p-7 text-white shadow-[0_20px_60px_rgba(168,85,247,0.16)]"
    >
      <motion.div
        animate={{
          x: [0, 50, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-130px] left-[35%] h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 0.95, 1],
          opacity: [0.2, 0.4, 0.2, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-80px] top-[-100px] h-56 w-56 rounded-full bg-pink-200/30 blur-3xl"
      />

      {[...Array(8)].map((_, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 2.5 + index * 0.2,
            repeat: Infinity,
            delay: index * 0.15,
          }}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/60"
          style={{
            left: `${10 + ((index * 19) % 82)}%`,
            top: `${15 + ((index * 27) % 65)}%`,
          }}
        />
      ))}

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <motion.div
          whileHover={{
            scale: 1.06,
            rotate: 3,
          }}
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[28px] border border-white/30 bg-white/20 text-3xl font-black text-white shadow-xl backdrop-blur-xl"
        >
          H
        </motion.div>

        <div>
          <div className="text-3xl font-black tracking-[-0.04em]">Hadi</div>

          <div className="mt-1 text-[11px] font-bold text-white/65">
            Nexus client
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[9px] font-black text-white backdrop-blur-xl">
            <ShieldCheck size={12} />
            Account verified
          </div>
        </div>
      </div>
    </motion.section>
  );
}
