"use client";

import { useState } from "react";
import { ChevronDown, Command } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./reveal";
import { galleryFaqs } from "./gallery-data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(-1);

  return (
    <section className="px-5 pb-28 sm:px-8 sm:pb-36 lg:px-12 lg:pb-44">
      <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <Reveal>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "var(--text-muted)" }}
            >
              Before you go
            </p>
            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">
              Good
              <br />
              questions<span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <p
              className="mt-6 max-w-sm text-sm leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              A few useful details about the work, the code and what comes next.
            </p>
            <div
              className="mt-8 flex items-center gap-3 text-xs font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                <Command size={16} />
              </span>
              Still curious? Get in touch through the build page.
            </div>
          </div>
        </Reveal>

        <div className="space-y-3">
          {galleryFaqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={item.question} delay={index * 0.04}>
                <div
                  className="overflow-hidden rounded-[22px] border transition-colors duration-300 sm:rounded-[26px]"
                  style={{
                    borderColor: isOpen
                      ? "var(--border-strong)"
                      : "var(--border)",
                    background: isOpen ? "var(--card)" : "var(--surface)",
                    boxShadow: isOpen ? "var(--shadow-sm)" : "none",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span
                      className="w-7 shrink-0 text-xs font-bold tabular-nums"
                      style={{ color: "var(--text-muted)" }}
                    >
                      0{index + 1}
                    </span>
                    <span className="flex-1 text-base font-bold tracking-tight sm:text-lg">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: isOpen
                          ? "var(--accent)"
                          : "var(--surface-secondary)",
                        color: isOpen ? "white" : "var(--text-secondary)",
                      }}
                    >
                      <ChevronDown size={17} />
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="max-w-2xl px-5 pb-6 pl-[4.25rem] text-sm leading-7 sm:px-7 sm:pb-7 sm:pl-[5.75rem]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
