import type { WorkProject } from "./data";
import IconFor from "./icon-for";
import SectionLabel from "./section-label";

export default function Capabilities({ project }: { project: WorkProject }) {
  return (
    <section>
      <SectionLabel number="02">What makes it interesting</SectionLabel>
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          More than a single feature.
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
          Each capability represents a different part of the product idea, from
          the core workflow to the details that make the experience easier to
          understand and use.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {project.capabilities.map((capability, index) => (
          <article
            key={capability.number}
            className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)] sm:p-7"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-20"
              style={{
                background:
                  index % 2 === 0 ? project.gradient : project.accentGradient,
              }}
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[var(--shadow-sm)] transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-110"
                  style={{
                    background:
                      index % 2 === 0
                        ? project.gradient
                        : project.accentGradient,
                  }}
                >
                  <IconFor name={capability.icon} size={23} />
                </div>
                <span className="font-mono text-xs text-[var(--text-tertiary)]">
                  / {capability.number}
                </span>
              </div>
              <h3 className="mt-7 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {capability.description}
              </p>
              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <p className="text-xs leading-6 text-[var(--text-tertiary)]">
                  {capability.detail}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
