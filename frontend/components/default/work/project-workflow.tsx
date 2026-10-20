import { ArrowUpRight, Workflow } from "lucide-react";
import type { WorkProject } from "./data";
import SectionLabel from "./section-label";

export default function WorkflowSection({ project }: { project: WorkProject }) {
  return (
    <section>
      <SectionLabel number="03">How the workflow fits together</SectionLabel>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl">
            One step leads to the next.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
            This breakdown maps the main idea from the initial input through the
            steps that make the experience useful. It describes the project's
            conceptual workflow, not a claim that every stage has been
            independently benchmarked.
          </p>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[var(--border)] p-4">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
              style={{ background: project.gradient }}
            >
              <Workflow size={21} />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                Workflow map
              </div>
              <div className="mt-1 text-xs text-[var(--text-secondary)]">
                {project.workflow.length} connected stages
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-10 left-[25px] top-10 w-px bg-[var(--border-strong)] sm:left-[29px]" />
          <div className="space-y-3">
            {project.workflow.map((step, index) => (
              <article
                key={step.number}
                className="group relative grid grid-cols-[52px_1fr] gap-3 sm:grid-cols-[60px_1fr] sm:gap-4"
              >
                <div className="relative z-10 flex items-start justify-center pt-5">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] text-sm font-semibold text-[var(--text-primary)] transition duration-300 group-hover:scale-110 group-hover:text-white sm:h-14 sm:w-14"
                    style={{
                      background: index === 0 ? project.gradient : undefined,
                    }}
                  >
                    {step.number}
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-300 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      className="text-[var(--text-tertiary)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                      Output
                    </span>
                    <span className="rounded-full bg-[var(--surface-secondary)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
                      {step.output}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
