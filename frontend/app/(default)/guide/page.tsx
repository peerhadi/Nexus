"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const screenshots = [
  {
    number: "01",
    eyebrow: "YOUR WORKSPACE",
    title: "Everything starts here.",
    description:
      "Your Nexus dashboard brings your workspace together in one place. Get a clear view of your work and find your way around without unnecessary complexity.",
    image: "/screenshots/dashboard.png",
    alt: "The Nexus dashboard interface",
    icon: LayoutDashboard,
    label: "Dashboard",
    reverse: false,
  },
  {
    number: "02",
    eyebrow: "PROJECT MANAGEMENT",
    title: "Keep every project in view.",
    description:
      "Follow your projects from one place. Keep track of what you're working on, understand their progress, and stay organised as your work develops.",
    image: "/screenshots/projects.png",
    alt: "The Nexus projects interface",
    icon: FolderKanban,
    label: "Projects",
    reverse: true,
  },
  {
    number: "03",
    eyebrow: "COMMUNICATION",
    title: "Conversations that stay organised.",
    description:
      "Keep project-related conversations accessible through Nexus Messages. Your communication has a dedicated space instead of getting lost among unrelated work.",
    image: "/screenshots/messages.png",
    alt: "The Nexus messages interface",
    icon: MessageSquare,
    label: "Messages",
    reverse: false,
  },
  {
    number: "04",
    eyebrow: "YOUR AI ASSISTANT",
    title: "Think it through with Nexus AI.",
    description:
      "Have a conversation, explore an idea, ask questions, or get help working through a problem. Nexus AI gives you a place to think through your next steps.",
    image: "/screenshots/ai.png",
    alt: "The Nexus AI interface",
    icon: BrainCircuit,
    label: "Nexus AI",
    reverse: true,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ScreenshotFrame({
  src,
  alt,
  label,
  index,
}: {
  src: string;
  alt: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease }}
      className="group relative min-w-0"
    >
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan-200/35 via-transparent to-blue-200/30 opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div className="flex h-11 items-center justify-between border-b border-[var(--border)] px-4 sm:h-12 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-medium tracking-wide text-[var(--text-secondary)]">
              NEXUS
            </span>
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[11px]">
            {label}
          </span>
        </div>

        <div className="relative aspect-[12/10] overflow-hidden bg-[var(--surface-secondary)]">
          <Image
            src={src}
            alt={alt}
            priority={index === 0}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.015] "
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <span className="text-xs text-[var(--text-muted)]">
          Nexus / {label}
        </span>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          {String(index + 1).padStart(2, "0")} — 04
        </span>
      </div>
    </motion.div>
  );
}

export default function Guide() {
  return (
    <main className="overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      {/* HERO */}
      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12 lg:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[min(900px,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_65%)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="max-w-3xl"
          >
            <h1 className="max-w-3xl text-5xl font-medium leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-8xl mt-5">
              A closer look at{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Nexus.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              Not just another website. Take a look inside the workspace,
              explore its tools, and see how the different parts come together.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#workspace"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--text-inverse)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:-translate-y-0.5"
              >
                Explore the workspace
                <ArrowDown size={15} />
              </a>

              <span className="text-sm text-[var(--text-muted)]">
                A visual tour of Nexus
              </span>
            </div>
          </motion.div>

          {/* REAL HOME SCREENSHOT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease }}
            className="mt-14 sm:mt-20"
          >
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Start at the beginning
                </p>
                <h2 className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
                  The Nexus experience
                </h2>
              </div>
              <span className="hidden text-xs text-[var(--text-muted)] sm:block">
                01 / Home
              </span>
            </div>

            <div className="group relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-cyan-200/20 via-sky-200/20 to-blue-200/20 opacity-80 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_28px_90px_rgba(15,23,42,0.1)] sm:rounded-[1.75rem]">
                <div className="flex h-11 items-center justify-between border-b border-[var(--border)] px-4 sm:h-12 sm:px-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      nexusmade.vercel.app
                    </span>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="text-[var(--text-muted)]"
                  />
                </div>

                <div className="relative aspect-[12/10] overflow-hidden bg-[var(--surface-secondary)]">
                  <Image
                    src="/screenshots/home.png"
                    alt="The Nexus public homepage"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT INTRODUCTION */}
      <section
        id="workspace"
        className="border-y border-[var(--border)] bg-[var(--surface-secondary)] px-5 py-14 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Inside the workspace
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
              Built to bring your work together.
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[var(--text-secondary)] sm:justify-self-end sm:text-base sm:leading-8">
            Each part of Nexus has a purpose. Explore the real interfaces below
            to understand what is available and where to find it.
          </p>
        </div>
      </section>

      {/* REAL PRODUCT SCREENSHOTS */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl sm:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Explore the tools
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
              A workspace, up close.
            </h2>
          </div>

          <div className="space-y-20 sm:space-y-28 lg:space-y-36">
            {screenshots.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className={`grid items-center gap-9 lg:grid-cols-12 lg:gap-14 ${
                    item.reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="lg:col-span-5">
                    <motion.div
                      initial={{ opacity: 0, x: item.reverse ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.65, ease }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                          <Icon
                            size={18}
                            strokeWidth={1.7}
                            className="text-[var(--text-primary)]"
                          />
                        </span>
                        <span className="text-xs font-semibold tracking-[0.17em] text-[var(--text-muted)]">
                          {item.eyebrow}
                        </span>
                      </div>

                      <div className="mt-7 flex items-start gap-4">
                        <span className="hidden pt-2 font-mono text-xs text-[var(--text-muted)] sm:block">
                          {item.number}
                        </span>

                        <div>
                          <h3 className="max-w-lg text-3xl font-medium leading-[1.12] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                            {item.title}
                          </h3>

                          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Check size={14} className="text-[var(--accent)]" />
                        <span>Part of your Nexus workspace</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-7">
                    <ScreenshotFrame
                      src={item.image}
                      alt={item.alt}
                      label={item.label}
                      index={index + 1}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-secondary)] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-7xl"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                <Sparkles size={14} />
                Your next step
              </div>

              <h2 className="text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
                Now you know your way around.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
                Explore Nexus for yourself and discover how its tools fit into
                the way you work.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--text-inverse)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:-translate-y-0.5"
              >
                Get started
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface)]"
              >
                Explore our services
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
