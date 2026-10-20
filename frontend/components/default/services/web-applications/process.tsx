import { ArrowRight, ArrowUpRight } from "lucide-react";
import { stages } from "./data";
import SectionHeading from "./section-heading";
import ServiceLink from "./service-link";

export default function Process() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <SectionHeading
        eyebrow="The process"
        title="From first idea to working software."
        description="A structured process keeps decisions visible, scope understandable, and development focused on the intended outcome."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-5">
        {stages.map((stage, index) => (
          <article
            key={stage.number}
            className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-widest text-[var(--accent)]">
                {stage.number}
              </span>
              {index < stages.length - 1 && (
                <ArrowRight
                  size={15}
                  className="hidden text-[var(--text-secondary)] lg:block"
                />
              )}
            </div>
            <h3 className="mt-7 text-lg font-semibold tracking-tight">
              {stage.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {stage.detail}
            </p>
            <div className="mt-6 border-t border-[var(--card-border)] pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Outcome
              </p>
              <p className="mt-2 text-xs font-medium leading-5 text-[var(--text-primary)]">
                {stage.output}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h3 className="text-lg font-semibold">
            Clear scope. Agreed deliverables.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
            Features, timelines, and handoff expectations are established
            before development begins.
          </p>
        </div>
        <ServiceLink href="/build">
          Start a project
          <ArrowUpRight size={16} />
        </ServiceLink>
      </div>
    </section>
  );
}
