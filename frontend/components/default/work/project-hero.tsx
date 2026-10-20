import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  CircleDot,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react";
import { BsGithub } from "react-icons/bs";
import type { WorkProject } from "./data";
import ProjectArtwork from "./project-artworks";

export default function ProjectHero({ project }: { project: WorkProject }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 animate-[pulse_7s_ease-in-out_infinite] rounded-full opacity-20 blur-3xl"
        style={{ background: project.gradient }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-[pulse_9s_ease-in-out_infinite] rounded-full opacity-20 blur-3xl"
        style={{ background: project.accentGradient }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-8 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24 mt-5">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]/80 px-4 py-2.5 text-sm text-[var(--text-secondary)] backdrop-blur transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] mt-15"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to all projects
        </Link>

        <div className="mt-2 grid items-center gap-12 lg:mt-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div className="relative z-10">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: project.gradient }}
                />
                {project.category}
              </span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
                {project.status}
              </span>
            </div>

            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              {project.heroEyebrow}
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--text-primary)] sm:text-6xl xl:text-7xl">
              {project.title}
              <span
                className="mt-3 block bg-clip-text text-3xl font-medium leading-tight tracking-[-0.035em] text-[var(--text-secondary)] sm:text-4xl xl:text-5xl"
                style={{
                  backgroundImage: project.gradient,
                  color: "var(--text-secondary)",
                }}
              >
                {project.tagline}
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.repository ? (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] text-white!"
                >
                  <BsGithub size={17} />
                  Explore repository
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                <a
                  href="#case-study"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] text-white!"
                >
                  Explore the case study
                  <ArrowDown
                    size={16}
                    className="transition-transform group-hover:translate-y-1"
                  />
                </a>
              )}
            </div>

            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--border)] pt-5">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <CircleDot size={14} />
                {project.projectType}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Layers3 size={14} />
                {project.focusAreas.length} focus areas
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Workflow size={14} />
                {project.workflow.length}-step workflow
              </div>
            </div>
          </div>

          <div className="relative min-w-0 animate-[fadeIn_900ms_ease-out_both]">
            <div
              className="pointer-events-none absolute -inset-5 rounded-[2rem] opacity-30 blur-2xl"
              style={{ background: project.gradient }}
            />
            <div className="relative">
              <ProjectArtwork project={project} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 px-1">
              <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                <Sparkles size={14} />
                Visual project showcase
              </div>
              <a
                href="#showcase"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Explore the details
                <ArrowDown size={13} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {project.focusAreas.slice(0, 4).map((area, index) => (
            <div
              key={area}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/80 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)]"
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: project.gradient }}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-tertiary)]">
                  AREA / 0{index + 1}
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-[var(--text-tertiary)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
              <div className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                {area}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
