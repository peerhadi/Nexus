"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-36 sm:px-8 lg:px-12 lg:py-52">
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-[15%] top-[15%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16),transparent_68%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1250px] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/25">
          002 — Why we exist
        </p>

        <h2 className="mt-10 text-[clamp(3.7rem,8vw,9rem)] font-black leading-[0.9] tracking-[-0.09em]">
          WE LIKE
          <br />
          <span className="text-black/15">MAKING</span>
          <br />
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
            THINGS REAL.
          </span>
        </h2>

        <p className="mx-auto mt-14 max-w-2xl text-lg leading-8 text-black/40">
          An idea sitting in someone's head is interesting.
          <br />
          An idea running on a server is considerably more interesting.
        </p>

        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-3">
          {[
            "Curiosity",
            "Good software",
            "Ridiculous ideas",
            "Clean interfaces",
            "Late-night debugging",
            "Things that work",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/[0.07] bg-[#f8f8f6] px-5 py-3 text-xs font-bold text-black/45"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
