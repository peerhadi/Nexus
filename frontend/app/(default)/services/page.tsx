"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  Code2,
  CreditCard,
  Globe2,
  Layers3,
  Puzzle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Websites",
    label: "YOUR PLACE ON THE INTERNET",
    description:
      "Build a strong first impression with a website that looks considered, communicates clearly, and gives visitors a reason to take the next step.",
    detail:
      "From a polished portfolio to a multi-page business website, every page should have a purpose.",
    href: "/services/websites",
    icon: Globe2,
    accent: "violet",
    deliverables: [
      "Business websites",
      "Landing pages",
      "Portfolios",
      "Responsive design",
    ],
    visual: "website",
  },
  {
    number: "02",
    title: "Web applications",
    label: "TURN IDEAS INTO SOFTWARE",
    description:
      "Go beyond a traditional website with software designed around the way people work, interact, and get things done.",
    detail:
      "Create useful digital products without forcing your idea into an off-the-shelf solution.",
    href: "/services/web-applications",
    icon: Code2,
    accent: "blue",
    deliverables: [
      "Custom dashboards",
      "Customer portals",
      "Admin panels",
      "SaaS products",
    ],
    visual: "application",
  },
  {
    number: "03",
    title: "Automation",
    label: "LET REPETITIVE WORK RUN ITSELF",
    description:
      "Reduce manual work by connecting repeatable tasks into workflows that run consistently, with less unnecessary effort.",
    detail:
      "Move information, trigger actions, send notifications, and simplify everyday operations.",
    href: "/services/automation",
    icon: Workflow,
    accent: "pink",
    deliverables: [
      "Email workflows",
      "Scheduled tasks",
      "Reports and alerts",
      "Data processing",
    ],
    visual: "automation",
  },
  {
    number: "04",
    title: "AI systems",
    label: "MAKE INTELLIGENCE USEFUL",
    description:
      "Add AI where it solves a real problem, from understanding documents to helping people find information faster.",
    detail:
      "Build practical AI features around your product, data, and the tasks you actually need to improve.",
    href: "/services/ai-systems",
    icon: Bot,
    accent: "orange",
    deliverables: [
      "AI assistants",
      "Document processing",
      "Information extraction",
      "Smart search",
    ],
    visual: "ai",
  },
  {
    number: "05",
    title: "Integrations",
    label: "MAKE YOUR TOOLS WORK TOGETHER",
    description:
      "Connect the applications and services you already use so information can move between them without unnecessary manual steps.",
    detail:
      "Bring APIs, databases, webhooks, and third-party services into one connected system.",
    href: "/services/integrations",
    icon: Puzzle,
    accent: "green",
    deliverables: [
      "API integrations",
      "Database connections",
      "Webhooks",
      "Data synchronization",
    ],
    visual: "integrations",
  },
];

const process = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Explain the problem, the idea, or the task you want to improve. You don't need to arrive with a technical specification.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Agree on the scope",
    description:
      "We establish what will be built, what is included, the expected deliverables, and the project price before work begins.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Start with 30%",
    description:
      "Once the scope and price are agreed, a 30% advance starts the project.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Build and review",
    description:
      "Development follows the agreed scope, with progress shared and the completed work reviewed against the requirements.",
    icon: Code2,
  },
  {
    number: "05",
    title: "Pay the remaining 70%",
    description:
      "When the agreed work is complete, the remaining 70% is paid before final handoff or deployment.",
    icon: ShieldCheck,
  },
];

const fitOptions = [
  {
    label: "I need an online presence",
    result: "Websites",
    description:
      "A business site, portfolio, landing page, or a clearer way to present your work.",
    href: "/services/websites",
    icon: Globe2,
  },
  {
    label: "I want to build a product",
    result: "Web applications",
    description:
      "A dashboard, portal, platform, or custom application people can actually use.",
    href: "/services/web-applications",
    icon: Code2,
  },
  {
    label: "I want to reduce manual work",
    result: "Automation",
    description:
      "Repeatable tasks, scheduled actions, notifications, and workflows that take care of themselves.",
    href: "/services/automation",
    icon: Workflow,
  },
  {
    label: "I want to use AI",
    result: "AI systems",
    description:
      "An assistant, smarter search, document understanding, or AI-powered features inside a product.",
    href: "/services/ai-systems",
    icon: Bot,
  },
  {
    label: "My tools need to connect",
    result: "Integrations",
    description:
      "APIs, databases, and external services that need to share information reliably.",
    href: "/services/integrations",
    icon: Puzzle,
  },
];

