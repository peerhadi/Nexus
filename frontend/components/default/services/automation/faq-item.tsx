"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-[var(--card-border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="flex items-start gap-4">
          <span className="pt-0.5 text-xs tabular-nums text-[var(--text-secondary)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-medium leading-6 text-[var(--text-primary)]">
            {question}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--text-secondary)] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-8 text-sm leading-7 text-[var(--text-secondary)] sm:pl-10">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
