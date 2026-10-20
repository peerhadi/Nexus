import { ChevronDown, Command } from "lucide-react";
import type { WorkProject } from "./data";
import SectionLabel from "./section-label";

export default function FAQSection({ project }: { project: WorkProject }) {
  return (
    <section>
      <SectionLabel number="07">Frequently asked questions</SectionLabel>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            A few more details.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            Want to know more about the project, its scope, or what the showcase
            represents? Start here.
          </p>
          <div
            className="mt-7 rounded-2xl border border-[var(--border)] p-5"
            style={{ background: "var(--gradient-soft)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                style={{ background: project.gradient }}
              >
                <Command size={19} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {project.title}
                </div>
                <div className="mt-1 text-xs text-[var(--text-secondary)]">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {project.faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-300 open:border-[var(--border-strong)] open:shadow-[var(--shadow-sm)]"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] transition duration-300 group-open:rotate-180 group-open:bg-[var(--accent-soft)] group-open:text-[var(--accent)]">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <p className="max-w-2xl pt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
