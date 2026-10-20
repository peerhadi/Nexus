"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, Check, Code2, MousePointer2 } from "lucide-react";
import { useState } from "react";
import { typeDetails } from "./data";
import SectionHeading from "./section-heading";

export default function BuildDirection() {
  const [selectedType, setSelectedType] = useState("Customer-facing");

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Find your direction"
            title="What are you building?"
            description="The best starting point is the kind of experience you want people to have."
          />
          <div className="mt-8 flex flex-col gap-2">
            {Object.keys(typeDetails).map((type, index) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-4 text-left transition ${
                  selectedType === type
                    ? "border-[var(--accent)] bg-[var(--surface-secondary)]"
                    : "border-[var(--card-border)] hover:bg-[var(--surface-secondary)]"
                }`}
                aria-pressed={selectedType === type}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs tabular-nums text-[var(--text-secondary)]">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium">{type}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  className={
                    selectedType === type
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)]"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[350px] overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[var(--card-border)]" />
          <div className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full border border-[var(--card-border)]" />
          <div className="relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
              {selectedType === "Customer-facing" ? (
                <MousePointer2 size={20} />
              ) : selectedType === "Internal tools" ? (
                <Boxes size={20} />
              ) : (
                <Code2 size={20} />
              )}
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              {selectedType}
            </p>
            <h3 className="mt-3 max-w-lg text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              {typeDetails[selectedType].title}
            </h3>
            <div className="mt-7 space-y-4">
              {typeDetails[selectedType].points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card)]">
                    <Check size={12} />
                  </div>
                  <p className="text-sm leading-6 text-[var(--text-secondary)]">
                    {point}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-9 border-t border-[var(--card-border)] pt-6">
              <Link
                href="/build"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)]"
              >
                Start a project
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
