import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { getNextWorkProject, type WorkProject } from "./data";
import IconFor from "./icon-for";

export default function NextProject({ project }: { project: WorkProject }) {
  const nextProject = getNextWorkProject(project.id);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[var(--border)]">
      <div
        className="absolute inset-0 opacity-80"
        style={{ background: "var(--gradient-soft)" }}
      />
      <div
        className="absolute -right-20 -top-24 h-72 w-72 animate-[pulse_8s_ease-in-out_infinite] rounded-full opacity-20 blur-3xl"
        style={{ background: nextProject.gradient }}
      />
      <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Keep exploring
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
            {project.nextProjectText}
          </p>
          <div className="mt-7 flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white"
              style={{ background: nextProject.gradient }}
            >
              <IconFor
                name={
                  nextProject.visual === "prism"
                    ? "perspectives"
                    : nextProject.visual === "obsidian"
                      ? "workspace"
                      : nextProject.visual === "notifier"
                        ? "calendar"
                        : "systems"
                }
                size={25}
              />
            </div>
            <div>
              <div className="text-xs text-[var(--text-tertiary)]">
                NEXT PROJECT
              </div>
              <h3 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
                {nextProject.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {nextProject.category}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href={`/work/${nextProject.id}`}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] text-white!"
          >
            Explore next project
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
          >
            <Layers3 size={16} />
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
