import { Check, Lightbulb } from "lucide-react";
import type { WorkProject } from "./data";
import SectionLabel from "./section-label";

export default function DeepDive({ project }: { project: WorkProject }) {
  return (
    <section>
      <SectionLabel number="04">Inside the thinking</SectionLabel>
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          The decisions behind the direction.
        </h2>
        <p className="max-w-lg text-sm leading-7 text-[var(--text-secondary)]">
          A closer look at the problem space, product choices, and constraints
          that shape the experience.
        </p>
      </div>

      <div className="space-y-4">
        {project.deepDive.map((section) => (
          <article
            key={section.eyebrow}
            className="group relative grid gap-5 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-300 hover:border-[var(--border-strong)] sm:p-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:p-9"
          >
            <div
              className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
              style={{ background: project.gradient }}
            />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                {section.eyebrow}
              </div>
              <h3 className="mt-4 max-w-lg text-2xl font-semibold leading-tight tracking-tight text-[var(--text-primary)]">
                {section.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {section.description}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                <Lightbulb size={15} />
                Key considerations
              </div>
              <ul className="space-y-3">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]"
                  >
                    <span
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: project.gradient }}
                    >
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
