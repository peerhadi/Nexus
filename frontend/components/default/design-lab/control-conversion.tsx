"use client";

import { ArrowUpRight } from "lucide-react";

export default function ControlConversion({
  showCta,
  setShowCta,
}: {
  showCta: boolean;
  setShowCta: (value: boolean) => void;
}) {
  return (
    <section>
      <label className="mb-3 block text-xs font-semibold text-[var(--text-primary)]">
        06 / Conversion
      </label>

      <button
        onClick={() => setShowCta(!showCta)}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all ${
          showCta
            ? "border-[var(--accent)] bg-[var(--accent-soft)]"
            : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
        }`}
      >
        <span className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              showCta
                ? "bg-[var(--surface)] text-[var(--accent-active)]"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
            }`}
          >
            <ArrowUpRight size={15} />
          </span>
          <span>
            <span className="block text-xs font-medium text-[var(--text-primary)]">
              Call-to-action buttons
            </span>
            <span className="mt-1 block text-[10px] text-[var(--text-secondary)]">
              Hero and contact section
            </span>
          </span>
        </span>

        <span
          className={`relative h-5 w-9 rounded-full transition-colors ${
            showCta
              ? "bg-[var(--accent-active)]"
              : "bg-[var(--surface-muted)]"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-[var(--text-inverse)] shadow-sm transition-all ${
              showCta ? "left-[18px]" : "left-0.5"
            }`}
          />
        </span>
      </button>
    </section>
  );
}
