"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { priorities, priorityDetails } from "./priority-data";
import SectionHeading from "./section-heading";

export default function PrioritySelector() {
  const [selectedPriority, setSelectedPriority] = useState("Business presence");

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="LET'S FIND YOUR STARTING POINT"
            title="What does your website need to achieve?"
            description="Choose the goal closest to your project to explore a practical starting point."
          />

          <p className="mt-5 text-xs leading-6 text-[var(--text-secondary)]">
            This selector is a guide to help frame your project, not an
            automated quote or a technical assessment.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
            SELECT YOUR PRIORITY
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {priorities.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => setSelectedPriority(priority)}
                aria-pressed={selectedPriority === priority}
                className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                  selectedPriority === priority
                    ? "border-[var(--accent)] bg-[var(--selection)] text-[var(--text-primary)]"
                    : "border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {priority}
                {selectedPriority === priority ? (
                  <Check size={16} className="text-[var(--accent)]" />
                ) : (
                  <ArrowUpRight size={15} />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--card-border)] p-5">
            <p className="text-xs text-[var(--text-secondary)]">
              A useful starting point
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
              {priorityDetails[selectedPriority].title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {priorityDetails[selectedPriority].description}
            </p>

            <Link
              href="/build"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold !text-white transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
