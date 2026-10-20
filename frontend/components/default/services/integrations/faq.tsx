"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "./data";

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
            Questions, answered
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Before we connect things.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.q}
                className="integration-faq rounded-2xl border border-[var(--card-border)] bg-[var(--card)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-semibold leading-6 sm:text-base">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--card-border)] transition-transform duration-300 ${
                      isOpen ? "rotate-180 border-[var(--accent)]" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <div
                  className={`integration-faq-content ${isOpen ? "is-open" : ""}`}
                >
                  <div className="integration-faq-inner">
                    <p className="integration-muted px-5 pb-5 text-sm leading-7 sm:px-6 sm:pb-6">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
