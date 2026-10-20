"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import { fitOptions } from "./data";

export default function FindYourFit() {
  const reduceMotion = useReducedMotion();
  const [selectedFit, setSelectedFit] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[var(--surface-secondary)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
            02 / Find your fit
          </p>
          <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">
            Not sure where to start?
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            You don't have to know the technical name for what you need. Start
            with the outcome you're looking for.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-[var(--text-muted)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card)]">
              <ArrowDownRight className="h-4 w-4" />
            </span>
            Choose the closest match
          </div>
        </div>

        <div className="min-w-0">
          <div className="space-y-2">
            {fitOptions.map((option, index) => {
              const Icon = option.icon;
              const selected = selectedFit === index;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setSelectedFit(index)}
                  aria-pressed={selected}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 ${
                    selected
                      ? "border-[var(--accent)] bg-[var(--card)] shadow-md"
                      : "border-[var(--card-border)] bg-[var(--card)]/60 hover:bg-[var(--card)]"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      selected
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold sm:text-base">
                      {option.label}
                    </span>
                    <span className="mt-1 block text-xs text-[var(--text-muted)]">
                      {option.result}
                    </span>
                  </span>
                  <ChevronRight
                    className={`h-5 w-5 shrink-0 transition-transform ${
                      selected
                        ? "translate-x-0.5 text-[var(--accent)]"
                        : "text-[var(--text-muted)]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <motion.div
            key={selectedFit}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 rounded-[24px] border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Your starting point
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight">
              {fitOptions[selectedFit].result}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {fitOptions[selectedFit].description}
            </p>
            <Link
              href={fitOptions[selectedFit].href}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-[var(--accent)]"
            >
              Explore this service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
