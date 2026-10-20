"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  Code2,
  Database,
  Gauge,
  Layers3,
  LockKeyhole,
  MousePointer2,
  Network,
  PanelsTopLeft,
  Puzzle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useCallback, useState, type MouseEvent, type ReactNode } from "react";

const services = [
  {
    icon: PanelsTopLeft,
    number: "01",
    title: "Dashboards and portals",
    description:
      "Give customers, employees, or administrators a dedicated place to access information, manage work, and take action.",
    tags: ["Role-based views", "Live information", "Clear navigation"],
  },
  {
    icon: Database,
    number: "02",
    title: "Data-driven platforms",
    description:
      "Turn scattered information into a connected application with structured data, useful filters, and workflows that make sense.",
    tags: ["Database design", "Search and filtering", "Data management"],
  },
  {
    icon: Workflow,
    number: "03",
    title: "Business applications",
    description:
      "Replace disconnected processes with purpose-built software for requests, operations, internal tools, and everyday work.",
    tags: ["Custom workflows", "Team collaboration", "Less repetition"],
  },
  {
    icon: Puzzle,
    number: "04",
    title: "Interactive products",
    description:
      "Build experiences where users do more than browse: configure, create, submit, track, and manage things themselves.",
    tags: ["Interactive interfaces", "User accounts", "Product features"],
  },
];

const principles = [
  {
    icon: Layers3,
    title: "An interface with purpose",
    description:
      "Every screen should help someone understand where they are, what matters, and what to do next.",
  },
  {
    icon: ShieldCheck,
    title: "Security from the start",
    description:
      "Authentication, authorization, validation, and sensible data handling belong in the foundation.",
  },
  {
    icon: Gauge,
    title: "Performance that scales",
    description:
      "Responsive interfaces and efficient data access keep the experience useful as the application grows.",
  },
  {
    icon: RefreshCw,
    title: "Built to evolve",
    description:
      "A maintainable structure makes it easier to add features, fix issues, and adapt to changing requirements.",
  },
];

const stages = [
  {
    number: "01",
    title: "Understand the problem",
    detail:
      "We map the users, the tasks they need to complete, and the friction in the current process.",
    output: "Requirements and feature priorities",
  },
  {
    number: "02",
    title: "Plan the experience",
    detail:
      "We establish the screens, navigation, information architecture, and key interactions before implementation.",
    output: "Application structure and user flows",
  },
  {
    number: "03",
    title: "Build the system",
    detail:
      "The frontend, backend, data model, and integrations come together into one coherent application.",
    output: "A working application",
  },
  {
    number: "04",
    title: "Test and refine",
    detail:
      "We review important flows, validate inputs, check responsive behavior, and address issues before launch.",
    output: "A refined, tested experience",
  },
  {
    number: "05",
    title: "Launch and hand over",
    detail:
      "We prepare the deployment and hand over the agreed deliverables with the information needed to operate them.",
    output: "Deployment and handoff",
  },
];

