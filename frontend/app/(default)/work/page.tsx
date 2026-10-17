"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Blocks,
  CalendarDays,
  Check,
  ChevronDown,
  Command,
  ExternalLink,
  Fingerprint,
  Gamepad2,
  Layers3,
  Orbit,
  Radio,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const projects = [
  {
    id: "01",
    name: "The Prism",
    category: "CONTENT DISCOVERY",
    description:
      "A different lens on the internet. Discover stories, connect perspectives and bring structure to a noisy stream of information.",
    stack: ["TypeScript", "AI", "RSS"],
    href: "/work/the-prism",
    action: "Explore the repository",
    visual: "prism",
  },
  {
    id: "02",
    name: "Obsidian",
    category: "BROWSER EXTENSION",
    description:
      "A browser experience built around projects, with a focused interface designed to keep useful things close at hand.",
    stack: ["Browser APIs", "TypeScript", "Extension UI"],
    href: "/work/obsidian",
    action: "Project details coming next",
    visual: "obsidian",
  },
  {
    id: "03",
    name: "Campus Event Notifier",
    category: "AUTOMATION",
    description:
      "Turn campus announcements into something actionable. Extract event details and generate a calendar-ready file.",
    stack: ["TypeScript", "Gemini", ".ics"],
    href: "/work/dps-campus-event-notifier",
    visual: "automation",
  },
  {
    id: "04",
    name: "Nexus Game Engine",
    category: "GAME TECHNOLOGY",
    description:
      "An exploration of game systems, interactive worlds and the building blocks behind playable experiences.",
    stack: ["Game systems", "Rendering", "Interaction"],
    href: "/work/nexus-game-engine",
    action: "Project details coming next",
    visual: "engine",
  },
];

