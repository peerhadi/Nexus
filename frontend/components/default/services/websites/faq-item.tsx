"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--card-border)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--text-secondary)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-[var(--text-secondary)]">
          {answer}
        </p>
      )}
    </div>
  );
}
