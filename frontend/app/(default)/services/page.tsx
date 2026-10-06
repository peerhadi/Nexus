"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  CreditCard,
  Database,
  Globe2,
  Layers3,
  Lock,
  Puzzle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Automation",
    eyebrow: "MAKE THE BORING DISAPPEAR",
    description:
      "If you're repeatedly copying, checking, sorting, sending, reminding, updating, or moving information between tools — there's probably a better way.",
    icon: Workflow,
    gradient: "from-violet-400 via-fuchsia-300 to-pink-200",
    examples: [
      "Email workflows",
      "Scheduled tasks",
      "Reports & notifications",
      "Data processing",
      "Repetitive workflows",
      "Internal operations",
    ],
  },
  {
    number: "02",
    title: "Web Applications",
    eyebrow: "TURN THE IDEA INTO SOFTWARE",
    description:
      "From tiny utilities to full platforms, we build custom applications around exactly what you need instead of forcing your workflow into someone else's product.",
    icon: Code2,
    gradient: "from-blue-400 via-cyan-300 to-sky-200",
    examples: [
      "Dashboards",
      "Internal tools",
      "SaaS products",
      "Customer portals",
      "Admin panels",
      "Interactive applications",
    ],
  },
  {
    number: "03",
    title: "AI Systems",
    eyebrow: "PUT INTELLIGENCE TO WORK",
    description:
      "AI is useful when it actually removes work. We can integrate intelligent features into applications and workflows where they provide a practical advantage.",
    icon: Bot,
    gradient: "from-orange-300 via-pink-300 to-violet-300",
    examples: [
      "AI assistants",
      "Document processing",
      "Classification",
      "Information extraction",
      "AI-powered workflows",
      "Smart search",
    ],
  },
  {
    number: "04",
    title: "Integrations",
    eyebrow: "MAKE YOUR TOOLS TALK",
    description:
      "Your software shouldn't live on isolated islands. We connect APIs, services, databases, and applications so information can move where it needs to go.",
    icon: Puzzle,
    gradient: "from-emerald-300 via-cyan-300 to-blue-300",
    examples: [
      "API integrations",
      "Database connections",
      "Webhooks",
      "Third-party services",
      "Data synchronization",
      "Custom APIs",
    ],
  },
];

const canBuild = [
  "Websites & landing pages",
  "Web applications",
  "Internal tools",
  "Dashboards",
  "Automations",
  "API integrations",
  "AI-powered features",
  "Custom scripts",
  "Data workflows",
  "Prototypes & MVPs",
  "Developer tooling",
  "Custom software",
];

const cannotBuild = [
  "Physical hardware or manufacturing",
  "Illegal or harmful systems",
  "Unauthorized account access",
  "Projects requiring impersonation or deception",
  "Guaranteed outcomes we cannot control",
  "Undefined projects with no usable requirements",
];