const faqs = [
  {
    question: "What is the difference between a website and a web application?",
    answer:
      "A website primarily presents information. A web application lets people perform tasks through interactive features, accounts, saved data, dashboards, and workflows. Some projects combine both.",
  },
  {
    question: "Can you build an application with user accounts?",
    answer:
      "Yes. Depending on the requirements, an application can include sign-up, login, protected pages, role-based permissions, and user-specific information.",
  },
  {
    question: "Can my application connect to a database or an API?",
    answer:
      "Yes. We can plan the data layer and connect suitable APIs or external services based on their availability, documentation, and your project's needs.",
  },
  {
    question: "Can you improve an application I already have?",
    answer:
      "Existing applications can be reviewed for usability, performance, maintainability, and missing features. The scope depends on the current codebase and access available.",
  },
  {
    question: "How long does an application take to build?",
    answer:
      "It depends on the number of features, complexity of the backend, integrations, and testing requirements. We establish a realistic scope and timeline before work begins.",
  },
  {
    question: "What happens after launch?",
    answer:
      "The handoff follows the agreed scope. Ongoing maintenance, monitoring, additional features, and future improvements can be discussed as separate work.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

function OrbitalInterface() {
  const handleMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--pointer-x", `${x * 24}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 24}px`);
  }, []);

  const handleLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "0px");
    event.currentTarget.style.setProperty("--pointer-y", "0px");
  }, []);

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="interface-scene relative mx-auto flex min-h-[430px] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-secondary)] p-5 sm:min-h-[520px] sm:p-8"
      aria-label="Decorative illustration of a connected web application interface"
    >
      <div className="scene-glow pointer-events-none absolute inset-0" />

      <div className="orbit orbit-one pointer-events-none absolute h-[270px] w-[270px] rounded-full border border-[var(--card-border)] sm:h-[360px] sm:w-[360px]" />
      <div className="orbit orbit-two pointer-events-none absolute h-[200px] w-[200px] rounded-full border border-[var(--card-border)] sm:h-[280px] sm:w-[280px]" />
      <div className="orbit orbit-three pointer-events-none absolute h-[125px] w-[125px] rounded-full border border-[var(--card-border)] sm:h-[190px] sm:w-[190px]" />

      <div className="scene-geometry geometry-ring absolute left-[12%] top-[13%]">
        <div className="ring-core" />
      </div>

      <div className="scene-geometry geometry-cube absolute right-[12%] top-[19%]">
        <div className="cube-face cube-front" />
        <div className="cube-face cube-side" />
        <div className="cube-face cube-top" />
      </div>

      <div className="scene-geometry geometry-diamond absolute bottom-[14%] left-[13%]">
        <div />
      </div>

      <div className="scene-geometry geometry-sphere absolute bottom-[18%] right-[12%]">
        <div className="sphere-highlight" />
      </div>

      <div className="scene-geometry geometry-cross absolute right-[24%] top-[43%]">
        <span />
        <span />
      </div>

      <div className="interface-window relative z-10 w-full max-w-[390px] overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-[var(--shadow-md)]">
        <div className="flex items-center justify-between border-b border-[var(--card-border)] px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-[var(--text-secondary)] opacity-40" />
              <span className="h-2 w-2 rounded-full bg-[var(--text-secondary)] opacity-25" />
              <span className="h-2 w-2 rounded-full bg-[var(--text-secondary)] opacity-15" />
            </div>
            <span className="ml-2 text-xs font-medium text-[var(--text-secondary)]">
              Workspace
            </span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--card-border)]">
            <PanelsTopLeft size={13} />
          </div>
        </div>

        <div className="grid grid-cols-[84px_1fr] sm:grid-cols-[100px_1fr]">
          <div className="space-y-4 border-r border-[var(--card-border)] p-3 pt-5">
            <div className="mb-5 flex items-center gap-2 px-1">
              <div className="h-5 w-5 rounded-md bg-[var(--accent)]" />
              <div className="h-2 w-8 rounded-full bg-[var(--text-primary)] opacity-60" />
            </div>
            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`flex items-center gap-2 rounded-lg p-2 ${
                  item === 0 ? "bg-[var(--surface-secondary)]" : ""
                }`}
              >
                <span
                  className={`h-3 w-3 rounded-sm ${
                    item === 0
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--text-secondary)] opacity-25"
                  }`}
                />
                <span
                  className="h-1.5 flex-1 rounded-full bg-[var(--text-secondary)]"
                  style={{ opacity: item === 0 ? 0.65 : 0.2 }}
                />
              </div>
            ))}
            <div className="mt-8 border-t border-[var(--card-border)] pt-4">
              <div className="h-1.5 w-10 rounded-full bg-[var(--text-secondary)] opacity-20" />
            </div>
          </div>

          <div className="min-w-0 p-3.5 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="h-2 w-20 rounded-full bg-[var(--text-secondary)] opacity-35" />
                <div className="mt-3 h-5 w-28 rounded-md bg-[var(--text-primary)] opacity-80 sm:w-36" />
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] text-white">
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {[
                { label: "Activity", width: "72%" },
                { label: "Progress", width: "54%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[var(--card-border)] p-3"
                >
                  <p className="text-[10px] text-[var(--text-secondary)]">
                    {item.label}
                  </p>
                  <div className="mt-2 h-4 w-12 rounded bg-[var(--text-primary)] opacity-70" />
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                    <div
                      className="h-full rounded-full bg-[var(--accent)]"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-[var(--card-border)] p-3">
              <div className="flex items-center justify-between">
                <div className="h-2 w-20 rounded-full bg-[var(--text-secondary)] opacity-40" />
                <div className="h-1.5 w-8 rounded-full bg-[var(--accent)] opacity-70" />
              </div>
              <div className="mt-4 flex h-[72px] items-end gap-2">
                {[36, 58, 43, 77, 53, 88, 64, 96, 70, 82, 56, 73].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-sm bg-[var(--accent)]"
                      style={{
                        height: `${height}%`,
                        opacity: 0.25 + (index / 12) * 0.65,
                      }}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--card-border)] p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
                <Check size={15} className="text-[var(--accent)]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="h-2 w-20 rounded-full bg-[var(--text-primary)] opacity-55" />
                <div className="mt-2 h-1.5 w-28 max-w-full rounded-full bg-[var(--text-secondary)] opacity-20" />
              </div>
              <span className="rounded-full border border-[var(--card-border)] px-2 py-1 text-[9px] text-[var(--text-secondary)]">
                Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="floating-chip chip-top absolute left-[4%] top-[38%] z-20 flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-3 py-2.5 shadow-[var(--shadow-md)] sm:left-[1%]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
          <Database size={14} />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[var(--text-primary)]">
            Data layer
          </p>
          <p className="text-[9px] text-[var(--text-secondary)]">Connected</p>
        </div>
      </div>

      <div className="floating-chip chip-bottom absolute bottom-[12%] right-[3%] z-20 flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-3 py-2.5 shadow-[var(--shadow-md)] sm:right-[1%]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
          <LockKeyhole size={14} />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[var(--text-primary)]">
            Protected
          </p>
          <p className="text-[9px] text-[var(--text-secondary)]">
            Access control
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] text-[var(--text-secondary)] sm:bottom-7 sm:left-7">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        An application shaped around your work
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  number,
  title,
  description,
  tags,
}: {
  icon: typeof Code2;
  number: string;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-7">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--surface-secondary)] transition-colors group-hover:border-[var(--accent)]">
          <Icon size={21} strokeWidth={1.7} />
        </div>
        <span className="text-xs font-medium tracking-widest text-[var(--text-secondary)]">
          {number}
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-secondary)]">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--card-border)] px-2.5 py-1.5 text-[10px] text-[var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function PrincipleCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Code2;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 border-b border-[var(--card-border)] py-6 last:border-b-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
        <Icon size={18} />
      </div>
      <div>
        <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
}

