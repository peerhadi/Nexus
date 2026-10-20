"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  ArrowRightLeft,
  Braces,
  Check,
  ChevronDown,
  CircleDot,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Link2,
  LockKeyhole,
  MessageSquare,
  Plus,
  RefreshCw,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

const integrations = [
  {
    id: "website",
    name: "Your website",
    category: "Source",
    symbol: "N",
    color: "#7c8cff",
  },
  {
    id: "database",
    name: "Database",
    category: "Storage",
    symbol: "DB",
    color: "#43c9b6",
  },
  {
    id: "email",
    name: "Email",
    category: "Communication",
    symbol: "@",
    color: "#f4a76b",
  },
  {
    id: "chat",
    name: "Team chat",
    category: "Communication",
    symbol: "#",
    color: "#d78af4",
  },
  {
    id: "payments",
    name: "Payments",
    category: "Commerce",
    symbol: "$",
    color: "#76d69b",
  },
  {
    id: "api",
    name: "External API",
    category: "Data",
    symbol: "{ }",
    color: "#75baff",
  },
];

const capabilities = [
  {
    icon: Workflow,
    number: "01",
    title: "Workflow orchestration",
    description:
      "Connect events, conditions, and actions into dependable workflows that move information without repetitive manual work.",
    tags: ["Event triggers", "Conditional logic", "Multi-step flows"],
  },
  {
    icon: Braces,
    number: "02",
    title: "API development",
    description:
      "Build the endpoints, request handling, and data transformations your systems need to communicate reliably.",
    tags: ["REST APIs", "Webhooks", "Data mapping"],
  },
  {
    icon: Database,
    number: "03",
    title: "Data synchronisation",
    description:
      "Keep the right information consistent across services, with thoughtful handling of updates, failures, and duplicates.",
    tags: ["Sync rules", "Validation", "Error recovery"],
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Secure connections",
    description:
      "Design integrations around scoped credentials, server-side secrets, validation, and clear access boundaries.",
    tags: ["Credential safety", "Access control", "Monitoring"],
  },
];

const process = [
  {
    step: "01",
    title: "Map the ecosystem",
    text: "We identify the systems involved, where information originates, what must be shared, and which rules govern the flow.",
    icon: Globe,
  },
  {
    step: "02",
    title: "Design the connection",
    text: "We choose the right APIs, webhooks, data formats, triggers, and failure-handling strategy before building.",
    icon: GitBranch,
  },
  {
    step: "03",
    title: "Build and verify",
    text: "We implement the integration and test normal requests, missing data, duplicate events, authentication, and failures.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Deploy and monitor",
    text: "We prepare the connection for production, document its behaviour, and establish useful visibility into errors.",
    icon: RefreshCw,
  },
];

const faqs = [
  {
    q: "Can you connect software that does not have a native integration?",
    a: "Often, yes. If a service exposes an API, webhook, or another supported data interface, we can assess a custom connection. The exact approach depends on the service's capabilities and access restrictions.",
  },
  {
    q: "What is the difference between an API and a webhook?",
    a: "An API generally lets one system request information or perform an action in another system. A webhook lets a service notify another system when an event occurs. Many integrations use both.",
  },
  {
    q: "Can you connect our existing website to a database or payment service?",
    a: "Yes. We can assess your existing architecture and connect suitable services while keeping credentials server-side and validating data at the appropriate boundaries.",
  },
  {
    q: "What happens if an integration fails?",
    a: "Failure handling can include timeouts, retries, validation, useful error logs, and duplicate-event protection. The right safeguards depend on the workflow and the consequences of a failed operation.",
  },
  {
    q: "Can you maintain an integration after launch?",
    a: "We can discuss monitoring, documentation, fixes, and future changes as part of the project's agreed scope.",
  },
];

type NodeId = (typeof integrations)[number]["id"];

const initialConnections: [NodeId, NodeId][] = [
  ["website", "api"],
  ["api", "database"],
  ["api", "email"],
];