const process = [
  {
    number: "01",
    title: "Tell us the problem",
    description:
      "You don't need to know the technical solution. Explain what is annoying, slow, repetitive, or missing.",
  },
  {
    number: "02",
    title: "We scope it",
    description:
      "We figure out what should actually be built, what is possible, what it will involve, and what it will cost.",
  },
  {
    number: "03",
    title: "30% to start",
    description:
      "Once the scope is agreed, a 30% advance starts the project. No mysterious hourly-meter anxiety.",
  },
  {
    number: "04",
    title: "We build",
    description:
      "Development happens against the agreed scope, with progress shared throughout the project.",
  },
  {
    number: "05",
    title: "You review",
    description:
      "The finished work is reviewed against what was agreed. Small agreed fixes are handled before completion.",
  },
  {
    number: "06",
    title: "70% → handoff",
    description:
      "The remaining 70% is paid when the agreed work is complete, before final handoff or deployment.",
  },
];

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      {/* ===================================================== */}
      {/* ATMOSPHERE */}
      {/* ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 70, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.1, 0.94, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[15%] -top-[15%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22),transparent_68%)] blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 30, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.92, 1.08, 1],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-[18%] top-[20%] h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_68%)] blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -30, 50, 0],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-25%] left-[25%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.18),transparent_68%)] blur-3xl"
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#111 1px,transparent 1px),linear-gradient(to bottom,#111 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative px-5 pb-28 pt-36 sm:px-8 lg:px-12 lg:pb-40 lg:pt-48">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid items-end gap-16 lg:grid-cols-[1fr_0.42fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-8 flex w-fit items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 shadow-sm backdrop-blur-xl"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_18px_rgba(139,92,246,0.45)]" />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Services / What we actually do
                </span>
              </motion.div>

              <h1 className="max-w-6xl text-[clamp(4.2rem,10vw,10.5rem)] font-black leading-[0.87] tracking-[-0.1em]">
                <motion.span
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="block"
                >
                  YOU BRING
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="block text-[var(--text-disabled)]"
                >
                  THE PROBLEM.
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="block bg-[var(--gradient-primary)] bg-clip-text pb-2 "
                >
                  WE BUILD THE FIX.
                </motion.span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
                <Rocket className="h-5 w-5" />
              </div>

              <p className="text-lg font-bold leading-7 tracking-[-0.02em]">
                You don't need to know what to build.
              </p>

              <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">
                You just need to tell us what isn't working.
              </p>

              <Link
                href="build"
                className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SERVICES */}
      {/* ===================================================== */}

      <section
        id="services"
        className="relative px-5 pb-36 sm:px-8 lg:px-12 lg:pb-52"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-16 flex items-end justify-between border-b border-[var(--border)] pb-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
                001 — What we build
              </p>

              <h2 className="mt-4 text-5xl font-black tracking-[-0.07em] sm:text-7xl">
                THE TOOLKIT.
              </h2>
            </div>

            <p className="hidden max-w-xs text-right text-sm leading-6 text-[var(--text-muted)] md:block">
              Four broad categories.
              <br />
              An unreasonable number of possibilities.
            </p>
          </div>

          <div className="space-y-5">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-[34px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm backdrop-blur-xl sm:p-10 lg:p-12"
                >
                  <div
                    className={`absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br ${service.gradient} opacity-45 blur-[90px] transition-all duration-700 group-hover:scale-125 group-hover:opacity-70`}
                  />

                  <div className="relative grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-white transition-all duration-500 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-fuchsia-500">
                          <Icon className="h-6 w-6" />
                        </div>

                        <span className="text-xs font-black text-[var(--text-disabled)]">
                          {service.number}
                        </span>
                      </div>

                      <p className="mt-16 text-[10px] font-bold tracking-[0.24em] text-[var(--text-muted)]">
                        {service.eyebrow}
                      </p>

                      <h3 className="mt-4 text-[clamp(3rem,5vw,5.5rem)] font-black leading-[0.9] tracking-[-0.075em]">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex flex-col justify-end">
                      <p className="max-w-2xl text-lg leading-8 text-[var(--text-tertiary)]">
                        {service.description}
                      </p>

                      <div className="mt-10 grid gap-2 sm:grid-cols-2">
                        {service.examples.map((example) => (
                          <div
                            key={example}
                            className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-4 py-3"
                          >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-contrast)]">
                              <Check className="h-3 w-3" />
                            </span>

                            <span className="text-sm font-semibold text-[var(--text-secondary)]">
                              {example}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r ${service.gradient} transition-transform duration-700 group-hover:scale-x-100`}
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CAN / CANNOT */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--surface-secondary)] px-5 py-36 sm:px-8 lg:px-12 lg:py-48">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-20 max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              002 — Clear boundaries
            </p>

            <h2 className="mt-8 text-[clamp(3.8rem,8vw,8rem)] font-black leading-[0.88] tracking-[-0.09em]">
              ALMOST
              <br />
              <span className="bg-[var(--gradient-primary)] bg-clip-text ">
                ANYTHING.
              </span>
              <br />
              <span className="text-[var(--text-disabled)]">
                NOT LITERALLY.
              </span>
            </h2>

            <p className="mt-10 max-w-2xl text-lg leading-8 text-[var(--text-tertiary)]">
              We want to be ambitious without pretending we can build every
              physical, legal, or technically impossible thing on Earth.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* CAN */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-[34px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm backdrop-blur-xl sm:p-10"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
                  <Check className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Green light
                  </p>
                  <h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">
                    Things we can build
                  </h3>
                </div>
              </div>

              <div className="mt-10 grid gap-2 sm:grid-cols-2">
                {canBuild.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-[var(--surface)] px-4 py-3.5"
                  >
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CANNOT */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-[34px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm backdrop-blur-xl sm:p-10"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)] shadow-lg">
                  <X className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Red line
                  </p>
                  <h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">
                    Things we don't do
                  </h3>
                </div>
              </div>

              <div className="mt-10 space-y-2">
                {cannotBuild.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-[var(--surface-hover)] px-4 py-3.5"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PROCESS */}
      {/* ===================================================== */}

      <section className="relative px-5 py-36 sm:px-8 lg:px-12 lg:py-48">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-20 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
                003 — How it works
              </p>

              <h2 className="mt-8 text-[clamp(3.8rem,7vw,7.5rem)] font-black leading-[0.86] tracking-[-0.09em]">
                NO
                <br />
                <span className="text-[var(--text-disabled)]">MYSTERY.</span>
                <br />
                <span className="bg-[var(--gradient-primary)] bg-clip-text ">
                  JUST BUILD.
                </span>
              </h2>

              <p className="mt-10 max-w-md text-base leading-7 text-[var(--text-tertiary)]">
                We keep the process simple enough that you always know what is
                happening, what you're paying for, and what happens next.
              </p>
            </div>

            <div className="relative">
              <div className="absolute bottom-8 left-6 top-8 w-px bg-[var(--surface-hover)]" />

              <div className="space-y-5">
                {process.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.6,
                    }}
                    className="group relative flex gap-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-black shadow-sm"
                    >
                      {step.number}
                    </motion.div>

                    <div className="flex-1 rounded-[24px] border border-transparent bg-[var(--surface-muted)] p-6 transition-all duration-300 group-hover:border-[var(--border)] group-hover:bg-[var(--surface)] group-hover:shadow-sm sm:p-7">
                      <h3 className="text-xl font-black tracking-[-0.03em] sm:text-2xl">
                        {step.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-tertiary)]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* PAYMENT */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[var(--surface-secondary)] px-5 py-36 sm:px-8 lg:px-12 lg:py-48">
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.2),transparent_68%)] blur-3xl"
        />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              004 — Payment
            </p>

            <h2 className="mt-8 text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.88] tracking-[-0.09em]">
              SIMPLE
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text ">
                & FAIR.
              </span>
            </h2>

            <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-[var(--text-tertiary)]">
              We don't need the entire project budget sitting on our side before
              anything happens. We also don't want to build an entire project
              with no commitment.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl overflow-hidden rounded-[36px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_25px_80px_rgba(0,0,0,0.07)] backdrop-blur-xl md:grid-cols-2">
            <div className="relative overflow-hidden p-8 sm:p-12">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-200/50 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  To start
                </p>

                <p className="mt-5 text-8xl font-black tracking-[-0.1em] text-violet-500">
                  30<span className="text-4xl">%</span>
                </p>

                <p className="mt-5 text-lg font-bold">Project advance</p>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-tertiary)]">
                  Paid after the scope, price, and deliverables are agreed. This
                  officially starts the project.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden border-t border-[var(--border)] p-8 sm:p-12 md:border-l md:border-t-0">
              <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-200/50 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  At completion
                </p>

                <p className="mt-5 text-8xl font-black tracking-[-0.1em] text-blue-500">
                  70<span className="text-4xl">%</span>
                </p>

                <p className="mt-5 text-lg font-bold">Final payment</p>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-tertiary)]">
                  Paid when the agreed work is complete, before final handoff or
                  deployment.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-3">
            {[
              [ShieldCheck, "Clear scope"],
              [CreditCard, "No full payment upfront"],
              [Lock, "Milestone-based"],
              [Check, "Agreed deliverables"],
            ].map(([Icon, text]) => {
              const Component = Icon as typeof Check;

              return (
                <span
                  key={text as string}
                  className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-tertiary)]"
                >
                  <Component className="h-3.5 w-3.5" />
                  {text as string}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}

      <section
        id="contact"
        className="relative px-5 py-10 sm:px-8 lg:px-12 lg:py-12"
      >
        <div className="relative mx-auto max-w-[1450px] overflow-hidden rounded-[44px] bg-[var(--gradient-hero)] px-7 py-28 text-center text-white sm:px-12 lg:py-40">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.08, 1],
            }}
            transition={{
              rotate: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 7,
                repeat: Infinity,
              },
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
          />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
              005 — Let's build
            </p>

            <h2 className="mx-auto mt-10 max-w-6xl text-[clamp(4rem,9vw,9.5rem)] font-black leading-[0.88] tracking-[-0.095em]">
              GOT A
              <br />
              <span className="text-white/35 text-[90%]">PROBLEM?</span>
            </h2>

            <p className="mx-auto mt-12 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
              Tell us what is broken, boring, slow, confusing, or missing. We'll
              figure out what to do with it.
            </p>

            <Link
              href="/build"
              className="group mx-auto mt-10 flex w-fit items-center gap-4 rounded-full bg-[var(--surface)] px-7 py-4 text-sm font-bold text-[var(--text-primary)] shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.25)]"
            >
              Start a conversation
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