function FlowNode({
  icon: Icon,
  label,
  detail,
}: {
  icon: typeof Code2;
  label: string;
  detail: string;
}) {
  return (
    <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-center sm:p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
        <Icon size={19} />
      </div>
      <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </p>
      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
        {detail}
      </p>
    </div>
  );
}

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--card-border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="flex items-start gap-4">
          <span className="pt-0.5 text-xs tabular-nums text-[var(--text-secondary)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-medium leading-6 text-[var(--text-primary)]">
            {question}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--text-secondary)] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-8 text-sm leading-7 text-[var(--text-secondary)] sm:pl-10">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        secondary
          ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
          : "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold !text-white transition hover:opacity-90"
      }
    >
      {children}
    </Link>
  );
}

export default function WebApplicationsPage() {
  const [selectedType, setSelectedType] = useState("Customer-facing");

  const typeDetails: Record<string, { title: string; points: string[] }> = {
    "Customer-facing": {
      title: "Give users a place to get things done.",
      points: [
        "Account creation and personalized experiences",
        "Self-service tools and interactive features",
        "Clear feedback and useful progress tracking",
      ],
    },
    "Internal tools": {
      title: "Make everyday operations easier to manage.",
      points: [
        "Staff dashboards and administrative interfaces",
        "Structured requests, records, and approvals",
        "Permission-aware tools for different team roles",
      ],
    },
    "Digital products": {
      title: "Turn an idea into a usable online product.",
      points: [
        "Purpose-built features and user journeys",
        "Data-backed functionality and account systems",
        "A foundation that can evolve with your roadmap",
      ],
    },
  };

  return (
    <main className="overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <style jsx>{`
        .interface-scene {
          --pointer-x: 0px;
          --pointer-y: 0px;
          isolation: isolate;
          perspective: 1000px;
        }

        .scene-glow {
          background:
            radial-gradient(
              circle at 52% 46%,
              var(--selection),
              transparent 45%
            ),
            radial-gradient(circle at 15% 80%, var(--accent), transparent 36%);
          opacity: 0.24;
        }

        .orbit {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-one {
          animation: orbit-spin 32s linear infinite;
          border-style: dashed;
          opacity: 0.6;
        }

        .orbit-two {
          animation: orbit-spin 24s linear infinite reverse;
          border-style: dotted;
          opacity: 0.75;
        }

        .orbit-three {
          opacity: 0.6;
        }

        .scene-geometry {
          z-index: 1;
          transform: translate3d(var(--pointer-x), var(--pointer-y), 0)
            rotateX(-10deg) rotateY(16deg);
          transition: transform 450ms ease-out;
        }

        .geometry-ring {
          width: 52px;
          height: 52px;
          border: 8px solid var(--accent);
          border-radius: 50%;
          opacity: 0.7;
          animation: ring-float 7s ease-in-out infinite;
          box-shadow: 0 0 22px var(--selection);
        }

        .ring-core {
          position: absolute;
          inset: 5px;
          border: 1px solid var(--card-border);
          border-radius: 50%;
        }

        .geometry-cube {
          width: 42px;
          height: 42px;
          transform-style: preserve-3d;
          animation: cube-float 8s ease-in-out infinite;
        }

        .cube-face {
          position: absolute;
          width: 42px;
          height: 42px;
          border: 1px solid var(--accent);
          background: var(--selection);
          opacity: 0.7;
        }

        .cube-front {
          transform: translateZ(21px);
        }

        .cube-side {
          transform: rotateY(90deg) translateZ(21px);
          opacity: 0.35;
        }

        .cube-top {
          transform: rotateX(90deg) translateZ(21px);
          opacity: 0.5;
        }

        .geometry-diamond {
          width: 36px;
          height: 36px;
          transform: translate3d(var(--pointer-x), var(--pointer-y), 0)
            rotate(45deg);
          animation: diamond-float 6s ease-in-out infinite;
        }

        .geometry-diamond > div {
          width: 100%;
          height: 100%;
          border: 1px solid var(--accent);
          background: var(--selection);
          opacity: 0.65;
        }

        .geometry-sphere {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--card-border);
          background: radial-gradient(
            circle at 30% 25%,
            var(--card),
            var(--accent)
          );
          opacity: 0.7;
          box-shadow: inset -8px -8px 15px var(--selection);
          animation: sphere-float 9s ease-in-out infinite;
        }

        .sphere-highlight {
          position: absolute;
          left: 9px;
          top: 7px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--card);
          opacity: 0.85;
        }

        .geometry-cross {
          width: 22px;
          height: 22px;
          animation: cross-float 5s ease-in-out infinite;
        }

        .geometry-cross span {
          position: absolute;
          left: 50%;
          top: 50%;
          display: block;
          width: 100%;
          height: 2px;
          background: var(--accent);
          transform: translate(-50%, -50%);
        }

        .geometry-cross span + span {
          transform: translate(-50%, -50%) rotate(90deg);
        }

        .interface-window {
          transform: translate3d(
              calc(var(--pointer-x) * -0.35),
              calc(var(--pointer-y) * -0.35),
              0
            )
            rotateY(-3deg) rotateX(2deg);
          transition: transform 350ms ease-out;
        }

        .floating-chip {
          animation: chip-float 7s ease-in-out infinite;
        }

        .chip-bottom {
          animation-delay: -3.5s;
        }

        @keyframes orbit-spin {
          from {
            rotate: 0deg;
          }
          to {
            rotate: 360deg;
          }
        }

        @keyframes ring-float {
          0%,
          100% {
            transform: translateY(0) rotateX(35deg);
          }
          50% {
            transform: translateY(-13px) rotateX(35deg) rotateY(25deg);
          }
        }

        @keyframes cube-float {
          0%,
          100% {
            transform: rotateX(-18deg) rotateY(25deg) translateY(0);
          }
          50% {
            transform: rotateX(25deg) rotateY(100deg) translateY(-14px);
          }
        }

        @keyframes diamond-float {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -14px;
          }
        }

        @keyframes sphere-float {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 8px -12px;
          }
        }

        @keyframes cross-float {
          0%,
          100% {
            transform: rotate(0deg) translateY(0);
          }
          50% {
            transform: rotate(45deg) translateY(-10px);
          }
        }

        @keyframes chip-float {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit,
          .scene-geometry,
          .floating-chip {
            animation: none !important;
            transition: none !important;
          }

          .interface-window {
            transition: none !important;
          }
        }
      `}</style>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              Nexus / Web applications
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.055em] text-[var(--text-primary)] sm:text-6xl lg:text-[4.5rem]">
              Software that works the way{" "}
              <span className="relative inline-block">
                <span className="relative z-10">you do.</span>
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-full bg-[var(--selection)] sm:bottom-2 sm:h-4" />
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              Go beyond a website. Build a connected digital experience with
              useful features, reliable data, and workflows designed around the
              people who use it.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ServiceLink href="/build">
                Start a project
                <ArrowUpRight size={16} />
              </ServiceLink>
              <ServiceLink href="/services" secondary>
                All services
                <ArrowRight size={16} />
              </ServiceLink>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-[var(--card-border)] pt-6">
              {[
                { value: "01", label: "Purpose-built" },
                { value: "02", label: "Connected systems" },
                { value: "03", label: "Ready to evolve" },
              ].map((item) => (
                <div key={item.value} className="pr-3">
                  <p className="text-xs font-semibold tracking-widest text-[var(--accent)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)] sm:text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-2">
            <OrbitalInterface />
          </div>
        </div>

        <div className="mt-16 flex items-center gap-3 text-xs text-[var(--text-secondary)] sm:mt-20">
          <ArrowDown size={15} />
          <span>Explore what your application could become</span>
          <span className="h-px flex-1 bg-[var(--card-border)]" />
        </div>
      </section>

      <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              The bigger picture
            </p>
            <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Your idea deserves more than disconnected screens.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
            <p>
              A useful web application is a system, not just an interface.
              People need to move between tasks, information needs to stay
              consistent, and important actions need to behave predictably.
            </p>
            <p>
              Nexus helps bring those pieces together—from the user experience
              and application logic to data storage and external services—so the
              result serves a real purpose instead of adding another layer of
              complexity.
            </p>
            <div className="flex items-start gap-3 border-l-2 border-[var(--accent)] pl-4 pt-1">
              <Sparkles
                size={18}
                className="mt-1 shrink-0 text-[var(--accent)]"
              />
              <p className="font-medium text-[var(--text-primary)]">
                Start with the problem. Build only the features that help solve
                it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="What we build"
          title="Applications made for real work."
          description="Different challenges call for different tools. The right application starts with what its users need to accomplish."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <FeatureCard key={service.number} {...service} />
          ))}
        </div>

        <div className="mt-7 flex flex-col justify-between gap-5 rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-2xl">
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              Have an idea that doesn't fit neatly into a category?
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              We can define the requirements and shape the right solution around
              your use case.
            </p>
          </div>
          <Link
            href="/build"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)]"
          >
            Start a project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="bg-[var(--surface-secondary)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="Built with intention"
              title="The experience is only half the system."
              description="A polished interface matters. So does everything behind it: the data, permissions, performance, and structure that make it dependable."
            />
            <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                  <Network size={19} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    One connected system
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Interface · Logic · Data
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2">
                {["UI", "API", "DB"].map((label, index) => (
                  <div key={label} className="flex flex-1 items-center gap-2">
                    <div className="flex h-10 flex-1 items-center justify-center rounded-lg border border-[var(--card-border)] text-xs font-semibold">
                      {label}
                    </div>
                    {index < 2 && (
                      <ArrowRight
                        size={13}
                        className="shrink-0 text-[var(--text-secondary)]"
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-[var(--text-secondary)]">
                The architecture depends on the project. The goal is to keep the
                parts understandable, connected, and maintainable.
              </p>
            </div>
          </div>

          <div className="divide-y divide-[var(--card-border)]">
            {principles.map((principle) => (
              <PrincipleCard key={principle.title} {...principle} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Find your direction"
              title="What are you building?"
              description="The best starting point is the kind of experience you want people to have."
            />
            <div className="mt-8 flex flex-col gap-2">
              {Object.keys(typeDetails).map((type, index) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-4 text-left transition ${
                    selectedType === type
                      ? "border-[var(--accent)] bg-[var(--surface-secondary)]"
                      : "border-[var(--card-border)] hover:bg-[var(--surface-secondary)]"
                  }`}
                  aria-pressed={selectedType === type}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs tabular-nums text-[var(--text-secondary)]">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-medium">{type}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className={
                      selectedType === type
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-secondary)]"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[350px] overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-6 sm:p-10">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[var(--card-border)]" />
            <div className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full border border-[var(--card-border)]" />
            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
                {selectedType === "Customer-facing" ? (
                  <MousePointer2 size={20} />
                ) : selectedType === "Internal tools" ? (
                  <Boxes size={20} />
                ) : (
                  <Code2 size={20} />
                )}
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                {selectedType}
              </p>
              <h3 className="mt-3 max-w-lg text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                {typeDetails[selectedType].title}
              </h3>
              <div className="mt-7 space-y-4">
                {typeDetails[selectedType].points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card)]">
                      <Check size={12} />
                    </div>
                    <p className="text-sm leading-6 text-[var(--text-secondary)]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-9 border-t border-[var(--card-border)] pt-6">
                <Link
                  href="/build"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)]"
                >
                  Start a project
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <SectionHeading
            eyebrow="How it fits together"
            title="A system with clear connections."
            description="A typical application brings several layers together. The exact implementation is shaped by the project's scope."
            align="center"
          />

          <div className="relative mt-12">
            <div className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-[var(--card-border)] md:block" />
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FlowNode
                icon={PanelsTopLeft}
                label="Interface"
                detail="Screens, forms, and interactions"
              />
              <FlowNode
                icon={Code2}
                label="Application logic"
                detail="Rules, validation, and workflows"
              />
              <FlowNode
                icon={Database}
                label="Data"
                detail="Records and information storage"
              />
              <FlowNode
                icon={Network}
                label="Integrations"
                detail="External services and APIs"
              />
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-6 text-[var(--text-secondary)]">
            Not every application needs every component. We select the
            appropriate architecture for the actual requirements instead of
            adding unnecessary complexity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="The process"
          title="From first idea to working software."
          description="A structured process keeps decisions visible, scope understandable, and development focused on the intended outcome."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {stages.map((stage, index) => (
            <article
              key={stage.number}
              className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-[var(--accent)]">
                  {stage.number}
                </span>
                {index < stages.length - 1 && (
                  <ArrowRight
                    size={15}
                    className="hidden text-[var(--text-secondary)] lg:block"
                  />
                )}
              </div>
              <h3 className="mt-7 text-lg font-semibold tracking-tight">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {stage.detail}
              </p>
              <div className="mt-6 border-t border-[var(--card-border)] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Outcome
                </p>
                <p className="mt-2 text-xs font-medium leading-5 text-[var(--text-primary)]">
                  {stage.output}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-lg font-semibold">
              Clear scope. Agreed deliverables.
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              Features, timelines, and handoff expectations are established
              before development begins.
            </p>
          </div>
          <ServiceLink href="/build">
            Start a project
            <ArrowUpRight size={16} />
          </ServiceLink>
        </div>
      </section>

      <section className="bg-[var(--surface-secondary)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <SectionHeading
              eyebrow="Common questions"
              title="Before you build."
              description="A few things worth understanding before turning your idea into an application."
            />
          </div>
          <div>
            {faqs.map((faq, index) => (
              <FaqItem key={faq.question} {...faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-secondary)] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-[var(--card-border)]" />
          <div className="pointer-events-none absolute -right-2 -top-6 h-44 w-44 rounded-full border border-[var(--card-border)]" />
          <div className="pointer-events-none absolute bottom-[-100px] left-[35%] h-48 w-48 rounded-full bg-[var(--accent)] opacity-[0.06] blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
              <Zap size={21} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Your idea, engineered
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
              Ready to build something people can actually use?
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
              Start with the challenge you want to solve. We can work from there
              to define the features, structure, and a realistic plan for your
              application.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ServiceLink href="/build">
                Start a project
                <ArrowUpRight size={16} />
              </ServiceLink>
              <ServiceLink href="/services" secondary>
                All services
                <ArrowRight size={16} />
              </ServiceLink>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Explore other services"
        className="border-t border-[var(--card-border)]"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <Link
            href="/services/websites"
            className="group flex items-center gap-3 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <ArrowDownRight
              size={17}
              className="rotate-[135deg] transition-transform group-hover:-translate-x-1"
            />
            <span>
              <span className="block text-xs text-[var(--text-secondary)]">
                Previous service
              </span>
              <span className="mt-1 block font-semibold text-[var(--text-primary)]">
                Website Development
              </span>
            </span>
          </Link>

          <Link
            href="/services/automation"
            className="group flex items-center gap-3 self-start text-left sm:self-auto sm:text-right"
          >
            <span>
              <span className="block text-xs text-[var(--text-secondary)]">
                Next service
              </span>
              <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                Business Automation
              </span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card)] transition group-hover:border-[var(--accent)]">
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