export default function IntegrationsPage() {
  const [activeNodes, setActiveNodes] = useState<NodeId[]>([
    "website",
    "api",
    "database",
    "email",
  ]);
  const [connections, setConnections] =
    useState<[NodeId, NodeId][]>(initialConnections);
  const [selectedNode, setSelectedNode] = useState<NodeId | null>(null);
  const [running, setRunning] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handlePointer = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const toggleNode = (id: NodeId) => {
    setActiveNodes((current) => {
      if (current.includes(id)) {
        setConnections((edges) =>
          edges.filter(([from, to]) => from !== id && to !== id),
        );
        if (selectedNode === id) setSelectedNode(null);
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const handleNodeClick = (id: NodeId) => {
    if (!activeNodes.includes(id)) {
      toggleNode(id);
      setSelectedNode(id);
      return;
    }

    if (!selectedNode) {
      setSelectedNode(id);
      return;
    }

    if (selectedNode === id) {
      setSelectedNode(null);
      return;
    }

    const alreadyConnected = connections.some(
      ([from, to]) =>
        (from === selectedNode && to === id) ||
        (from === id && to === selectedNode),
    );

    if (alreadyConnected) {
      setConnections((current) =>
        current.filter(
          ([from, to]) =>
            !(
              (from === selectedNode && to === id) ||
              (from === id && to === selectedNode)
            ),
        ),
      );
    } else {
      setConnections((current) => [...current, [selectedNode, id]]);
    }

    setSelectedNode(null);
  };

  const runWorkflow = () => {
    if (running || activeNodes.length < 2) return;

    setRunning(true);
    setRunCount((count) => count + 1);

    window.setTimeout(
      () => {
        setRunning(false);
      },
      reducedMotion ? 100 : 1800,
    );
  };

  const nodePositions: Record<NodeId, { x: number; y: number }> = {
    website: { x: 15, y: 27 },
    database: { x: 80, y: 23 },
    email: { x: 81, y: 76 },
    chat: { x: 50, y: 88 },
    payments: { x: 15, y: 75 },
    api: { x: 49, y: 49 },
  };

  const nodeById = Object.fromEntries(
    integrations.map((item) => [item.id, item]),
  ) as Record<NodeId, (typeof integrations)[number]>;

  return (
    <main className="integration-page overflow-hidden">
      <style jsx global>{`
        .integration-page {
          --integration-line: var(--card-border);
          --integration-panel: var(--surface-secondary);
          position: relative;
          color: var(--text-primary);
          isolation: isolate;
        }

        .integration-page * {
          box-sizing: border-box;
        }

        .integration-page .integration-grid {
          background-image:
            linear-gradient(
              to right,
              var(--integration-line) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              var(--integration-line) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, black, transparent 95%);
          opacity: 0.27;
        }

        .integration-page .integration-glow {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(60px);
          opacity: 0.24;
          will-change: transform;
        }

        .integration-page .integration-orb {
          transform-style: preserve-3d;
          animation: integration-orbit 9s ease-in-out infinite;
          will-change: transform;
        }

        .integration-page .integration-orb:nth-child(2n) {
          animation-delay: -3s;
          animation-duration: 12s;
        }

        .integration-page .integration-orb:nth-child(3n) {
          animation-delay: -5s;
          animation-duration: 15s;
        }

        .integration-page .integration-float {
          animation: integration-float 6s ease-in-out infinite;
        }

        .integration-page .integration-float-delay {
          animation: integration-float 7s ease-in-out -2.5s infinite;
        }

        .integration-page .integration-ring {
          animation: integration-spin 26s linear infinite;
          transform-origin: center;
        }

        .integration-page .integration-ring-reverse {
          animation: integration-spin 34s linear infinite reverse;
          transform-origin: center;
        }

        .integration-page .integration-node {
          transition:
            transform 240ms ease,
            border-color 240ms ease,
            box-shadow 240ms ease,
            background 240ms ease;
          transform-style: preserve-3d;
        }

        .integration-page .integration-node:hover {
          transform: translateY(-5px) rotateX(5deg) rotateY(-5deg);
        }

        .integration-page .integration-particle {
          offset-path: path("M 0 0 C 70 -50 130 50 200 0");
          animation: integration-particle 2.8s linear infinite;
        }

        .integration-page .integration-particle:nth-child(2) {
          animation-delay: -0.8s;
        }

        .integration-page .integration-particle:nth-child(3) {
          animation-delay: -1.6s;
        }

        .integration-page .integration-marquee {
          animation: integration-marquee 30s linear infinite;
          width: max-content;
        }

        .integration-page .integration-marquee:hover {
          animation-play-state: paused;
        }

        .integration-page .integration-flow-line {
          stroke-dasharray: 7 9;
          animation: integration-dash 1.3s linear infinite;
        }

        .integration-page .integration-flow-line.is-idle {
          animation-duration: 3.2s;
          opacity: 0.42;
        }

        .integration-page .integration-card {
          background: var(--card);
          border: 1px solid var(--card-border);
          box-shadow: var(--shadow-md);
        }

        .integration-page .integration-muted {
          color: var(--text-secondary);
        }

        .integration-page .integration-kicker {
          color: var(--accent);
        }

        .integration-page .integration-button-primary {
          color: white !important;
          background: var(--accent);
          transition:
            transform 200ms ease,
            box-shadow 200ms ease,
            filter 200ms ease;
        }

        .integration-page .integration-button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 34px
            color-mix(in srgb, var(--accent) 26%, transparent);
          filter: brightness(1.06);
        }

        .integration-page .integration-button-secondary {
          border: 1px solid var(--card-border);
          background: var(--card);
          transition:
            transform 200ms ease,
            border-color 200ms ease;
        }

        .integration-page .integration-button-secondary:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
        }

        .integration-page .integration-faq {
          transition: border-color 200ms ease;
        }

        .integration-page .integration-faq:hover {
          border-color: var(--accent);
        }

        .integration-page .integration-faq-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 260ms ease;
        }

        .integration-page .integration-faq-content.is-open {
          grid-template-rows: 1fr;
        }

        .integration-page .integration-faq-inner {
          overflow: hidden;
        }

        @keyframes integration-orbit {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)
              rotateZ(0deg);
          }
          25% {
            transform: translate3d(12px, -17px, 20px) rotateX(15deg)
              rotateY(24deg) rotateZ(10deg);
          }
          50% {
            transform: translate3d(-8px, -25px, -12px) rotateX(-12deg)
              rotateY(38deg) rotateZ(20deg);
          }
          75% {
            transform: translate3d(-18px, -8px, 10px) rotateX(18deg)
              rotateY(10deg) rotateZ(-12deg);
          }
        }

        @keyframes integration-float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(4deg);
          }
        }

        @keyframes integration-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes integration-particle {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }

        @keyframes integration-marquee {
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes integration-dash {
          to {
            stroke-dashoffset: -32;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .integration-page *,
          .integration-page *::before,
          .integration-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        ref={heroRef}
        onMouseMove={handlePointer}
        className="relative px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-12 lg:pt-32"
      >
        <div className="integration-grid absolute inset-0 -z-10" />

        <div
          className="integration-glow -z-10 h-80 w-80"
          style={{
            left: `${pointer.x * 0.35}%`,
            top: `${pointer.y * 0.3}%`,
            background: "var(--accent)",
            transition: "left 300ms ease, top 300ms ease",
          }}
        />

        <div
          className="integration-glow -z-10 h-72 w-72"
          style={{
            right: "8%",
            top: "15%",
            background: "#57c8c0",
          }}
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              SYSTEMS THAT WORK TOGETHER
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-[4.7rem]">
              Your tools.
              <br />
              <span className="integration-kicker">One connected</span>
              <br />
              system.
            </h1>

            <p className="integration-muted mt-7 max-w-xl text-base leading-8 sm:text-lg">
              Your software should share information, trigger actions, and stay
              in sync. We connect the pieces behind your business so work moves
              without the constant copy, paste, and switching.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/build"
                className="integration-button-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Start a project <ArrowUpRight size={17} />
              </Link>
              <Link
                href="/services"
                className="integration-button-secondary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                <Layers3 size={16} /> All services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs integration-muted">
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="integration-kicker" /> Custom API
                connections
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="integration-kicker" /> Event-driven
                workflows
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="integration-kicker" /> Built around
                your stack
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[650px]">
            <div className="absolute inset-8 rounded-full bg-[var(--accent)] opacity-[0.09] blur-3xl" />

            <div className="relative aspect-square w-full">
              <div className="integration-ring absolute left-[8%] top-[8%] h-[84%] w-[84%] rounded-full border border-dashed border-[var(--card-border)]" />
              <div className="integration-ring-reverse absolute left-[19%] top-[19%] h-[62%] w-[62%] rounded-full border border-[var(--card-border)] opacity-70" />
              <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--card-border)] opacity-70" />

              <div className="integration-orb absolute left-[8%] top-[8%] h-16 w-16 rounded-[22px] border border-white/20 bg-gradient-to-br from-indigo-400/80 to-violet-600/80 shadow-2xl sm:h-20 sm:w-20">
                <div className="absolute inset-2 rounded-[15px] border border-white/25" />
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
              </div>

              <div className="integration-orb absolute right-[8%] top-[14%] h-14 w-14 rounded-full border border-white/20 bg-gradient-to-br from-emerald-300/80 to-teal-600/80 shadow-2xl sm:h-[72px] sm:w-[72px]">
                <div className="absolute inset-2 rounded-full border border-white/30" />
                <div className="absolute inset-[35%] rounded-full bg-white/90" />
              </div>

              <div className="integration-orb absolute bottom-[12%] right-[10%] h-16 w-16 rotate-12 rounded-[20px] border border-white/20 bg-gradient-to-br from-sky-300/80 to-blue-600/80 shadow-2xl sm:h-[76px] sm:w-[76px]">
                <div className="absolute inset-2 rotate-12 rounded-[13px] border border-white/30" />
              </div>

              <div className="integration-orb absolute bottom-[9%] left-[14%] h-12 w-12 rotate-45 rounded-xl border border-white/20 bg-gradient-to-br from-orange-300/80 to-pink-500/80 shadow-2xl sm:h-16 sm:w-16">
                <div className="absolute inset-2 rounded-lg border border-white/30" />
              </div>

              <div className="integration-orb absolute left-[1%] top-[48%] h-9 w-9 rounded-full border border-white/20 bg-gradient-to-br from-cyan-300 to-blue-500 shadow-xl sm:h-12 sm:w-12" />

              <div className="integration-orb absolute right-[3%] top-[51%] h-9 w-9 rotate-12 rounded-xl border border-white/20 bg-gradient-to-br from-pink-300 to-fuchsia-600 shadow-xl sm:h-12 sm:w-12" />

              <svg
                viewBox="0 0 600 600"
                className="absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="integration-flow-a"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop stopColor="#8b91ff" />
                    <stop offset="1" stopColor="#56d8c5" />
                  </linearGradient>
                  <linearGradient
                    id="integration-flow-b"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop stopColor="#f6a36b" />
                    <stop offset="1" stopColor="#bc8bff" />
                  </linearGradient>
                </defs>
                <path
                  d="M300 300 C240 230 190 190 115 110"
                  stroke="url(#integration-flow-a)"
                  strokeWidth="1.5"
                  opacity=".7"
                />
                <path
                  d="M300 300 C390 220 430 180 490 115"
                  stroke="url(#integration-flow-a)"
                  strokeWidth="1.5"
                  opacity=".7"
                />
                <path
                  d="M300 300 C390 350 430 405 485 490"
                  stroke="url(#integration-flow-b)"
                  strokeWidth="1.5"
                  opacity=".7"
                />
                <path
                  d="M300 300 C210 365 165 430 125 495"
                  stroke="url(#integration-flow-b)"
                  strokeWidth="1.5"
                  opacity=".7"
                />
                <path
                  d="M300 300 C205 290 125 295 45 300"
                  stroke="url(#integration-flow-a)"
                  strokeWidth="1.5"
                  opacity=".5"
                />
                <path
                  d="M300 300 C390 290 465 300 555 310"
                  stroke="url(#integration-flow-b)"
                  strokeWidth="1.5"
                  opacity=".5"
                />
                <circle r="4" fill="#a6a9ff">
                  <animateMotion
                    dur="3.8s"
                    repeatCount="indefinite"
                    path="M300 300 C240 230 190 190 115 110"
                  />
                </circle>
                <circle r="3.5" fill="#68e1c7">
                  <animateMotion
                    dur="4.5s"
                    repeatCount="indefinite"
                    path="M490 115 C430 180 390 220 300 300"
                  />
                </circle>
                <circle r="4" fill="#f6a36b">
                  <animateMotion
                    dur="4.2s"
                    repeatCount="indefinite"
                    path="M300 300 C390 350 430 405 485 490"
                  />
                </circle>
                <circle r="3.5" fill="#c3a1ff">
                  <animateMotion
                    dur="3.4s"
                    repeatCount="indefinite"
                    path="M125 495 C165 430 210 365 300 300"
                  />
                </circle>
                <circle r="3" fill="#8bd8ff">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path="M45 300 C125 295 205 290 300 300"
                  />
                </circle>
              </svg>

              <div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[34px] border border-white/30 bg-[var(--card)] shadow-[0_20px_80px_rgba(0,0,0,0.15)] sm:h-40 sm:w-40 sm:rounded-[42px]">
                <div className="absolute inset-2 rounded-[27px] border border-[var(--card-border)] sm:rounded-[34px]" />
                <div className="relative flex flex-col items-center gap-2">
                  <div className="integration-float flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg sm:h-14 sm:w-14">
                    <Workflow size={26} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] integration-muted">
                    Nexus Connect
                  </span>
                </div>
              </div>

              <div className="integration-float absolute left-[36%] top-[7%] rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-[10px] font-medium shadow-lg sm:text-xs">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                API connected
              </div>

              <div className="integration-float-delay absolute bottom-[27%] left-[1%] rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-[10px] font-medium shadow-lg sm:text-xs">
                <Zap size={12} className="mr-1.5 inline text-amber-400" />
                Event received
              </div>

              <div className="integration-float absolute bottom-[18%] right-[1%] rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-[10px] font-medium shadow-lg sm:text-xs">
                <Check size={12} className="mr-1.5 inline text-emerald-400" />
                Data synced
              </div>

              <div className="absolute left-1/2 top-[2%] -translate-x-1/2 text-[9px] font-medium uppercase tracking-[0.25em] integration-muted sm:text-[10px]">
                One system · Many possibilities
              </div>
            </div>

            <div className="integration-card absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 sm:bottom-0">
              <div className="flex -space-x-2">
                {["#7c8cff", "#43c9b6", "#f4a76b", "#d78af4"].map(
                  (color, index) => (
                    <span
                      key={color}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--card)] text-[9px] font-bold text-white"
                      style={{ background: color, zIndex: 4 - index }}
                    >
                      {["A", "D", "@", "#"][index]}
                    </span>
                  ),
                )}
              </div>
              <div>
                <p className="text-xs font-semibold">Everything in sync</p>
                <p className="integration-muted mt-0.5 text-[10px]">
                  Designed around your workflow
                </p>
              </div>
              <CircleDot size={15} className="ml-1 text-emerald-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--card-border)] py-5">
        <div className="overflow-hidden">
          <div className="integration-marquee flex items-center gap-8 sm:gap-12">
            {[0, 1].map((repeat) => (
              <div key={repeat} className="flex items-center gap-8 sm:gap-12">
                {[
                  "REST APIs",
                  "Webhooks",
                  "Data pipelines",
                  "Custom workflows",
                  "Authentication",
                  "Third-party services",
                  "Event handling",
                  "System synchronisation",
                ].map((label) => (
                  <span
                    key={`${repeat}-${label}`}
                    className="flex items-center gap-3 whitespace-nowrap text-xs font-medium tracking-wide integration-muted sm:text-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                The bigger picture
              </p>
              <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Stop managing the gaps between your tools.
              </h2>
            </div>
            <p className="integration-muted max-w-2xl text-base leading-8 lg:justify-self-end">
              Disconnected systems create duplicate work, inconsistent
              information, and missed opportunities. We build the connective
              layer that lets your existing tools behave like parts of one
              considered system — without forcing you to replace everything you
              already use.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ArrowRightLeft,
                title: "Information moves",
                text: "Send the right data to the right place when an event happens, instead of relying on someone to move it manually.",
              },
              {
                icon: GitBranch,
                title: "Actions follow events",
                text: "Use triggers and rules to turn a form submission, payment event, or data update into the next useful action.",
              },
              {
                icon: LockKeyhole,
                title: "Connections stay considered",
                text: "Build around access boundaries, validation, failure handling, and the actual requirements of each connection.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="integration-card integration-float relative overflow-hidden rounded-3xl p-6 sm:p-7"
                style={{ animationDelay: `${index * -1.7}s` }}
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--accent)] opacity-[0.07] blur-2xl" />
                <div className="relative">
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)]">
                    <item.icon size={21} className="integration-kicker" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="integration-muted mt-3 text-sm leading-7">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[var(--surface-secondary)] opacity-60" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
              Build your connection
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Design a workflow.
              <br />
              <span className="integration-muted">See it come together.</span>
            </h2>
            <p className="integration-muted mx-auto mt-5 max-w-xl text-sm leading-7 sm:text-base">
              This is a small interactive model of how systems can connect. Add
              nodes, select two to create or remove a connection, then simulate
              a workflow run.
            </p>
          </div>

          <div className="integration-card mt-12 overflow-hidden rounded-[28px] sm:rounded-[36px]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--card-border)] px-5 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                  <Workflow size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Connection playground</p>
                  <p className="integration-muted mt-1 text-xs">
                    Interactive demo · No accounts required
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-2 text-xs">
                <span
                  className={`h-2 w-2 rounded-full ${running ? "animate-pulse bg-amber-400" : "bg-emerald-400"}`}
                />
                {running ? "Processing events…" : "Ready to run"}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_260px]">
              <div className="relative min-h-[410px] overflow-hidden border-b border-[var(--card-border)] lg:border-b-0 lg:border-r">
                <div className="integration-grid absolute inset-0 opacity-40" />

                <div className="absolute left-5 top-5 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] integration-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Connection map
                </div>

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-label="Diagram of connections between selected systems"
                >
                  {connections.map(([from, to], index) => {
                    if (
                      !activeNodes.includes(from) ||
                      !activeNodes.includes(to)
                    )
                      return null;
                    const a = nodePositions[from];
                    const b = nodePositions[to];
                    const midX = (a.x + b.x) / 2;
                    const midY = (a.y + b.y) / 2 - 8;

                    return (
                      <g key={`${from}-${to}-${index}`}>
                        <path
                          d={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
                          stroke="var(--accent)"
                          strokeWidth="0.35"
                          fill="none"
                          opacity={running ? 1 : 0.55}
                          className={`integration-flow-line ${running ? "" : "is-idle"}`}
                          vectorEffect="non-scaling-stroke"
                        />
                        {running && (
                          <circle r="1.1" fill="var(--accent)">
                            <animateMotion
                              dur={`${0.8 + index * 0.25}s`}
                              repeatCount="indefinite"
                              path={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {integrations.map((node) => {
                  const position = nodePositions[node.id as NodeId];
                  const active = activeNodes.includes(node.id as NodeId);
                  const selected = selectedNode === node.id;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => handleNodeClick(node.id as NodeId)}
                      aria-pressed={selected}
                      aria-label={`${node.name}${active ? "" : ", add to workflow"}`}
                      className={`integration-node absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border p-2.5 sm:p-3 ${
                        active
                          ? "bg-[var(--card)]"
                          : "border-dashed bg-[var(--surface-secondary)] opacity-60"
                      } ${selected ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--card)]" : ""}`}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        borderColor: selected
                          ? "var(--accent)"
                          : active
                            ? node.color
                            : "var(--card-border)",
                        boxShadow: selected
                          ? `0 0 30px ${node.color}35`
                          : undefined,
                        minWidth: 76,
                      }}
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white sm:h-11 sm:w-11"
                        style={{
                          background: active
                            ? `linear-gradient(145deg, ${node.color}, ${node.color}99)`
                            : "var(--surface-secondary)",
                          color: active ? "white" : "var(--text-secondary)",
                          boxShadow: active
                            ? `0 6px 18px ${node.color}30`
                            : "none",
                        }}
                      >
                        {active ? node.symbol : <Plus size={17} />}
                      </span>
                      <span className="max-w-[82px] truncate text-[10px] font-semibold sm:text-xs">
                        {node.name}
                      </span>
                      {selected && (
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                          <Check size={11} />
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-1.5 text-[10px] integration-muted">
                    {selectedNode
                      ? `Choose another node to connect to ${nodeById[selectedNode].name}`
                      : "Select any node to start"}
                  </span>
                  <span className="rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-1.5 text-[10px] integration-muted">
                    {connections.length} connection
                    {connections.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              <aside className="flex flex-col p-5 sm:p-6">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] integration-muted">
                    Systems
                  </p>
                  <p className="mt-2 text-sm leading-6 integration-muted">
                    Toggle the systems in your workflow.
                  </p>
                </div>

                <div className="space-y-2">
                  {integrations.map((node) => {
                    const active = activeNodes.includes(node.id as NodeId);

                    return (
                      <button
                        type="button"
                        key={node.id}
                        onClick={() => toggleNode(node.id as NodeId)}
                        className="flex w-full items-center gap-3 rounded-xl border border-[var(--card-border)] px-3 py-3 text-left transition hover:border-[var(--accent)]"
                      >
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                          style={{
                            background: active
                              ? node.color
                              : "var(--text-secondary)",
                          }}
                        >
                          {active ? node.symbol : <Plus size={14} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-semibold">
                            {node.name}
                          </span>
                          <span className="mt-1 block text-[10px] integration-muted">
                            {node.category}
                          </span>
                        </span>
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            active
                              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                              : "border-[var(--card-border)]"
                          }`}
                        >
                          {active && <Check size={11} />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={runWorkflow}
                    disabled={running || activeNodes.length < 2}
                    className="integration-button-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {running ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" /> Running
                        workflow
                      </>
                    ) : (
                      <>
                        <Zap size={16} /> Run simulation
                      </>
                    )}
                  </button>

                  <p className="integration-muted mt-3 text-center text-[10px] leading-5">
                    {activeNodes.length < 2
                      ? "Add at least two systems to run."
                      : runCount > 0 && !running
                        ? `Simulation complete · ${runCount} run${runCount === 1 ? "" : "s"}`
                        : "A visual demo, not a live connection."}
                  </p>
                </div>
              </aside>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--card-border)] px-5 py-4 sm:px-8">
              <div className="flex items-center gap-2 text-xs integration-muted">
                <Settings2 size={14} />
                <span>Try different combinations and connections.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveNodes(["website", "api", "database", "email"]);
                  setConnections(initialConnections);
                  setSelectedNode(null);
                  setRunning(false);
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold transition hover:text-[var(--accent)]"
              >
                <RefreshCw size={13} /> Reset playground
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                What we build
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                The connective tissue behind better software.
              </h2>
            </div>
            <p className="integration-muted max-w-xl text-sm leading-7 lg:justify-self-end sm:text-base">
              Each connection is designed around what the systems need to
              exchange, how they behave under pressure, and how the result will
              be maintained.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {capabilities.map((item, index) => (
              <article
                key={item.number}
                className="integration-card group relative overflow-hidden rounded-3xl p-6 sm:p-8"
              >
                <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.14]" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] transition-transform duration-300 group-hover:rotate-[-7deg] group-hover:scale-110">
                      <item.icon size={21} className="integration-kicker" />
                    </div>
                    <span className="text-xs font-medium tracking-[0.15em] integration-muted">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="integration-muted mt-3 max-w-xl text-sm leading-7">
                    {item.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-[10px] font-medium integration-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 h-px w-full bg-[var(--card-border)]" />
                  <div className="mt-4 flex items-center justify-between text-xs integration-muted">
                    <span>Designed for your requirements</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                    />
                  </div>
                </div>
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full"
                  style={{ transitionDelay: `${index * 20}ms` }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[var(--surface-secondary)] opacity-60" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                How we work
              </p>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Connected with intention.
              </h2>
              <p className="integration-muted mt-5 max-w-md text-sm leading-7 sm:text-base">
                Good integrations are more than a successful API request. They
                account for the whole journey: requirements, data, edge cases,
                security, and what happens after launch.
              </p>
              <Link
                href="/build"
                className="integration-button-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Start a project <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[var(--card-border)] sm:left-[27px]" />
              <div className="space-y-5">
                {process.map((item, index) => (
                  <article
                    key={item.step}
                    className="integration-card group relative rounded-3xl p-5 sm:p-7"
                  >
                    <div className="flex gap-5 sm:gap-6">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white sm:h-14 sm:w-14">
                        <item.icon size={21} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] integration-kicker">
                            Step {item.step}
                          </span>
                          {index === 0 && (
                            <span className="rounded-full border border-[var(--card-border)] px-2 py-1 text-[9px] integration-muted">
                              Foundation
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="integration-muted mt-3 text-sm leading-7">
                          {item.text}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100 sm:left-7 sm:right-7" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="integration-card relative overflow-hidden rounded-[32px] p-7 sm:rounded-[40px] sm:p-12 lg:p-16">
            <div className="integration-glow -right-16 -top-24 h-64 w-64 bg-[var(--accent)]" />
            <div className="integration-glow -bottom-28 left-[35%] h-56 w-56 bg-teal-400" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-2 text-xs integration-muted">
                  <Sparkles size={14} className="integration-kicker" />
                  YOUR STACK, WORKING TOGETHER
                </div>
                <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Make your existing tools work harder.
                </h2>
                <p className="integration-muted mt-5 max-w-xl text-sm leading-7 sm:text-base">
                  Tell us what you use, what feels disconnected, and what you
                  want to happen automatically. We can work out the right
                  integration approach together.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/build"
                    className="integration-button-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    Start a project <ArrowUpRight size={17} />
                  </Link>
                  <Link
                    href="/services"
                    className="integration-button-secondary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                  >
                    All services <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-0 scale-75 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
                <div className="relative grid grid-cols-2 gap-3">
                  {[
                    { icon: Globe, title: "Your website", color: "#7c8cff" },
                    { icon: Cloud, title: "Cloud services", color: "#43c9b6" },
                    { icon: Database, title: "Your data", color: "#f4a76b" },
                    {
                      icon: MessageSquare,
                      title: "Your team",
                      color: "#d78af4",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className={`integration-card integration-node rounded-2xl p-4 ${
                        index === 1 || index === 2
                          ? "integration-float-delay"
                          : "integration-float"
                      }`}
                    >
                      <div
                        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-white"
                        style={{ background: item.color }}
                      >
                        <item.icon size={20} />
                      </div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="integration-muted mt-1 text-[10px]">
                        Connected layer
                      </p>
                    </div>
                  ))}
                </div>
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-xl">
                  <Link2 size={20} className="integration-kicker" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
              Questions, answered
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Before we connect things.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className="integration-faq rounded-2xl border border-[var(--card-border)] bg-[var(--card)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-sm font-semibold leading-6 sm:text-base">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--card-border)] transition-transform duration-300 ${
                        isOpen ? "rotate-180 border-[var(--accent)]" : ""
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  <div
                    className={`integration-faq-content ${isOpen ? "is-open" : ""}`}
                  >
                    <div className="integration-faq-inner">
                      <p className="integration-muted px-5 pb-5 text-sm leading-7 sm:px-6 sm:pb-6">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <nav className="border-t border-[var(--card-border)] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link
            href="/services/ai-systems"
            className="group inline-flex items-center gap-3 rounded-xl px-2 py-2 transition hover:text-[var(--accent)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] transition group-hover:-translate-x-1 group-hover:border-[var(--accent)]">
              <ArrowLeft size={17} />
            </span>
            <span>
              <span className="integration-muted block text-[10px] uppercase tracking-[0.15em]">
                Previous service
              </span>
              <span className="mt-1 block text-sm font-semibold">
                AI Systems
              </span>
            </span>
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-xl px-2 py-2 transition hover:text-[var(--accent)]"
          >
            <span className="text-right">
              <span className="integration-muted block text-[10px] uppercase tracking-[0.15em]">
                Explore
              </span>
              <span className="mt-1 block text-sm font-semibold">
                All services
              </span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] transition group-hover:translate-x-1 group-hover:border-[var(--accent)]">
              <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
