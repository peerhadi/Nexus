import { Boxes, Code2, Layers3, Sparkles } from "lucide-react";
import type { WorkProject } from "./data";
import SectionLabel from "./section-label";

export default function TechnologySection({
  project,
}: {
  project: WorkProject;
}) {
  return (
    <section>
      <SectionLabel number="05">Technology and focus areas</SectionLabel>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            The pieces behind the idea.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
            This breakdown separates named technologies and confirmed project
            details from broader interface concepts. It deliberately avoids
            inventing a framework list or claiming unverified implementation
            details.
          </p>
          <div className="mt-7 rounded-2xl border border-[var(--border)] p-5">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                style={{ background: project.gradient }}
              >
                <Code2 size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  Project profile
                </div>
                <div className="mt-1 text-xs text-[var(--text-secondary)]">
                  {project.projectType}
                </div>
              </div>
            </div>
            <div className="mt-5 h-px bg-[var(--border)]" />
            <div className="mt-4 text-xs leading-6 text-[var(--text-tertiary)]">
              Items marked as design directions describe the case-study
              exploration. They should not be interpreted as a verified list of
              implemented features.
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {project.technologies.map((technology, index) => (
            <article
              key={technology.name}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition group-hover:rotate-[-5deg]"
                  style={{
                    background:
                      index % 2 === 0
                        ? project.gradient
                        : project.accentGradient,
                  }}
                >
                  {index === 0 ? (
                    <Code2 size={19} />
                  ) : index === 1 ? (
                    <Boxes size={19} />
                  ) : index === 2 ? (
                    <Layers3 size={19} />
                  ) : (
                    <Sparkles size={19} />
                  )}
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[9px] font-medium ${
                    technology.verified
                      ? "border-[var(--border)] text-[var(--text-secondary)]"
                      : "border-dashed border-[var(--border-strong)] text-[var(--text-tertiary)]"
                  }`}
                >
                  {technology.verified ? "PROJECT DETAIL" : "DESIGN DIRECTION"}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-[var(--text-primary)]">
                {technology.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {technology.role}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--border)] p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              Project focus map
            </div>
            <div className="mt-1 text-xs text-[var(--text-secondary)]">
              Areas connected to the project's core idea
            </div>
          </div>
          <span className="rounded-full bg-[var(--surface-secondary)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
            {project.focusAreas.length} areas
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {project.focusAreas.map((area, index) => (
            <span
              key={area}
              className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-secondary)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              <span
                className="h-2 w-2 rounded-full transition group-hover:scale-125"
                style={{
                  background:
                    index % 2 === 0 ? project.gradient : project.accentGradient,
                }}
              />
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
