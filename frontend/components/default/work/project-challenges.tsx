import { Lightbulb } from "lucide-react";
import type { WorkProject } from "./data";
import SectionLabel from "./section-label";

export default function ChallengesSection({
  project,
}: {
  project: WorkProject;
}) {
  return (
    <section>
      <SectionLabel number="06">Challenges and approaches</SectionLabel>
      <div className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          The interesting part is solving the problem.
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
          These are the key problem areas and design approaches represented by
          this case study. They are not fabricated claims about measured
          outcomes or completed performance improvements.
        </p>
      </div>
      <div className="space-y-3">
        {project.challenges.map((challenge, index) => (
          <article
            key={challenge.title}
            className="group grid gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-300 hover:border-[var(--border-strong)] sm:p-6 lg:grid-cols-[48px_0.85fr_1fr]"
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold text-white"
              style={{
                background:
                  index % 2 === 0 ? project.gradient : project.accentGradient,
              }}
            >
              0{index + 1}
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {challenge.title}
              </h3>
              <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                The problem
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {challenge.problem}
              </p>
            </div>
            <div className="rounded-xl bg-[var(--surface-secondary)]/70 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                <Lightbulb size={14} />
                The approach
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {challenge.approach}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
