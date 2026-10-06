"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Rocket, Zap } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "MAKE IT USEFUL",
    description:
      "Pretty software is nice. Software that removes an annoying problem is better.",
  },
  {
    icon: Brain,
    title: "MAKE IT SMART",
    description:
      "Good systems should do more than move pixels around. They should make the work itself easier.",
  },
  {
    icon: Code2,
    title: "MAKE IT CLEAN",
    description:
      "The best complexity is the complexity nobody has to think about.",
  },
  {
    icon: Rocket,
    title: "MAKE IT MOVE",
    description:
      "Ideas become valuable when they leave the notes app and become real things.",
  },
];

export default function Values() {
  return (
    <section className="relative px-5 py-36 sm:px-8 lg:px-12 lg:py-48">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-20 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              003 — The operating system
            </p>

            <h2 className="mt-8 text-[clamp(3.8rem,7vw,7.5rem)] font-black leading-[0.86] tracking-[-0.09em]">
              HOW WE
              <br />
              <span className="text-[var(--text-disabled)]">LIKE TO</span>
              <br />
              <span className="bg-[var(--gradient-primary)] bg-clip-text ">
                WORK.
              </span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                  }}
                  whileHover={{
                    y: -6,
                    rotate: index % 2 === 0 ? -1 : 1,
                  }}
                  className="group rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm backdrop-blur-xl transition-shadow duration-500 hover:shadow-xl sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-fuchsia-500">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-10 text-lg font-black tracking-[-0.03em]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
