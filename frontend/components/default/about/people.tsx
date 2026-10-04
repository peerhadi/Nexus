"use client";

import { motion } from "framer-motion";
import { Cpu, Lightbulb, Sparkles, Terminal } from "lucide-react";

const people = [
  {
    number: "01",
    name: "Hadi Taha",
    role: "Builder / Systems / Ideas",
    description:
      "The person who sees a problem and immediately starts imagining twelve different ways to automate it. Usually responsible for turning 'what if we made...' into something that actually runs.",
    icon: Terminal,
    gradient: "from-violet-500 via-fuchsia-400 to-pink-300",
    fact: "Probably has another project open.",
  },
  {
    number: "02",
    name: "Mohammad Suwaid",
    role: "Engineering / Architecture",
    description:
      "Enjoys making complicated systems behave like simple ones. Cares deeply about how things fit together, occasionally to an unreasonable degree.",
    icon: Cpu,
    gradient: "from-blue-500 via-cyan-400 to-emerald-300",
    fact: "Will notice the one thing nobody else noticed.",
  },
  {
    number: "03",
    name: "Ahmad Abeen",
    role: "Product / Ideas / Execution",
    description:
      "Somewhere between turning vague ideas into actual plans and asking whether something could be made approximately 40% cooler.",
    icon: Lightbulb,
    gradient: "from-orange-400 via-pink-400 to-violet-400",
    fact: "Has opinions about buttons.",
  },
  {
    number: "04",
    name: "Mohammad Izhaan",
    role: "Technology / Experiments",
    description:
      "Likes exploring what happens when you push a system slightly further than it was probably designed to go. Experiments tend to become features.",
    icon: Sparkles,
    gradient: "from-emerald-400 via-cyan-400 to-blue-500",
    fact: "Will absolutely try it just to see what happens.",
  },
];

export default function People() {
  return (
    <section className="relative px-5 pb-36 sm:px-8 lg:px-12 lg:pb-52">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-16 border-b border-[var(--border)] pb-7">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
            001 — The team
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-[-0.07em] sm:text-7xl">
            THE PEOPLE.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {people.map((person, index) => {
            const Icon = person.icon;

            return (
              <motion.article
                key={person.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[36px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm backdrop-blur-xl sm:p-10"
              >
                <div
                  className={`absolute -right-28 -top-28 h-[400px] w-[400px] rounded-full bg-gradient-to-br ${person.gradient} opacity-25 blur-[80px] transition-all duration-700 group-hover:scale-125 group-hover:opacity-55`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-white transition-all duration-500 group-hover:rotate-6">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-xs font-black text-[var(--text-disabled)]">
                      {person.number}
                    </span>
                  </div>

                  <p className="mt-16 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    {person.role}
                  </p>

                  <h3 className="mt-3 text-[clamp(2.7rem,5vw,4.8rem)] font-black leading-[0.9] tracking-[-0.075em]">
                    {person.name}
                  </h3>

                  <p className="mt-7 max-w-xl text-sm leading-7 text-[var(--text-tertiary)] sm:text-base">
                    {person.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 rounded-xl bg-[var(--surface-hover)] px-4 py-3">
                    <Sparkles className="h-4 w-4 text-violet-500" />

                    <span className="text-xs font-semibold text-[var(--text-tertiary)]">
                      {person.fact}
                    </span>
                  </div>
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r ${person.gradient} transition-transform duration-700 group-hover:scale-x-100`}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