function ServiceVisual({
  type,
  reduceMotion,
}: {
  type: string;
  reduceMotion: boolean | null;
}) {
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 5, repeat: Infinity, ease: "easeInOut" as const };

  if (type === "website") {
    return (
      <div className="relative mx-auto w-full max-w-[390px]">
        <motion.div
          animate={
            reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, 1, 0] }
          }
          transition={transition}
          className="relative overflow-hidden rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] shadow-[0_24px_80px_rgba(60,40,100,0.12)]"
        >
          <div className="flex items-center gap-1.5 border-b border-[var(--card-border)] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-rose-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            <div className="ml-3 h-2 w-24 rounded-full bg-[var(--surface-secondary)]" />
          </div>
          <div className="grid grid-cols-[1fr_0.8fr] gap-4 p-5 sm:p-6">
            <div className="flex flex-col justify-center py-3">
              <div className="h-2 w-14 rounded-full bg-violet-400/70" />
              <div className="mt-4 h-5 w-full rounded-md bg-[var(--text-primary)]/85" />
              <div className="mt-2 h-5 w-4/5 rounded-md bg-[var(--text-primary)]/65" />
              <div className="mt-4 h-2 w-full rounded-full bg-[var(--surface-secondary)]" />
              <div className="mt-2 h-2 w-4/5 rounded-full bg-[var(--surface-secondary)]" />
              <div className="mt-5 h-8 w-24 rounded-full bg-[var(--accent)]" />
            </div>
            <div className="relative flex min-h-[175px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-300/70 via-fuchsia-200/60 to-sky-200/80">
              <motion.div
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-36 w-36 rounded-full border border-white/80"
              />
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -9, 0], rotate: [0, 8, 0] }
                }
                transition={transition}
                className="relative h-24 w-20 rounded-[18px] border border-white/80 bg-white/50 shadow-xl backdrop-blur-md"
              >
                <div className="absolute left-3 right-3 top-3 h-2 rounded-full bg-violet-400/70" />
                <div className="absolute left-3 right-5 top-8 h-2 rounded-full bg-white/90" />
                <div className="absolute bottom-3 left-3 right-3 h-7 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400" />
              </motion.div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 px-5 pb-5">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[var(--card-border)] p-3"
              >
                <div className="h-2 w-8 rounded-full bg-violet-300" />
                <div className="mt-3 h-2 rounded-full bg-[var(--surface-secondary)]" />
              </div>
            ))}
          </div>
        </motion.div>
        <div className="absolute -right-3 top-12 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-3 shadow-lg sm:-right-7">
          <Check className="h-5 w-5 text-emerald-500" />
        </div>
      </div>
    );
  }

  if (type === "application") {
    return (
      <div className="relative mx-auto w-full max-w-[390px]">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
          transition={transition}
          className="overflow-hidden rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] shadow-[0_24px_80px_rgba(40,90,150,0.12)]"
        >
          <div className="flex items-center justify-between border-b border-[var(--card-border)] px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-white">
                <Layers3 className="h-4 w-4" />
              </div>
              <div className="h-2.5 w-20 rounded-full bg-[var(--text-primary)]/70" />
            </div>
            <div className="h-7 w-7 rounded-full bg-blue-400/20" />
          </div>
          <div className="grid grid-cols-[64px_1fr]">
            <div className="space-y-4 border-r border-[var(--card-border)] p-3">
              {[0, 1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-7 rounded-lg ${
                    item === 1
                      ? "bg-blue-500/15"
                      : "bg-[var(--surface-secondary)]"
                  }`}
                />
              ))}
            </div>
            <div className="min-w-0 p-4">
              <div className="h-3 w-28 rounded-full bg-[var(--text-primary)]/75" />
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[0, 1].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[var(--card-border)] p-3"
                  >
                    <div className="h-2 w-10 rounded-full bg-[var(--text-secondary)]/30" />
                    <div className="mt-3 h-5 w-12 rounded-md bg-blue-400/70" />
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-3 rounded-xl border border-[var(--card-border)] p-3">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-blue-400/20" />
                    <div className="h-2 flex-1 rounded-full bg-[var(--surface-secondary)]" />
                    <div className="h-2 w-8 rounded-full bg-blue-300/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={
            reduceMotion ? undefined : { y: [0, 6, 0], rotate: [0, -4, 0] }
          }
          transition={transition}
          className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 shadow-lg sm:-left-7"
        >
          <Zap className="h-4 w-4 text-blue-500" />
          <span className="text-xs font-bold">Built around you</span>
        </motion.div>
      </div>
    );
  }

  if (type === "automation") {
    return (
      <div className="relative mx-auto flex min-h-[290px] w-full max-w-[390px] items-center justify-center">
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute h-64 w-64 rounded-full border border-dashed border-pink-400/40"
        />
        <motion.div
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 27, repeat: Infinity, ease: "linear" }}
          className="absolute h-48 w-48 rounded-full border border-violet-400/30"
        />
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/60 bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-300 text-white shadow-[0_20px_60px_rgba(217,70,180,0.25)]">
          <Workflow className="h-10 w-10" />
        </div>
        {[
          { className: "-left-1 top-9", icon: "mail" },
          { className: "right-0 top-12", icon: "check" },
          { className: "bottom-5 left-9", icon: "zap" },
          { className: "bottom-7 right-8", icon: "clock" },
        ].map((item, index) => (
          <motion.div
            key={item.icon}
            animate={
              reduceMotion ? undefined : { y: [0, index % 2 === 0 ? -7 : 7, 0] }
            }
            transition={{ ...transition, delay: index * 0.2 }}
            className={`absolute ${item.className} flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-lg`}
          >
            {item.icon === "mail" && (
              <Workflow className="h-5 w-5 text-violet-500" />
            )}
            {item.icon === "check" && (
              <Check className="h-5 w-5 text-emerald-500" />
            )}
            {item.icon === "zap" && <Zap className="h-5 w-5 text-pink-500" />}
            {item.icon === "clock" && (
              <CreditCard className="h-5 w-5 text-orange-400" />
            )}
          </motion.div>
        ))}
        <svg
          viewBox="0 0 360 280"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M42 75 Q92 75 126 115 M318 80 Q264 80 230 115 M75 245 Q105 218 132 170 M290 240 Q260 220 230 170"
            stroke="currentColor"
            strokeOpacity=".2"
            strokeWidth="1.5"
            strokeDasharray="5 6"
          />
        </svg>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="relative mx-auto flex min-h-[290px] w-full max-w-[390px] items-center justify-center">
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute h-64 w-64 rounded-[35%] border border-orange-400/30"
        />
        <motion.div
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute h-48 w-48 rounded-[35%] border border-pink-400/40"
        />
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.06, 1], rotate: [0, 4, 0] }
          }
          transition={transition}
          className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/70 bg-gradient-to-br from-orange-300 via-pink-400 to-violet-400 text-white shadow-[0_25px_70px_rgba(236,72,153,0.25)]"
        >
          <Bot className="h-12 w-12" />
        </motion.div>
        {["01", "10", "AI", "✳", "↗", "•••"].map((item, index) => (
          <motion.div
            key={item + index}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, index % 2 ? 8 : -8, 0],
                    opacity: [0.5, 1, 0.5],
                  }
            }
            transition={{ ...transition, delay: index * 0.3 }}
            className={`absolute flex h-9 min-w-9 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-2 text-xs font-bold text-[var(--text-secondary)] shadow-md ${
              [
                "left-[12%] top-[12%]",
                "right-[12%] top-[16%]",
                "left-[3%] top-[52%]",
                "right-[5%] top-[55%]",
                "bottom-[10%] left-[25%]",
                "bottom-[8%] right-[24%]",
              ][index]
            }`}
          >
            {item}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-[290px] w-full max-w-[390px] items-center justify-center">
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className="absolute h-64 w-64 rounded-full border border-dashed border-emerald-400/40"
      />
      <svg
        viewBox="0 0 340 280"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M75 75 L170 140 L265 75 M75 205 L170 140 L265 205"
          stroke="currentColor"
          strokeOpacity=".25"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
      </svg>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={transition}
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/70 bg-gradient-to-br from-emerald-300 via-cyan-300 to-blue-400 text-white shadow-[0_25px_70px_rgba(16,185,129,0.2)]"
      >
        <Puzzle className="h-10 w-10" />
      </motion.div>
      {[
        { x: "left-[12%] top-[12%]", icon: Globe2 },
        { x: "right-[12%] top-[12%]", icon: DatabaseIcon },
        { x: "left-[12%] bottom-[12%]", icon: Code2 },
        { x: "right-[12%] bottom-[12%]", icon: Zap },
      ].map(({ x, icon: Icon }, index) => (
        <motion.div
          key={index}
          animate={reduceMotion ? undefined : { y: [0, index % 2 ? 6 : -6, 0] }}
          transition={{ ...transition, delay: index * 0.25 }}
          className={`absolute ${x} flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-lg`}
        >
          <Icon className="h-5 w-5 text-emerald-500" />
        </motion.div>
      ))}
    </div>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return <Layers3 className={className} />;
}

export default function ServicesPage() {
  const reduceMotion = useReducedMotion();
  const [selectedFit, setSelectedFit] = useState(0);

  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1000px] overflow-hidden"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 35, -20, 0],
                  y: [0, 30, -15, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-64 -top-52 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.15),transparent_70%)] blur-3xl"
        />
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -35, 20, 0],
                  y: [0, -15, 35, 0],
                  scale: [1, 0.94, 1.06, 1],
                }
          }
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-64 top-48 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_70%)] blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      </div>

      <section className="relative px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28 lg:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.6fr] lg:gap-20">
            <div>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-2.5 shadow-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:text-xs">
                  Nexus / Services
                </span>
              </motion.div>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08 }}
                className="max-w-5xl text-[clamp(3.8rem,9.4vw,9rem)] font-black leading-[0.88] tracking-[-0.09em]"
              >
                GOOD IDEAS.
                <br />
                <span className="bg-[var(--gradient-primary)] bg-clip-text pb-2">
                  BUILT PROPERLY.
                </span>
              </motion.h1>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="mt-8 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8"
              >
                Websites, applications, automation, AI, and integrations. We
                turn problems and ideas into digital tools designed to do
                something useful.
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <Link
                  href="/build"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-bold !text-white shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-6 py-3.5 text-sm font-bold transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  Explore services
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 25, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-full max-w-[430px] lg:mb-2"
            >
              <div className="absolute -inset-5 rounded-[38px] bg-gradient-to-br from-violet-400/15 via-cyan-300/10 to-pink-300/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[30px] border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.07)] sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      The bigger picture
                    </p>
                    <p className="mt-2 text-lg font-black tracking-tight">
                      One connected toolkit.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
                    <Layers3 className="h-5 w-5" />
                  </div>
                </div>

                <div className="relative my-7 flex items-center justify-center py-4">
                  <motion.div
                    animate={reduceMotion ? undefined : { rotate: 360 }}
                    transition={{
                      duration: 35,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute h-48 w-48 rounded-full border border-dashed border-[var(--text-secondary)]/20"
                  />
                  <motion.div
                    animate={reduceMotion ? undefined : { rotate: -360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute h-36 w-36 rounded-full border border-[var(--accent)]/20"
                  />
                  <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[28px] bg-[var(--accent)] text-white shadow-[0_15px_45px_rgba(99,102,241,0.25)]">
                    <Rocket className="h-10 w-10" />
                  </div>
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    const positions = [
                      "left-[8%] top-0",
                      "right-[8%] top-0",
                      "left-0 bottom-0",
                      "right-0 bottom-0",
                      "left-1/2 -translate-x-1/2 -bottom-3",
                    ];

                    return (
                      <motion.div
                        key={service.number}
                        animate={
                          reduceMotion
                            ? undefined
                            : { y: [0, index % 2 ? 5 : -5, 0] }
                        }
                        transition={{
                          duration: 4 + index * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`absolute ${positions[index]} z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-lg`}
                      >
                        <Icon className="h-5 w-5 text-[var(--text-primary)]" />
                      </motion.div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-5 gap-1.5 border-t border-[var(--card-border)] pt-5">
                  {services.map((service) => (
                    <div key={service.number} className="text-center">
                      <p className="text-[10px] font-black text-[var(--text-muted)]">
                        {service.number}
                      </p>
                      <div className="mx-auto mt-2 h-1 w-5 rounded-full bg-[var(--accent)]/60" />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
                Five capabilities. One place to start.
              </p>
            </motion.div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-3 border-t border-[var(--card-border)] pt-6 sm:grid-cols-4 sm:gap-5 lg:mt-28">
            {[
              ["01", "Understand the problem"],
              ["02", "Define the scope"],
              ["03", "Build the solution"],
              ["04", "Deliver the work"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-3 py-2">
                <span className="text-xs font-black text-[var(--text-muted)]">
                  {number}
                </span>
                <span className="text-xs font-semibold text-[var(--text-secondary)] sm:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="relative scroll-mt-20 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-col justify-between gap-5 border-b border-[var(--card-border)] pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
                01 / What we do
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                Pick your starting point.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
              Each service has its own approach. Some projects need one. Others
              combine several into a single solution.
            </p>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  className="group relative isolate overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-[var(--card)] transition-colors duration-300 hover:bg-[var(--surface-secondary)] sm:rounded-[34px]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[430px] w-[430px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_68%)] opacity-70 transition-transform duration-700 group-hover:scale-125"
                  />
                  <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="flex flex-col p-6 sm:p-9 lg:p-11">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-black tracking-wider text-[var(--text-muted)]">
                          {service.number}
                        </span>
                      </div>

                      <p className="mt-10 text-[9px] font-bold uppercase tracking-[0.23em] text-[var(--text-muted)] sm:text-[10px]">
                        {service.label}
                      </p>
                      <h3 className="mt-3 max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl lg:text-6xl">
                        {service.title}
                      </h3>
                      <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                        {service.description}
                      </p>

                      <Link
                        href={service.href}
                        className="group/link mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-bold !text-white transition-transform hover:translate-x-1"
                      >
                        Explore service
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                    </div>

                    <div className="relative flex min-h-[300px] flex-col justify-center overflow-hidden border-t border-[var(--card-border)] px-5 py-7 sm:px-9 lg:border-l lg:border-t-0 lg:px-10">
                      <div className="pointer-events-none absolute inset-0 opacity-40">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.07),transparent_65%)]" />
                      </div>
                      <div className="relative z-10">
                        <ServiceVisual
                          type={service.visual}
                          reduceMotion={reduceMotion}
                        />
                      </div>
                      <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-2">
                        {service.deliverables.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-3 py-3"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--surface-secondary)]">
                              <Check className="h-3 w-3" />
                            </span>
                            <span className="text-xs font-semibold text-[var(--text-secondary)] sm:text-sm">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="relative mt-4 text-xs leading-5 text-[var(--text-muted)]">
                        {service.detail}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 transition-transform duration-700 group-hover:scale-x-100" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--surface-secondary)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              02 / Find your fit
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">
              Not sure where to start?
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              You don't have to know the technical name for what you need. Start
              with the outcome you're looking for.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-[var(--text-muted)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card)]">
                <ArrowDownRight className="h-4 w-4" />
              </span>
              Choose the closest match
            </div>
          </div>

          <div className="min-w-0">
            <div className="space-y-2">
              {fitOptions.map((option, index) => {
                const Icon = option.icon;
                const selected = selectedFit === index;

                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setSelectedFit(index)}
                    aria-pressed={selected}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 ${
                      selected
                        ? "border-[var(--accent)] bg-[var(--card)] shadow-md"
                        : "border-[var(--card-border)] bg-[var(--card)]/60 hover:bg-[var(--card)]"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        selected
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold sm:text-base">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs text-[var(--text-muted)]">
                        {option.result}
                      </span>
                    </span>
                    <ChevronRight
                      className={`h-5 w-5 shrink-0 transition-transform ${
                        selected
                          ? "translate-x-0.5 text-[var(--accent)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <motion.div
              key={selectedFit}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 rounded-[24px] border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Your starting point
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">
                {fitOptions[selectedFit].result}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {fitOptions[selectedFit].description}
              </p>
              <Link
                href={fitOptions[selectedFit].href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-[var(--accent)]"
              >
                Explore this service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
                03 / The process
              </p>
              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                Clear steps.
                <br />
                <span className="text-[var(--text-secondary)]">
                  No guesswork.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                From the first conversation to the final handoff, the goal is
                simple: agree on the work, build it, and make sure you know
                what's happening along the way.
              </p>
              <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card)]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Agreed before we build</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Scope, deliverables, and price
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[var(--card-border)]" />
              <div className="space-y-3">
                {process.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={step.number}
                      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className="group relative flex gap-4 sm:gap-5"
                    >
                      <div className="relative z-10 flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-sm transition-colors group-hover:border-[var(--accent)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="mb-1 min-w-0 flex-1 rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] p-5 transition-colors group-hover:bg-[var(--surface-secondary)] sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-base font-black tracking-tight sm:text-lg">
                            {step.title}
                          </h3>
                          <span className="text-[10px] font-black tracking-wider text-[var(--text-muted)]">
                            {step.number}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--surface-secondary)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              04 / Transparent payment
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.07em] sm:text-6xl">
              Two payments. One clear agreement.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              The project scope and price are agreed in advance. You don't pay
              the entire project cost upfront, and the remaining payment is tied
              to completion of the agreed work.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="relative overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-[var(--card)] p-7 sm:p-10"
            >
              <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    To begin
                  </span>
                  <span className="rounded-full border border-[var(--card-border)] px-3 py-1 text-[10px] font-bold text-[var(--text-secondary)]">
                    Project kickoff
                  </span>
                </div>
                <p className="mt-6 text-7xl font-black tracking-[-0.09em] sm:text-8xl">
                  30
                  <span className="text-4xl text-[var(--text-secondary)]">
                    %
                  </span>
                </p>
                <h3 className="mt-5 text-xl font-black">Project advance</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                  Paid after the scope, price, and deliverables are agreed. This
                  starts the project.
                </p>
                <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                  <div className="h-full w-[30%] rounded-full bg-[var(--accent)]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="relative overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-[var(--card)] p-7 sm:p-10"
            >
              <div className="absolute -bottom-16 -right-12 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    At completion
                  </span>
                  <span className="rounded-full border border-[var(--card-border)] px-3 py-1 text-[10px] font-bold text-[var(--text-secondary)]">
                    Final handoff
                  </span>
                </div>
                <p className="mt-6 text-7xl font-black tracking-[-0.09em] sm:text-8xl">
                  70
                  <span className="text-4xl text-[var(--text-secondary)]">
                    %
                  </span>
                </p>
                <h3 className="mt-5 text-xl font-black">Remaining balance</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                  Paid once the agreed work is complete, before final handoff or
                  deployment.
                </p>
                <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                  <div className="h-full w-[70%] rounded-full bg-[var(--accent)]" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[
              "Agreed scope",
              "Clear deliverables",
              "Defined price",
              "Progress updates",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-2.5 text-xs font-semibold text-[var(--text-secondary)]"
              >
                <Check className="h-3.5 w-3.5" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] border border-[var(--card-border)] bg-[var(--card)] sm:rounded-[42px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.16),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.12),transparent_40%)]"
          />
          <motion.div
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -right-40 -top-48 h-[430px] w-[430px] rounded-full border border-[var(--card-border)]"
          />
          <motion.div
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -right-20 -top-28 h-[290px] w-[290px] rounded-full border border-dashed border-[var(--card-border)]"
          />

          <div className="relative grid items-center gap-10 px-7 py-14 sm:px-12 sm:py-20 lg:grid-cols-[1fr_auto] lg:px-16 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
                05 / Your move
              </p>
              <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.02em] sm:text-7xl lg:text-8xl">
                Have something
                <br />
                <span className="bg-[var(--gradient-primary)] bg-clip-text tracking-[-0.02em]">
                  in mind?
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                Bring the idea, the problem, or the task you want to improve.
                We'll work from there and define a clear starting point.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <Link
                href="/build"
                className="group inline-flex items-center gap-4 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-bold !text-white shadow-lg transition-transform hover:-translate-y-1 sm:px-7 sm:py-4"
              >
                Start a project
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