const faqs = [
  {
    question: "What am I looking at?",
    answer:
      "A selection of original projects built to explore ideas, solve problems and experiment with software. Each project has its own purpose and direction.",
  },
  {
    question: "Can I explore the source code?",
    answer:
      "Public repositories are linked directly from their project cards. Projects without a public repository will receive their own detail pages as the portfolio develops.",
  },
  {
    question: "Are these client projects?",
    answer:
      "This gallery focuses on original projects and independent experiments. It does not present every project as commissioned client work.",
  },
  {
    question: "Can we build something together?",
    answer:
      "Yes. Visit the build page to share your idea, explain what you need and start a project conversation with Nexus.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function ProjectArtwork({ type }: { type: string }) {
  const reducedMotion = useReducedMotion();

  const float = (duration: number, distance = 12) =>
    reducedMotion
      ? {}
      : {
          y: [0, -distance, 0],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  if (type === "prism") {
    return (
      <div className="relative h-full min-h-[330px] overflow-hidden rounded-[inherit]">
        <img src="/screenshots/projects/prism/home.png" />
      </div>
    );
  }

  if (type === "obsidian") {
    return (
      <div
        className="relative h-full min-h-[428px] overflow-hidden rounded-[inherit] w-full flex justify-center"
        style={{
          background:
            "linear-gradient(135deg,#090014 0%,#190038 35%, #310078 68%, #130024 100%)",
        }}
      >
        <img
          src="/screenshots/projects/obsidian/home.png"
          style={{ height: "428px" }}
        />
      </div>
    );
  }

  if (type === "automation") {
    return (
      <div className="relative h-full min-h-[330px] overflow-hidden rounded-[inherit]">
        <img
          src="/screenshots/projects/notifier/home.png"
          style={{ height: "428px", width: "100%" }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[430px] overflow-hidden rounded-[inherit]">
      <img
        src="/screenshots/projects/engine/home.png"
        style={{ height: "428px", width: "100%" }}
      />
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const content = (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={false}
      animate={{
        y: hovered && !reducedMotion ? -7 : 0,
        scale: hovered && !reducedMotion ? 1.005 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[30px] border sm:rounded-[38px] border-none"
      style={{
        background: "var(--card)",
      }}
    >
      <div className="relative p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-[23px] sm:rounded-[29px] ">
          <ProjectArtwork type={project.visual} />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "var(--gradient-shimmer)",
              opacity: 0,
            }}
            animate={{ opacity: hovered && !reducedMotion ? 0.45 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-7 pt-3 sm:px-8 sm:pb-9 sm:pt-4 lg:px-9">
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.19em] sm:text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            {project.category}
          </span>
          <span
            className="text-xs font-semibold tabular-nums"
            style={{ color: "var(--text-muted)" }}
          >
            {project.id}
          </span>
        </div>

        <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-black leading-[0.96] tracking-[-0.065em]">
          {project.name}
        </h2>

        <p
          className="mt-4 max-w-xl text-sm leading-7 sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border px-3 py-1.5 text-[10px] font-semibold sm:text-[11px]"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface-secondary)",
                color: "var(--text-secondary)",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div
          className="mt-7 flex items-center justify-between gap-4 border-t pt-5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <span
            className="flex min-w-0 items-center gap-2 text-xs font-bold sm:text-sm"
            style={{
              color: project.href ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            <span className="truncate">{project.action}</span>
          </span>
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45"
            style={{
              background: project.href
                ? "var(--accent)"
                : "var(--surface-secondary)",
              color: project.href ? "white" : "var(--text-muted)",
              border: project.href ? "none" : "1px solid var(--border)",
            }}
          >
            {project.href ? (
              <ArrowUpRight size={19} />
            ) : (
              <ArrowRight size={18} />
            )}
          </span>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
        style={{ background: "var(--gradient-primary)" }}
        animate={{ scaleX: hovered ? 1 : 0.12 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </motion.article>
  );

  return (
    <Reveal delay={index * 0.07} className="h-full">
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.action}: ${project.name}`}
          className="block h-full rounded-[30px] focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ outlineColor: "var(--focus-ring)" }}
        >
          {content}
        </a>
      ) : (
        <div className="h-full">{content}</div>
      )}
    </Reveal>
  );
}

function GalleryHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-[18%] top-[-5%] h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{ background: "var(--glow-primary)" }}
          animate={reducedMotion ? undefined : { x: [0, 45, 0], y: [0, 35, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[16%] top-[8%] h-[580px] w-[580px] rounded-full blur-[110px]"
          style={{ background: "var(--glow-secondary)" }}
          animate={
            reducedMotion ? undefined : { x: [0, -35, 0], y: [0, 28, 0] }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-25%] left-[30%] h-[450px] w-[450px] rounded-full blur-[110px]"
          style={{ background: "var(--glow-tertiary)" }}
          animate={reducedMotion ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-9 flex flex-wrap items-center gap-3 sm:mb-12"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl"
            style={{
              background: "var(--gradient-primary)",
              color: "white",
              boxShadow: "0 8px 32px var(--hero-glow-primary)",
            }}
          >
            <Sparkles size={18} />
          </span>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--text-primary)" }}
            >
              Nexus / Selected work
            </p>
            <p
              className="mt-1 text-[11px]"
              style={{ color: "var(--text-muted)" }}
            >
              Independent ideas, made real
            </p>
          </div>
          <div
            className="ml-auto hidden items-center gap-2 rounded-full border px-4 py-2.5 sm:flex"
            style={{
              borderColor: "var(--border)",
              background: "var(--glass)",
              color: "var(--text-secondary)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{ background: "var(--success)" }}
                animate={
                  reducedMotion
                    ? undefined
                    : { scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="relative h-2 w-2 rounded-full"
                style={{ background: "var(--success)" }}
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
              Built with intent
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1250px] text-[clamp(4rem,11.5vw,10.8rem)] font-black leading-[0.79] tracking-[-0.05em]"
        >
          Ideas become
          <span className="mt-3 block sm:mt-5">
            <span className="relative inline-block">
              <span className="relative z-10">experiences.</span>
              <motion.span
                className="absolute -bottom-[5%] left-0 h-[18%] w-full rounded-full"
                style={{ background: "var(--gradient-primary)", opacity: 0.2 }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              />
            </span>
          </span>
        </motion.h1>

        <div className="mt-12 grid items-end gap-8 sm:mt-16 lg:grid-cols-[1fr_auto] lg:gap-16">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-base leading-8 sm:text-xl sm:leading-9"
            style={{ color: "var(--text-secondary)" }}
          >
            A closer look at what we make.{" "}
            <span style={{ color: "var(--text-muted)" }}>
              Different problems, distinct personalities, one thing in common:
              the details matter.
            </span>
          </motion.p>

          <motion.a
            href="#selected-work"
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={reducedMotion ? undefined : { y: -3 }}
            className="group inline-flex w-fit items-center gap-4 rounded-full px-5 py-3.5 text-sm font-bold transition-shadow"
            style={{
              background: "var(--accent)",
              color: "white",
              boxShadow: "var(--shadow-md)",
            }}
          >
            Explore the work
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0.5">
              <ArrowDown size={17} />
            </span>
          </motion.a>
        </div>

        <div
          className="relative mt-16 overflow-hidden rounded-[30px] border sm:mt-20 sm:rounded-[40px]"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden p-6 sm:p-10 lg:min-h-[350px] lg:p-12">
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-[85px]"
                style={{ background: "var(--glow-primary)" }}
              />
              <div
                className="relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.05em]"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                The collection
              </div>
              <div className="relative mt-12">
                <div className="text-[clamp(3.5rem,7vw,6.8rem)] font-black leading-[0.8] tracking-[-0.05em]">
                  Made to
                  <br />
                  <span style={{ color: "var(--text-muted)" }}>stand out.</span>
                </div>
                <p
                  className="mt-6 max-w-sm text-sm leading-7"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Scroll through the work. Every project gets its own visual
                  world.
                </p>
              </div>
            </div>
            <div
              className="relative min-h-[280px] overflow-hidden border-t lg:border-l lg:border-t-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(var(--border-strong)_1px,transparent_1px)] [background-size:20px_20px]" />
              <motion.div
                className="absolute left-[12%] top-[16%] h-36 w-36 rounded-[32px] border"
                style={{
                  borderColor: "var(--border-strong)",
                  background: "var(--gradient-soft)",
                }}
                animate={
                  reducedMotion
                    ? undefined
                    : { rotate: [12, 22, 12], y: [0, -12, 0] }
                }
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute right-[12%] top-[12%] h-28 w-28 rounded-full border"
                style={{
                  borderColor: "var(--accent)",
                  boxShadow: "0 0 70px var(--hero-glow-primary)",
                }}
                animate={
                  reducedMotion
                    ? undefined
                    : { rotate: [0, 180, 360], scale: [1, 1.08, 1] }
                }
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="absolute inset-[20%] rounded-full border border-dashed"
                  style={{ borderColor: "var(--border-strong)" }}
                />
              </motion.div>
              <motion.div
                className="absolute bottom-[13%] left-[23%] flex h-24 w-24 items-center justify-center rounded-[26px] shadow-xl"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "0 18px 60px var(--hero-glow-secondary)",
                }}
                animate={
                  reducedMotion
                    ? undefined
                    : { y: [0, -10, 0], rotate: [0, -8, 0] }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Orbit size={35} color="white" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                className="absolute bottom-[16%] right-[12%] rounded-2xl border p-4 shadow-lg backdrop-blur-xl"
                style={{
                  background: "var(--glass-strong)",
                  borderColor: "var(--glass-border)",
                }}
                animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                    }}
                  >
                    <Layers3 size={16} />
                  </span>
                  <div>
                    <div className="text-xs font-bold">Made with purpose</div>
                    <div
                      className="mt-1 text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      No two alike
                    </div>
                  </div>
                </div>
              </motion.div>
              <div
                className="absolute right-5 top-5 text-[9px] font-bold uppercase tracking-[0.05em]"
                style={{ color: "var(--text-muted)" }}
              >
                Nexus / 001—004
              </div>
            </div>
          </div>
        </div>

        <a
          href="#selected-work"
          className="mt-7 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.05em] transition-opacity hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll to discover
          <ArrowDownRight size={15} />
        </a>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section
      id="selected-work"
      className="scroll-mt-20 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12 lg:pb-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <div
            className="mb-8 flex flex-col gap-5 border-b pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "var(--text-muted)" }}
              >
                A few things we have made
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.07em] sm:text-6xl">
                Selected work<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
            </div>
            <p
              className="max-w-xs text-sm leading-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Four projects. Four different directions. Take a closer look.
            </p>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12 lg:pb-40">
      <Reveal>
        <div
          className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[32px] border sm:rounded-[44px]"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface-secondary)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -right-[10%] -top-[55%] h-[520px] w-[520px] rounded-full blur-[100px]"
              style={{ background: "var(--glow-primary)" }}
              animate={
                reducedMotion ? undefined : { x: [0, -35, 0], y: [0, 25, 0] }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-[65%] left-[8%] h-[560px] w-[560px] rounded-full blur-[100px]"
              style={{ background: "var(--glow-secondary)" }}
              animate={reducedMotion ? undefined : { x: [0, 40, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
          <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20 lg:p-16">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--glass)",
                  color: "var(--text-secondary)",
                }}
              >
                <Sparkles size={13} style={{ color: "var(--accent)" }} />
                Your idea could be next
              </div>
              <h2 className="mt-8 max-w-4xl text-[clamp(3.3rem,8vw,8rem)] font-black leading-[0.85] tracking-[-0.09em]">
                Have an idea?
                <span
                  className="mt-2 block"
                  style={{ color: "var(--text-muted)" }}
                >
                  Let&apos;s make it.
                </span>
              </h2>
              <p
                className="mt-7 max-w-xl text-sm leading-7 sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                Tell us what you are imagining. We can figure out the right way
                to build it together.
              </p>
            </div>
            <Link
              href="/build"
              className="group inline-flex w-fit items-center gap-4 rounded-full px-6 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--accent)",
                color: "white",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              Start a project
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(-1);

  return (
    <section className="px-5 pb-28 sm:px-8 sm:pb-36 lg:px-12 lg:pb-44">
      <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <Reveal>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "var(--text-muted)" }}
            >
              Before you go
            </p>
            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">
              Good
              <br />
              questions<span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <p
              className="mt-6 max-w-sm text-sm leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              A few useful details about the work, the code and what comes next.
            </p>
            <div
              className="mt-8 flex items-center gap-3 text-xs font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                <Command size={16} />
              </span>
              Still curious? Get in touch through the build page.
            </div>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={item.question} delay={index * 0.04}>
                <div
                  className="overflow-hidden rounded-[22px] border transition-colors duration-300 sm:rounded-[26px]"
                  style={{
                    borderColor: isOpen
                      ? "var(--border-strong)"
                      : "var(--border)",
                    background: isOpen ? "var(--card)" : "var(--surface)",
                    boxShadow: isOpen ? "var(--shadow-sm)" : "none",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span
                      className="w-7 shrink-0 text-xs font-bold tabular-nums"
                      style={{ color: "var(--text-muted)" }}
                    >
                      0{index + 1}
                    </span>
                    <span className="flex-1 text-base font-bold tracking-tight sm:text-lg">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: isOpen
                          ? "var(--accent)"
                          : "var(--surface-secondary)",
                        color: isOpen ? "white" : "var(--text-secondary)",
                      }}
                    >
                      <ChevronDown size={17} />
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="max-w-2xl px-5 pb-6 pl-[4.25rem] text-sm leading-7 sm:px-7 sm:pb-7 sm:pl-[5.75rem]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <main className="nexus-page relative overflow-hidden">
      <GalleryHero />
      <SelectedWork />
      <ClosingSection />
      <FAQ />
    </main>
  );
}
