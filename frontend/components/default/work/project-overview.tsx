import type { WorkProject } from "./data";
import IconFor from "./icon-for";
import SectionLabel from "./section-label";

export default function ProjectOverview({ project }: { project: WorkProject }) {
  return (
    <section id="case-study" className="scroll-mt-24">
      <SectionLabel number="01">Project overview</SectionLabel>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl">
            The thinking behind the project.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
            {project.overview}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.galleryLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-[var(--border)] px-3 py-2 text-xs text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {project.principles.map((principle, index) => (
            <article
              key={principle.title}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
            >
              <div
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-30"
                style={{ background: project.gradient }}
              />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                    style={{
                      background:
                        index % 2 === 0
                          ? project.gradient
                          : project.accentGradient,
                    }}
                  >
                    <IconFor
                      name={
                        index === 0
                          ? "focus"
                          : index === 1
                            ? "structure"
                            : index === 2
                              ? "perspectives"
                              : "growth"
                      }
                    />
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {principle.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
