import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  Code2,
  Command,
  ExternalLink,
  Eye,
  GitBranch,
  Layers3,
  Lightbulb,
  Orbit,
  PanelsTopLeft,
  Play,
  Radio,
  Rss,
  ScanLine,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import {
  getNextWorkProject,
  getWorkProject,
  workProjects,
  type WorkProject,
} from "../data";
import { BsGithub } from "react-icons/bs";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return workProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getWorkProject(id);

  if (!project) {
    return { title: "Project not found | Nexus" };
  }

  return {
    title: `${project.title} | Nexus`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Nexus`,
      description: project.description,
      type: "article",
    },
  };
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)]">
        {number}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
        {children}
      </span>
      <div className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}

function IconFor({ name, size = 20 }: { name: string; size?: number }) {
  const props = { size, strokeWidth: 1.7 };

  switch (name) {
    case "feeds":
      return <Rss {...props} />;
    case "classify":
      return <Layers3 {...props} />;
    case "perspectives":
      return <Orbit {...props} />;
    case "reading":
      return <BookOpen {...props} />;
    case "workspace":
      return <PanelsTopLeft {...props} />;
    case "browser":
      return <Eye {...props} />;
    case "projects":
      return <Boxes {...props} />;
    case "focus":
      return <ScanLine {...props} />;
    case "message":
      return <Radio {...props} />;
    case "extract":
      return <Sparkles {...props} />;
    case "structure":
      return <Workflow {...props} />;
    case "calendar":
      return <CalendarDays {...props} />;
    case "systems":
      return <Command {...props} />;
    case "scene":
      return <Orbit {...props} />;
    case "growth":
      return <GitBranch {...props} />;
    default:
      return <Zap {...props} />;
  }
}

function VisualShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-xl)] ${className}`}
    >
      {children}
    </div>
  );
}

function PrismArtwork() {
  const articles = [
    {
      source: "FIELD NOTES",
      title: "Why the way we organize information changes what we notice",
      category: "Ideas",
      time: "06 MIN",
      mark: "01",
    },
    {
      source: "SIGNAL / CULTURE",
      title: "The overlooked connections between technology and everyday life",
      category: "Technology",
      time: "04 MIN",
      mark: "02",
    },
    {
      source: "OPEN PERSPECTIVE",
      title: "One subject, different questions, a broader picture",
      category: "Perspectives",
      time: "08 MIN",
      mark: "03",
    },
  ];

  return (
    <VisualShell>
      <img src="/screenshots/projects/prism/home.png" />
    </VisualShell>
  );
}

function ObsidianArtwork() {
  const projects = [
    { name: "Website refresh", type: "Design", count: "06" },
    { name: "Research notes", type: "Reference", count: "12" },
    { name: "Next release", type: "Planning", count: "04" },
  ];

  return (
    <VisualShell className="max-h-[570px]">
      <div
        className="relative overflow-hidden rounded-[inherit] flex justify-center"
        style={{
          background:
            "linear-gradient(135deg,#090014 0%,#190038 35%, #310078 68%, #130024 100%)",
        }}
      >
        <img
          src="/screenshots/projects/obsidian/home.png"
          style={{ maxHeight: "570px" }}
        />
      </div>
    </VisualShell>
  );
}

function NotifierArtwork() {
  return (
    <VisualShell className="min-h-[570px]">
      <img
        src="/screenshots/projects/notifier/home.png"
        style={{ minHeight: "600px" }}
      />
    </VisualShell>
  );
}

function EngineArtwork() {
  const stars = Array.from({ length: 18 }, (_, index) => ({
    left: `${(index * 37 + 11) % 96}%`,
    top: `${(index * 23 + 7) % 88}%`,
    delay: `${(index % 7) * 0.35}s`,
  }));

  return (
    <VisualShell className="min-h-[570px]">
      <img src="/screenshots/projects/engine/home.png" />
    </VisualShell>
  );
}

function ProjectArtwork({ project }: { project: WorkProject }) {
  switch (project.visual) {
    case "prism":
      return <PrismArtwork />;
    case "obsidian":
      return <ObsidianArtwork />;
    case "notifier":
      return <NotifierArtwork />;
    case "engine":
      return <EngineArtwork />;
    default:
      return null;
  }
}

function ProjectHero({ project }: { project: WorkProject }) {
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

function ProjectOverview({ project }: { project: WorkProject }) {
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

function Capabilities({ project }: { project: WorkProject }) {
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

function WorkflowSection({ project }: { project: WorkProject }) {
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

function DeepDive({ project }: { project: WorkProject }) {
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
        {project.deepDive.map((section, index) => (
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

function TechnologySection({ project }: { project: WorkProject }) {
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

function ChallengesSection({ project }: { project: WorkProject }) {
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

function FAQSection({ project }: { project: WorkProject }) {
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

function NextProject({ project }: { project: WorkProject }) {
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

export default async function WorkProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = getWorkProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="nexus-page min-h-screen overflow-hidden">
      <ProjectHero project={project} />

      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="space-y-20 sm:space-y-24 lg:space-y-28">
          <ProjectOverview project={project} />
          <Capabilities project={project} />
          <WorkflowSection project={project} />
          <DeepDive project={project} />
          <TechnologySection project={project} />
          <ChallengesSection project={project} />
          <FAQSection project={project} />
          <NextProject project={project} />
        </div>
      </div>
    </main>
  );
}
