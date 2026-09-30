"use client";

import { motion } from "framer-motion";
import { numbers } from "./projects";

export default function Numbers() {
  return (
    <section className="relative overflow-hidden px-5 py-32 sm:px-8 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-16 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/25">
            003 — A few numbers
          </p>

          <h2 className="mt-7 text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.9] tracking-[-0.085em]">
            THE KIND OF
            <br />
            <span className="text-black/15">NUMBERS</span> THAT
            <br />
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
              LOOK GOOD.
            </span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {numbers.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[30px] border border-black/[0.08] bg-white/70 p-8 shadow-sm backdrop-blur-xl sm:p-10"
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-violet-300/40 via-fuchsia-200/30 to-blue-200/30 blur-3xl transition-transform duration-700 group-hover:scale-150" />

              <p className="relative text-7xl font-black tracking-[-0.09em] sm:text-8xl">
                {item.value}
              </p>

              <p className="relative mt-8 text-sm font-black uppercase tracking-[0.15em]">
                {item.label}
              </p>

              <p className="relative mt-3 text-sm leading-6 text-black/35">
                {item.detail}
              </p>

              <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 transition-transform duration-700 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
