"use client";

import { useCallback, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  AudioWaveform,
  BrainCircuit,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  Cpu,
  Database,
  Eye,
  Fingerprint,
  GitBranch,
  Layers3,
  MessageSquareText,
  Network,
  Orbit,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

const capabilities = [
  {
    id: "reason",
    number: "01",
    icon: BrainCircuit,
    title: "Reasoning systems",
    subtitle: "Beyond simple prompts",
    description:
      "Build systems that interpret context, break down complex requests, select tools, and carry tasks through multiple steps.",
    tags: ["Multi-step logic", "Tool calling", "Context handling"],
    color: "cyan",
  },
  {
    id: "knowledge",
    number: "02",
    icon: Database,
    title: "Knowledge engines",
    subtitle: "Your information, connected",
    description:
      "Turn internal documents, product knowledge, and structured data into useful answers with retrieval and grounded context.",
    tags: ["Document retrieval", "Semantic search", "Source grounding"],
    color: "violet",
  },
  {
    id: "vision",
    number: "03",
    icon: Eye,
    title: "Multimodal systems",
    subtitle: "More than text",
    description:
      "Create experiences that work with the right combination of text, images, audio, structured inputs, and other signals.",
    tags: ["Image understanding", "Audio workflows", "Structured outputs"],
    color: "pink",
  },
  {
    id: "agents",
    number: "04",
    icon: Workflow,
    title: "AI-powered agents",
    subtitle: "From intent to action",
    description:
      "Connect models to approved tools, APIs, and workflows so they can perform useful actions with appropriate limits and oversight.",
    tags: ["Tool integration", "Task execution", "Human approval"],
    color: "lime",
  },
];

const architectures = {
  assistant: {
    label: "Intelligent assistant",
    code: "ARCH / 001",
    description:
      "A conversational layer that understands requests, retrieves relevant context, and responds in a consistent product-specific way.",
    nodes: ["INPUT", "CONTEXT", "MODEL", "RESPONSE"],
    output: "Context-aware responses",
    time: "Interactive",
  },
  knowledge: {
    label: "Knowledge retrieval",
    code: "ARCH / 002",
    description:
      "A retrieval pipeline that searches your knowledge sources before generating an answer, helping keep responses relevant and grounded.",
    nodes: ["QUESTION", "SEARCH", "RANK", "ANSWER"],
    output: "Answers grounded in sources",
    time: "On demand",
  },
  agent: {
    label: "Tool-using agent",
    code: "ARCH / 003",
    description:
      "A controlled execution loop that plans a step, invokes an approved tool, checks the result, and continues or requests approval.",
    nodes: ["INTENT", "PLAN", "TOOL", "VERIFY"],
    output: "Actions with guardrails",
    time: "Multi-step",
  },
};

type ArchitectureKey = keyof typeof architectures;

const principles = [
  {
    icon: ShieldCheck,
    title: "Safety by design",
    text: "Clear permissions, validation, and approval boundaries around consequential actions.",
  },
  {
    icon: Fingerprint,
    title: "Your product's identity",
    text: "Purpose-built behavior, tone, context, and interface instead of a generic chatbot skin.",
  },
  {
    icon: GitBranch,
    title: "Built to evolve",
    text: "Modular components that can be tested, measured, improved, and extended over time.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function AISystemsPage() {
  const [architecture, setArchitecture] =
    useState<ArchitectureKey>("assistant");
  const [activeCapability, setActiveCapability] = useState("reason");
  const [demoRunning, setDemoRunning] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 45 });

  const selectedArchitecture = architectures[architecture];
  const selectedCapability =
    capabilities.find((item) => item.id === activeCapability) ??
    capabilities[0];

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      setPointer({
        x: ((event.clientX - bounds.left) / bounds.width) * 100,
        y: ((event.clientY - bounds.top) / bounds.height) * 100,
      });
    },
    [],
  );

  const resetDemo = () => {
    setDemoRunning(false);
    setArchitecture("assistant");
  };

  const pageStyle = {
    "--mx": `${pointer.x}%`,
    "--my": `${pointer.y}%`,
  } as CSSProperties;

  return (
    <main
      className="ai-page overflow-hidden"
      style={pageStyle}
      onPointerMove={handlePointerMove}
    >
      <section className="ai-hero relative isolate">
        <div className="ai-hero-grid" aria-hidden="true" />
        <div className="ai-cursor-glow" aria-hidden="true" />

        <div className="ai-hero-noise" aria-hidden="true" />

        <motion.div
          className="ai-orbit ai-orbit-one"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        >
          <span className="ai-orbit-dot ai-orbit-dot-cyan" />
          <span className="ai-orbit-dot ai-orbit-dot-purple" />
          <span className="ai-orbit-dot ai-orbit-dot-white" />
        </motion.div>

        <motion.div
          className="ai-orbit ai-orbit-two"
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 29, repeat: Infinity, ease: "linear" }}
        >
          <span className="ai-orbit-dot ai-orbit-dot-pink" />
          <span className="ai-orbit-dot ai-orbit-dot-lime" />
        </motion.div>

        <motion.div
          className="ai-floating-object ai-object-cube"
          aria-hidden="true"
          animate={{
            y: [0, -22, 8, 0],
            rotateX: [0, 180, 270, 360],
            rotateY: [0, 90, 220, 360],
            rotateZ: [0, 35, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="ai-cube-face ai-cube-front" />
          <div className="ai-cube-face ai-cube-back" />
          <div className="ai-cube-face ai-cube-right" />
          <div className="ai-cube-face ai-cube-left" />
          <div className="ai-cube-face ai-cube-top" />
          <div className="ai-cube-face ai-cube-bottom" />
        </motion.div>

        <motion.div
          className="ai-floating-object ai-object-ring"
          aria-hidden="true"
          animate={{
            y: [0, 16, -10, 0],
            rotateX: [65, 85, 55, 65],
            rotateY: [0, 120, 240, 360],
            rotateZ: [0, -60, 30, 0],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div />
          <span />
        </motion.div>

        <motion.div
          className="ai-floating-object ai-object-diamond"
          aria-hidden="true"
          animate={{
            y: [0, -17, 12, 0],
            rotateZ: [0, 90, 180, 270, 360],
            rotateX: [0, 60, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div />
        </motion.div>

        <div className="ai-hero-inner mx-auto">
          <motion.div
            className="ai-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            <motion.div className="ai-eyebrow" variants={fadeUp}>
              <span className="ai-eyebrow-signal">
                <span />
              </span>
              NEXUS / INTELLIGENCE LAB
              <span className="ai-eyebrow-divider" />
              <span className="ai-eyebrow-index">FIELD 04</span>
            </motion.div>

            <motion.h1 variants={fadeUp}>
              Intelligence,
              <br />
              <span className="ai-title-outline">engineered</span>
              <br />
              into <span className="ai-title-accent">everything.</span>
            </motion.h1>

            <motion.p className="ai-hero-description" variants={fadeUp}>
              Not another chatbot bolted onto a website. We build purposeful AI
              systems that understand your context, connect to your tools, and
              do meaningful work inside your product.
            </motion.p>

            <motion.div className="ai-hero-actions" variants={fadeUp}>
              <a href="/build" className="ai-button ai-button-primary">
                Start a project
                <ArrowDownRight size={17} />
              </a>
              <a href="#ai-lab" className="ai-button ai-button-secondary">
                Explore the lab
                <span className="ai-button-play">
                  <Play size={12} fill="currentColor" />
                </span>
              </a>
            </motion.div>

            <motion.div className="ai-hero-footnote" variants={fadeUp}>
              <span className="ai-footnote-line" />
              <span>Designed around real problems, not AI hype.</span>
            </motion.div>
          </motion.div>

          <div
            className="ai-core-stage"
            aria-label="Animated AI system illustration"
          >
            <motion.div
              className="ai-core-aura"
              animate={{
                scale: [0.92, 1.08, 0.96],
                opacity: [0.45, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="ai-core-ring ai-core-ring-outer"
              animate={{ rotate: 360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            >
              <span className="ai-core-marker marker-one" />
              <span className="ai-core-marker marker-two" />
              <span className="ai-core-marker marker-three" />
            </motion.div>

            <motion.div
              className="ai-core-ring ai-core-ring-middle"
              animate={{ rotate: -360 }}
              transition={{ duration: 23, repeat: Infinity, ease: "linear" }}
            >
              <span className="ai-core-satellite satellite-one">
                <BrainCircuit size={16} />
              </span>
              <span className="ai-core-satellite satellite-two">
                <Network size={15} />
              </span>
            </motion.div>

            <motion.div
              className="ai-core-ring ai-core-ring-inner"
              animate={{
                rotateX: [58, 72, 58],
                rotateZ: [0, 180, 360],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="ai-core-sphere"
              animate={{
                rotateY: [0, 360],
                rotateX: [0, 15, 0, -15, 0],
              }}
              transition={{
                rotateY: { duration: 24, repeat: Infinity, ease: "linear" },
                rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="ai-sphere-surface" />
              <div className="ai-sphere-latitude latitude-one" />
              <div className="ai-sphere-latitude latitude-two" />
              <div className="ai-sphere-latitude latitude-three" />
              <div className="ai-sphere-longitude longitude-one" />
              <div className="ai-sphere-longitude longitude-two" />
              <div className="ai-sphere-longitude longitude-three" />
              <div className="ai-sphere-glint" />
            </motion.div>

            <motion.div
              className="ai-core-data ai-data-top"
              animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="ai-data-dot" />
              CONTEXT
              <strong>CONNECTED</strong>
            </motion.div>

            <motion.div
              className="ai-core-data ai-data-left"
              animate={{ x: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <AudioWaveform size={14} />
              <span>INPUT</span>
              <i />
            </motion.div>

            <motion.div
              className="ai-core-data ai-data-right"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            >
              <CircleDot size={13} />
              <span>REASONING</span>
            </motion.div>

            <motion.div
              className="ai-core-data ai-data-bottom"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity }}
            >
              <span className="ai-data-bottom-bar" />
              <span>INTENT → ACTION</span>
            </motion.div>

            <motion.div
              className="ai-mini-node ai-mini-node-one"
              animate={{ y: [0, -12, 0], rotate: [0, 90, 180] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Braces size={19} />
            </motion.div>

            <motion.div
              className="ai-mini-node ai-mini-node-two"
              animate={{ y: [0, 13, 0], rotate: [0, -90, -180] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <Zap size={18} />
            </motion.div>

            <motion.div
              className="ai-mini-node ai-mini-node-three"
              animate={{
                y: [0, -8, 4, 0],
                rotateX: [0, 180, 360],
                rotateY: [0, 180, 360],
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <div />
            </motion.div>

            <div className="ai-core-caption">
              <span>FIG. 01</span>
              <span>AN ADAPTIVE SYSTEM</span>
              <span>∞</span>
            </div>
          </div>
        </div>

        <div className="ai-hero-bottom">
          <div className="ai-hero-bottom-inner">
            <span>FROM MODEL TO PRODUCT</span>
            <div className="ai-hero-bottom-track">
              <motion.span
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            <span>INTELLIGENCE, WITH INTENTION</span>
          </div>
        </div>
      </section>

      <section className="ai-manifesto section-shell">
        <div className="ai-section-kicker">
          <span>01</span>
          <span className="ai-kicker-line" />
          THE POINT OF IT ALL
        </div>

        <div className="ai-manifesto-grid">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            Intelligence is
            <br />
            not the product.
            <br />
            <span>The outcome is.</span>
          </motion.h2>

          <div className="ai-manifesto-copy">
            <p>
              A model on its own is just a component. The real engineering is
              everything around it: the context it receives, the systems it can
              access, the decisions it is allowed to make, and the way people
              experience the result.
            </p>
            <p>
              We bring those pieces together into AI-powered features and
              applications designed for a specific purpose, with a clear role
              inside your business or product.
            </p>
            <a href="#ai-capabilities" className="ai-text-link">
              Explore the capabilities <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="ai-manifesto-visual" aria-hidden="true">
          <div className="ai-manifesto-word">THINK</div>
          <div className="ai-manifesto-symbol">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              <Orbit />
            </motion.div>
          </div>
          <div className="ai-manifesto-word ai-manifesto-word-right">DO.</div>
          <div className="ai-manifesto-scanline" />
        </div>
      </section>

      <section id="ai-capabilities" className="ai-capabilities section-shell">
        <div className="ai-section-heading">
          <div>
            <div className="ai-section-kicker">
              <span>02</span>
              <span className="ai-kicker-line" />
              SYSTEM CAPABILITIES
            </div>
            <h2>
              Give intelligence
              <br />
              <span>a job to do.</span>
            </h2>
          </div>
          <p>
            Different problems need different systems. Select a capability to
            explore how it could work inside your product.
          </p>
        </div>

        <div className="ai-capability-layout">
          <div className="ai-capability-list">
            {capabilities.map((item) => {
              const Icon = item.icon;
              const isActive = activeCapability === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`ai-capability-item ai-tone-${item.color} ${
                    isActive ? "is-active" : ""
                  }`}
                  onClick={() => setActiveCapability(item.id)}
                  aria-pressed={isActive}
                >
                  <span className="ai-capability-number">{item.number}</span>
                  <span className="ai-capability-icon">
                    <Icon size={19} />
                  </span>
                  <span className="ai-capability-title">
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                  <ChevronRight className="ai-capability-arrow" size={17} />
                </button>
              );
            })}
          </div>

          <div className="ai-capability-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCapability.id}
                className={`ai-capability-detail-inner ai-tone-${selectedCapability.color}`}
                initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -12, filter: "blur(5px)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="ai-detail-topline">
                  <span>CAPABILITY / {selectedCapability.number}</span>
                  <span className="ai-detail-live">
                    <span /> SYSTEM READY
                  </span>
                </div>

                <div className="ai-detail-art" aria-hidden="true">
                  <div className="ai-detail-grid" />
                  <motion.div
                    className="ai-detail-orbit ai-detail-orbit-a"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 22,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span />
                  </motion.div>
                  <motion.div
                    className="ai-detail-orbit ai-detail-orbit-b"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span />
                  </motion.div>
                  <motion.div
                    className="ai-detail-object"
                    animate={{
                      rotateY: [0, 180, 360],
                      rotateX: [0, 25, 0, -25, 0],
                      y: [0, -7, 0],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <selectedCapability.icon size={34} strokeWidth={1.4} />
                  </motion.div>
                  <span className="ai-art-label ai-art-label-a">
                    NEXUS / CORE
                  </span>
                  <span className="ai-art-label ai-art-label-b">
                    0
                    {capabilities.findIndex((c) => c.id === activeCapability) +
                      1}
                    :00
                  </span>
                  <div className="ai-art-crosshair ai-art-crosshair-a" />
                  <div className="ai-art-crosshair ai-art-crosshair-b" />
                </div>

                <div className="ai-detail-copy">
                  <h3>{selectedCapability.title}</h3>
                  <p>{selectedCapability.description}</p>
                  <div className="ai-detail-tags">
                    {selectedCapability.tags.map((tag) => (
                      <span key={tag}>
                        <Check size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="ai-lab" className="ai-lab-section">
        <div className="ai-lab-background" aria-hidden="true">
          <div className="ai-lab-blob ai-lab-blob-one" />
          <div className="ai-lab-blob ai-lab-blob-two" />
          <div className="ai-lab-grid" />
        </div>

        <div className="ai-lab-inner section-shell">
          <div className="ai-section-kicker">
            <span>03</span>
            <span className="ai-kicker-line" />
            THE INTERACTIVE LAB
          </div>

          <div className="ai-lab-heading">
            <div>
              <h2>
                Under the hood,
                <br />
                <span>not under the rug.</span>
              </h2>
              <p>
                Explore three example architectures. Switch the system and watch
                how the pipeline changes from input to outcome.
              </p>
            </div>
            <div className="ai-lab-stamp">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Orbit size={23} />
              </motion.div>
              <span>INTERACTIVE</span>
              <strong>LAB / 01</strong>
            </div>
          </div>

          <div className="ai-lab-console">
            <div className="ai-console-top">
              <div className="ai-console-window-controls">
                <span />
                <span />
                <span />
              </div>
              <span className="ai-console-title">NEXUS / SYSTEM ARCHITECT</span>
              <span className="ai-console-status">
                <span /> READY
              </span>
            </div>

            <div
              className="ai-console-tabs"
              role="tablist"
              aria-label="AI system architectures"
            >
              {(Object.keys(architectures) as ArchitectureKey[]).map(
                (key, index) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={architecture === key}
                    className={architecture === key ? "is-selected" : ""}
                    onClick={() => {
                      setArchitecture(key);
                      setDemoRunning(false);
                    }}
                  >
                    <span>0{index + 1}</span>
                    {architectures[key].label}
                  </button>
                ),
              )}
            </div>

            <div className="ai-console-body">
              <div className="ai-architecture-copy">
                <motion.div
                  key={selectedArchitecture.code}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="ai-architecture-code">
                    {selectedArchitecture.code}
                  </span>
                  <h3>{selectedArchitecture.label}</h3>
                  <p>{selectedArchitecture.description}</p>

                  <div className="ai-architecture-output">
                    <span>DESIGNED OUTPUT</span>
                    <strong>{selectedArchitecture.output}</strong>
                  </div>

                  <div className="ai-architecture-meta">
                    <span>EXECUTION</span>
                    <span>{selectedArchitecture.time}</span>
                  </div>
                </motion.div>

                <div className="ai-console-actions">
                  <button
                    type="button"
                    className="ai-run-button"
                    onClick={() => setDemoRunning((current) => !current)}
                  >
                    {demoRunning ? (
                      <>
                        <RotateCcw size={15} />
                        Reset sequence
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="currentColor" />
                        Run sequence
                      </>
                    )}
                  </button>
                  <span>SIMULATED FLOW</span>
                </div>
              </div>

              <div
                className="ai-pipeline"
                aria-label="Illustration of the selected architecture pipeline"
              >
                <div className="ai-pipeline-topline">
                  <span>PROCESS FLOW</span>
                  <span>
                    {demoRunning ? "EXECUTING" : "STANDBY"}
                    <i className={demoRunning ? "is-running" : ""} />
                  </span>
                </div>

                <div className="ai-pipeline-nodes">
                  {selectedArchitecture.nodes.map((node, index) => (
                    <div
                      className="ai-pipeline-step-wrap"
                      key={`${architecture}-${node}`}
                    >
                      <motion.div
                        className={`ai-pipeline-node ${
                          demoRunning ? "is-executing" : ""
                        }`}
                        animate={
                          demoRunning
                            ? {
                                borderColor: [
                                  "var(--card-border)",
                                  "var(--accent)",
                                  "var(--card-border)",
                                ],
                                boxShadow: [
                                  "0 0 0 rgba(0,0,0,0)",
                                  "0 0 24px rgba(70,220,255,0.22)",
                                  "0 0 0 rgba(0,0,0,0)",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          duration: 1.4,
                          delay: index * 0.65,
                          repeat: demoRunning ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="ai-node-index">0{index + 1}</span>
                        <div className="ai-node-icon">
                          {index === 0 ? (
                            <MessageSquareText size={17} />
                          ) : index === 1 ? (
                            <Network size={17} />
                          ) : index === 2 ? (
                            <Cpu size={17} />
                          ) : (
                            <Sparkles size={17} />
                          )}
                        </div>
                        <strong>{node}</strong>
                        <span className="ai-node-state">
                          {demoRunning ? "ACTIVE" : "READY"}
                        </span>
                      </motion.div>

                      {index < selectedArchitecture.nodes.length - 1 && (
                        <div className="ai-pipeline-connector">
                          <div />
                          <motion.span
                            animate={
                              demoRunning
                                ? { x: [0, 38], opacity: [0, 1, 0] }
                                : { x: 0, opacity: 0.3 }
                            }
                            transition={{
                              duration: 1.2,
                              delay: index * 0.65,
                              repeat: demoRunning ? Infinity : 0,
                              ease: "linear",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {demoRunning ? (
                    <motion.div
                      key="executing"
                      className="ai-pipeline-result is-active"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      <span className="ai-result-icon">
                        <AudioWaveform size={16} />
                      </span>
                      <span>
                        <strong>Sequence in motion</strong>
                        <small>
                          Illustrative animation — no live model is being
                          called.
                        </small>
                      </span>
                      <span className="ai-result-pulse" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="standby"
                      className="ai-pipeline-result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="ai-result-icon">
                        <CircleDot size={16} />
                      </span>
                      <span>
                        <strong>Pipeline ready</strong>
                        <small>
                          Run the sequence to explore the visual flow.
                        </small>
                      </span>
                      <span className="ai-result-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="ai-pipeline-footer">
                  <span>INPUT → PROCESSING → OUTPUT</span>
                  <span>MODEL-AGNOSTIC DESIGN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ai-lab-footnote">
            <span>
              <Sparkles size={14} /> A conceptual architecture explorer
            </span>
            <span>
              Real implementations are designed around your requirements, data,
              and infrastructure.
            </span>
          </div>
        </div>
      </section>

      <section className="ai-principles section-shell">
        <div className="ai-section-heading">
          <div>
            <div className="ai-section-kicker">
              <span>04</span>
              <span className="ai-kicker-line" />
              ENGINEERING PRINCIPLES
            </div>
            <h2>
              Clever is good.
              <br />
              <span>Dependable is better.</span>
            </h2>
          </div>
          <p>
            A useful AI feature needs more than a good demo. It needs a clear
            purpose, reliable boundaries, and a place in the wider product.
          </p>
        </div>

        <div className="ai-principle-grid">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <motion.article
                key={principle.title}
                className="ai-principle-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                whileHover={{ y: -7 }}
              >
                <div className="ai-principle-card-top">
                  <span>0{index + 1} / PRINCIPLE</span>
                  <Icon size={20} />
                </div>
                <div className="ai-principle-icon">
                  <Icon size={23} strokeWidth={1.5} />
                </div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
                <div className="ai-principle-card-line">
                  <span />
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="ai-process section-shell">
        <div className="ai-section-kicker">
          <span>05</span>
          <span className="ai-kicker-line" />
          FROM IDEA TO SYSTEM
        </div>

        <div className="ai-process-heading">
          <h2>
            Built with intent.
            <br />
            <span>Shipped with purpose.</span>
          </h2>
          <p>
            We start with the problem, then choose the technology. Not the other
            way around.
          </p>
        </div>

        <div className="ai-process-track">
          {[
            {
              number: "01",
              title: "Define the job",
              text: "Identify the user, the problem, the expected outcome, and where AI actually adds value.",
              icon: Fingerprint,
              detail: "DISCOVERY",
            },
            {
              number: "02",
              title: "Design the system",
              text: "Map data, model behavior, integrations, failure paths, and the boundaries of what it can do.",
              icon: Network,
              detail: "ARCHITECTURE",
            },
            {
              number: "03",
              title: "Build and test",
              text: "Connect the components, test real scenarios, and improve the experience against clear criteria.",
              icon: Braces,
              detail: "ENGINEERING",
            },
            {
              number: "04",
              title: "Integrate and refine",
              text: "Bring the system into the product, measure its behavior, and plan for continued improvement.",
              icon: Layers3,
              detail: "DELIVERY",
            },
          ].map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                className="ai-process-step"
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="ai-process-step-top">
                  <span>{step.number}</span>
                  <span>{step.detail}</span>
                </div>
                <div className="ai-process-icon">
                  <Icon size={21} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="ai-process-step-bottom">
                  <span>STAGE {step.number}</span>
                  <ArrowDownRight size={16} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="ai-faq section-shell">
        <div className="ai-faq-intro">
          <div className="ai-section-kicker">
            <span>06</span>
            <span className="ai-kicker-line" />
            GOOD QUESTIONS
          </div>
          <h2>
            Let's clear
            <br />
            <span>the fog.</span>
          </h2>
          <p>
            AI should make your product more useful, not harder to understand.
          </p>
        </div>

        <div className="ai-faq-list">
          {[
            {
              question: "What counts as an AI system?",
              answer:
                "It could be a product assistant, a document-search experience, a tool-using agent, a classification pipeline, or a custom AI feature embedded in an existing application. The right scope depends on the problem you need to solve.",
            },
            {
              question: "Do I need to train my own model?",
              answer:
                "Usually, no. Depending on your requirements, an existing model combined with good context, retrieval, tools, and evaluation may be the better starting point. Custom training is considered when there is a clear reason for it.",
            },
            {
              question: "Can it work with my existing application?",
              answer:
                "Potentially, yes. Existing APIs, databases, authentication, and business workflows can often be connected, subject to their technical constraints and access permissions.",
            },
            {
              question: "How do you approach privacy and reliability?",
              answer:
                "We design around the data involved, access boundaries, validation, error handling, and the level of human oversight the use case requires. Specific safeguards depend on the system and its risks.",
            },
            {
              question: "What if I only have an idea?",
              answer:
                "That's a fine starting point. We can help clarify the use case, identify what the system needs to do, and work out a practical first version before expanding the scope.",
            },
          ].map((item, index) => (
            <details className="ai-faq-item" key={item.question}>
              <summary>
                <span className="ai-faq-number">0{index + 1}</span>
                <span className="ai-faq-question">{item.question}</span>
                <span className="ai-faq-toggle">
                  <span />
                  <span />
                </span>
              </summary>
              <div className="ai-faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="ai-cta-section">
        <div className="ai-cta-grid" aria-hidden="true" />
        <motion.div
          className="ai-cta-orb ai-cta-orb-one"
          aria-hidden="true"
          animate={{
            y: [0, -18, 0],
            rotate: [0, 120, 360],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="ai-cta-orb ai-cta-orb-two"
          aria-hidden="true"
          animate={{
            y: [0, 14, 0],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="ai-cta-inner section-shell">
          <div className="ai-section-kicker">
            <span>07</span>
            <span className="ai-kicker-line" />
            YOUR NEXT SYSTEM STARTS HERE
          </div>

          <div className="ai-cta-content">
            <div>
              <span className="ai-cta-overline">
                <span /> HAVE A PROBLEM WORTH SOLVING?
              </span>
              <h2>
                Make your
                <br />
                next move
                <span className="ai-cta-highlight"> intelligent.</span>
              </h2>
              <p>
                Bring the idea, the workflow, or the frustrating problem. Let's
                work out what a purpose-built AI system could look like.
              </p>
              <div className="ai-cta-actions">
                <a href="/build" className="ai-button ai-button-primary">
                  Start a project <ArrowRight size={17} />
                </a>
                <a href="/services" className="ai-button ai-button-secondary">
                  All services <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="ai-cta-visual" aria-hidden="true">
              <div className="ai-cta-visual-grid" />
              <motion.div
                className="ai-cta-visual-ring ai-cta-visual-ring-one"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="ai-cta-visual-ring ai-cta-visual-ring-two"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 21,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="ai-cta-visual-core"
                animate={{
                  rotateY: [0, 180, 360],
                  rotateX: [0, 20, 0, -20, 0],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <BrainCircuit size={44} strokeWidth={1.15} />
              </motion.div>
              <span className="ai-cta-visual-label ai-cta-visual-label-one">
                INTENT
              </span>
              <span className="ai-cta-visual-label ai-cta-visual-label-two">
                POSSIBILITY
              </span>
              <span className="ai-cta-visual-label ai-cta-visual-label-three">
                EXECUTION
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-next-service section-shell">
        <div>
          <span>CONTINUE EXPLORING</span>
          <h2>Intelligence is powerful. Connected intelligence is better.</h2>
        </div>
        <a href="/services/integrations" className="ai-next-link">
          <span>
            <small>NEXT SERVICE / 05</small>
            <strong>Integrations</strong>
          </span>
          <ArrowRight size={20} />
        </a>
      </section>

      <style jsx global>{`
        .ai-page {
          --ai-ink: var(--text-primary);
          --ai-muted: var(--text-secondary);
          --ai-border: var(--card-border);
          --ai-panel: var(--surface-secondary);
          --ai-glass: color-mix(in srgb, var(--card) 78%, transparent);
          --ai-cyan: #66e8ff;
          --ai-violet: #b5a0ff;
          --ai-pink: #ff9de1;
          --ai-lime: #c7ff8a;
          position: relative;
          isolation: isolate;
          color: var(--ai-ink);
          background: var(--background);
        }

        .ai-page *,
        .ai-page *::before,
        .ai-page *::after {
          box-sizing: border-box;
        }

        .ai-page a {
          text-decoration: none;
        }

        .ai-page button {
          font: inherit;
        }

        .ai-page button:focus-visible,
        .ai-page a:focus-visible,
        .ai-page summary:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 5px;
        }

        .ai-page ::selection {
          background: var(--accent);
          color: white;
        }

        .ai-page .section-shell {
          width: min(1180px, calc(100% - 48px));
          margin-inline: auto;
        }

        .ai-hero {
          min-height: 760px;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse at 76% 44%,
              rgba(72, 112, 255, 0.12),
              transparent 35%
            ),
            radial-gradient(
              ellipse at 84% 65%,
              rgba(116, 76, 255, 0.09),
              transparent 36%
            ),
            var(--background);
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-hero-grid,
        .ai-lab-grid,
        .ai-cta-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(
              to right,
              color-mix(in srgb, var(--ai-ink) 5%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--ai-ink) 5%, transparent) 1px,
              transparent 1px
            );
          background-size: 56px 56px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 18%,
            black 72%,
            transparent
          );
        }

        .ai-cursor-glow {
          position: absolute;
          z-index: -1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          pointer-events: none;
          background: radial-gradient(
            440px circle at var(--mx, 65%) var(--my, 40%),
            rgba(93, 192, 255, 0.09),
            transparent 70%
          );
          transition: background 120ms linear;
        }

        .ai-hero-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.13;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.17'/%3E%3C/svg%3E");
        }

        .ai-hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 0.95fr;
          align-items: center;
          gap: 24px;
          width: min(1240px, calc(100% - 64px));
          min-height: 710px;
          margin-inline: auto;
          padding-block: 88px 74px;
        }

        .ai-hero-copy {
          position: relative;
          z-index: 3;
          max-width: 620px;
        }

        .ai-eyebrow,
        .ai-section-kicker,
        .ai-detail-topline,
        .ai-architecture-code,
        .ai-console-title,
        .ai-console-status,
        .ai-pipeline-topline,
        .ai-pipeline-footer,
        .ai-process-step-top,
        .ai-process-step-bottom,
        .ai-cta-overline,
        .ai-hero-bottom,
        .ai-core-data,
        .ai-core-caption,
        .ai-data-label,
        .ai-art-label {
          font-family: var(
            --font-mono,
            ui-monospace,
            SFMono-Regular,
            Menlo,
            monospace
          );
          letter-spacing: 0.12em;
        }

        .ai-eyebrow {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 29px;
          color: var(--ai-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .ai-eyebrow-signal,
        .ai-detail-live > span,
        .ai-console-status > span,
        .ai-cta-overline > span {
          display: inline-flex;
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--ai-cyan);
          box-shadow: 0 0 14px rgba(102, 232, 255, 0.75);
        }

        .ai-eyebrow-divider {
          width: 24px;
          height: 1px;
          background: var(--ai-border);
        }

        .ai-eyebrow-index {
          color: var(--ai-cyan);
        }

        .ai-hero h1 {
          margin: 0;
          font-size: clamp(48px, 6.1vw, 82px);
          font-weight: 690;
          letter-spacing: -0.075em;
          line-height: 0.99;
        }

        .ai-title-outline {
          color: transparent;
          -webkit-text-stroke: 1.2px
            color-mix(in srgb, var(--ai-ink) 76%, transparent);
        }

        .ai-title-accent {
          color: var(--ai-cyan);
          text-shadow: 0 0 42px rgba(102, 232, 255, 0.16);
        }

        .ai-hero-description {
          max-width: 490px;
          margin: 27px 0 0;
          color: var(--ai-muted);
          font-size: 15px;
          line-height: 1.9;
        }

        .ai-hero-actions,
        .ai-cta-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 30px;
        }

        .ai-button {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 0 18px;
          border: 1px solid var(--ai-border);
          border-radius: 3px;
          font-size: 13px;
          font-weight: 650;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .ai-button:hover {
          transform: translateY(-3px);
        }

        .ai-button-primary {
          border-color: var(--accent);
          background: var(--accent);
          color: white !important;
          box-shadow: 0 0 26px
            color-mix(in srgb, var(--accent) 20%, transparent);
        }

        .ai-button-primary:hover {
          box-shadow: 0 0 36px
            color-mix(in srgb, var(--accent) 35%, transparent);
        }

        .ai-button-secondary {
          background: color-mix(in srgb, var(--card) 62%, transparent);
          color: var(--ai-ink);
        }

        .ai-button-secondary:hover {
          border-color: color-mix(
            in srgb,
            var(--ai-cyan) 65%,
            var(--ai-border)
          );
        }

        .ai-button-play {
          display: grid;
          width: 23px;
          height: 23px;
          place-items: center;
          border: 1px solid var(--ai-border);
          border-radius: 50%;
        }

        .ai-hero-footnote {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-top: 38px;
          color: var(--ai-muted);
          font-size: 11px;
        }

        .ai-footnote-line {
          width: 28px;
          height: 1px;
          background: var(--ai-cyan);
        }

        .ai-core-stage {
          position: relative;
          width: min(100%, 540px);
          aspect-ratio: 1;
          justify-self: end;
          perspective: 1100px;
          transform-style: preserve-3d;
        }

        .ai-core-aura {
          position: absolute;
          inset: 19%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(70, 204, 255, 0.19),
            rgba(111, 79, 255, 0.1) 38%,
            transparent 72%
          );
          filter: blur(24px);
        }

        .ai-core-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(102, 232, 255, 0.27);
          border-radius: 50%;
          transform-style: preserve-3d;
        }

        .ai-core-ring-outer {
          width: 92%;
          height: 46%;
          transform: translate(-50%, -50%) rotate(-29deg);
        }

        .ai-core-ring-middle {
          width: 75%;
          height: 75%;
          border-color: rgba(180, 151, 255, 0.3);
          transform: translate(-50%, -50%) rotateX(66deg);
        }

        .ai-core-ring-inner {
          width: 63%;
          height: 36%;
          border-color: rgba(255, 157, 225, 0.45);
          transform: translate(-50%, -50%) rotate(57deg);
        }

        .ai-core-marker {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1px solid var(--ai-cyan);
          border-radius: 50%;
          background: var(--background);
          box-shadow: 0 0 12px rgba(102, 232, 255, 0.75);
        }

        .marker-one {
          top: 7%;
          left: 14%;
        }

        .marker-two {
          right: 9%;
          bottom: 19%;
        }

        .marker-three {
          top: 49%;
          right: -4px;
        }

        .ai-core-satellite {
          position: absolute;
          display: grid;
          width: 35px;
          height: 35px;
          place-items: center;
          border: 1px solid rgba(102, 232, 255, 0.4);
          border-radius: 50%;
          background: color-mix(in srgb, var(--background) 70%, transparent);
          color: var(--ai-cyan);
          box-shadow: 0 0 25px rgba(102, 232, 255, 0.1);
        }

        .satellite-one {
          top: 9%;
          left: 18%;
        }

        .satellite-two {
          right: 8%;
          bottom: 15%;
          color: var(--ai-violet);
          border-color: rgba(181, 160, 255, 0.5);
        }

        .ai-core-sphere {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 38%;
          aspect-ratio: 1;
          overflow: hidden;
          border: 1px solid rgba(133, 232, 255, 0.7);
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 34% 27%,
              rgba(228, 255, 255, 0.9),
              transparent 5%
            ),
            radial-gradient(
              circle at 34% 30%,
              rgba(99, 224, 255, 0.85),
              transparent 20%
            ),
            radial-gradient(
              circle at 65% 70%,
              rgba(150, 91, 255, 0.72),
              transparent 45%
            ),
            radial-gradient(circle at 40% 45%, #17456e, #081323 74%);
          box-shadow:
            inset -18px -14px 36px rgba(0, 0, 0, 0.42),
            inset 9px 8px 28px rgba(151, 243, 255, 0.18),
            0 0 38px rgba(73, 209, 255, 0.25),
            0 0 95px rgba(99, 92, 255, 0.16);
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
        }

        .ai-sphere-surface {
          position: absolute;
          inset: -25%;
          border-radius: 50%;
          background: repeating-linear-gradient(
            0deg,
            transparent 0 12px,
            rgba(127, 228, 255, 0.21) 13px 14px
          );
          transform: rotate(-25deg);
        }

        .ai-sphere-latitude,
        .ai-sphere-longitude {
          position: absolute;
          inset: 8% -10%;
          border: 1px solid rgba(151, 241, 255, 0.5);
          border-radius: 50%;
        }

        .latitude-one {
          transform: rotate(24deg) scaleY(0.36);
        }

        .latitude-two {
          transform: rotate(-26deg) scaleY(0.55);
        }

        .latitude-three {
          transform: rotate(60deg) scaleY(0.75);
        }

        .longitude-one {
          inset: -8% 15%;
          transform: rotate(25deg) scaleX(0.55);
        }

        .longitude-two {
          inset: -8% 15%;
          transform: rotate(-32deg) scaleX(0.55);
        }

        .longitude-three {
          inset: -5% 27%;
          transform: rotate(0deg) scaleX(0.5);
        }

        .ai-sphere-glint {
          position: absolute;
          top: 17%;
          left: 21%;
          width: 18%;
          height: 8%;
          border-radius: 50%;
          background: rgba(223, 255, 255, 0.82);
          filter: blur(8px);
          transform: rotate(-35deg);
        }

        .ai-core-data {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 10px;
          border: 1px solid
            color-mix(in srgb, var(--ai-cyan) 20%, var(--ai-border));
          background: color-mix(in srgb, var(--background) 82%, transparent);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          color: var(--ai-muted);
          font-size: 8px;
          backdrop-filter: blur(10px);
        }

        .ai-core-data strong {
          color: var(--ai-cyan);
          font-size: 8px;
          font-weight: 600;
        }

        .ai-data-top {
          top: 11%;
          left: 31%;
        }

        .ai-data-left {
          top: 46%;
          left: -2%;
          color: var(--ai-cyan);
        }

        .ai-data-left i {
          width: 25px;
          height: 10px;
          background: repeating-linear-gradient(
            90deg,
            var(--ai-cyan) 0 2px,
            transparent 2px 5px
          );
          opacity: 0.6;
        }

        .ai-data-right {
          top: 54%;
          right: -2%;
          color: var(--ai-violet);
        }

        .ai-data-bottom {
          bottom: 11%;
          left: 31%;
        }

        .ai-data-bottom-bar {
          width: 17px;
          height: 3px;
          background: var(--ai-cyan);
          box-shadow: 0 0 8px rgba(102, 232, 255, 0.8);
        }

        .ai-data-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ai-cyan);
          box-shadow: 0 0 8px var(--ai-cyan);
        }

        .ai-mini-node {
          position: absolute;
          z-index: 3;
          display: grid;
          width: 43px;
          height: 43px;
          place-items: center;
          border: 1px solid var(--ai-border);
          background: var(--ai-glass);
          color: var(--ai-cyan);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }

        .ai-mini-node-one {
          top: 20%;
          right: 13%;
          border-color: rgba(181, 160, 255, 0.4);
          color: var(--ai-violet);
          transform: rotate(12deg);
        }

        .ai-mini-node-two {
          bottom: 24%;
          left: 11%;
          border-color: rgba(255, 157, 225, 0.4);
          color: var(--ai-pink);
          border-radius: 50%;
        }

        .ai-mini-node-three {
          right: 18%;
          bottom: 17%;
          width: 25px;
          height: 25px;
          border-color: rgba(199, 255, 138, 0.6);
          background: rgba(199, 255, 138, 0.12);
          transform-style: preserve-3d;
        }

        .ai-mini-node-three div {
          width: 8px;
          height: 8px;
          background: var(--ai-lime);
          box-shadow: 0 0 12px var(--ai-lime);
        }

        .ai-core-caption {
          position: absolute;
          right: 8%;
          bottom: 3%;
          left: 8%;
          display: flex;
          justify-content: space-between;
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-orbit {
          position: absolute;
          z-index: 1;
          top: 48%;
          left: 76%;
          width: 220px;
          height: 220px;
          border: 1px solid rgba(112, 163, 255, 0.16);
          border-radius: 50%;
          pointer-events: none;
        }

        .ai-orbit-two {
          top: 12%;
          left: 57%;
          width: 160px;
          height: 160px;
          border-color: rgba(181, 160, 255, 0.16);
        }

        .ai-orbit-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .ai-orbit-dot-cyan {
          top: 14%;
          left: 11%;
          background: var(--ai-cyan);
          box-shadow: 0 0 14px var(--ai-cyan);
        }

        .ai-orbit-dot-purple {
          top: 63%;
          right: 0;
          background: var(--ai-violet);
          box-shadow: 0 0 14px var(--ai-violet);
        }

        .ai-orbit-dot-white {
          bottom: 2%;
          left: 45%;
          background: var(--ai-ink);
        }

        .ai-orbit-dot-pink {
          top: 15%;
          right: 9%;
          background: var(--ai-pink);
          box-shadow: 0 0 14px var(--ai-pink);
        }

        .ai-orbit-dot-lime {
          bottom: 8%;
          left: 8%;
          background: var(--ai-lime);
          box-shadow: 0 0 14px var(--ai-lime);
        }

        .ai-floating-object {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          transform-style: preserve-3d;
        }

        .ai-object-cube {
          top: 19%;
          right: 6%;
          width: 42px;
          height: 42px;
          transform-style: preserve-3d;
        }

        .ai-cube-face {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(102, 232, 255, 0.72);
          background: rgba(102, 232, 255, 0.06);
          box-shadow: inset 0 0 18px rgba(102, 232, 255, 0.07);
          backface-visibility: visible;
        }

        .ai-cube-front {
          transform: translateZ(21px);
        }

        .ai-cube-back {
          transform: rotateY(180deg) translateZ(21px);
        }

        .ai-cube-right {
          transform: rotateY(90deg) translateZ(21px);
        }

        .ai-cube-left {
          transform: rotateY(-90deg) translateZ(21px);
        }

        .ai-cube-top {
          transform: rotateX(90deg) translateZ(21px);
        }

        .ai-cube-bottom {
          transform: rotateX(-90deg) translateZ(21px);
        }

        .ai-object-ring {
          top: 68%;
          right: 7%;
          width: 62px;
          height: 62px;
          transform-style: preserve-3d;
        }

        .ai-object-ring > div {
          position: absolute;
          inset: 0;
          border: 2px solid rgba(181, 160, 255, 0.85);
          border-radius: 50%;
          box-shadow: 0 0 18px rgba(181, 160, 255, 0.15);
        }

        .ai-object-ring > span {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--ai-violet);
          box-shadow: 0 0 14px var(--ai-violet);
          transform: translate(-50%, -50%) translateZ(31px);
        }

        .ai-object-diamond {
          top: 70%;
          left: 53%;
          width: 26px;
          height: 26px;
          transform-style: preserve-3d;
        }

        .ai-object-diamond div {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 157, 225, 0.8);
          background: rgba(255, 157, 225, 0.1);
          transform: rotate(45deg) skew(7deg, 7deg);
          box-shadow: 0 0 24px rgba(255, 157, 225, 0.12);
        }

        .ai-hero-bottom {
          position: relative;
          z-index: 2;
          border-top: 1px solid var(--ai-border);
          color: var(--ai-muted);
          font-size: 9px;
        }

        .ai-hero-bottom-inner {
          display: flex;
          min-height: 48px;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          width: min(1240px, calc(100% - 64px));
          margin-inline: auto;
        }

        .ai-hero-bottom-track {
          position: relative;
          width: min(240px, 25vw);
          height: 1px;
          overflow: hidden;
          background: var(--ai-border);
        }

        .ai-hero-bottom-track span {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 1px;
          background: var(--ai-cyan);
          box-shadow: 0 0 9px var(--ai-cyan);
        }

        .ai-manifesto {
          padding-block: 115px 96px;
        }

        .ai-section-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--ai-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .ai-section-kicker > span:first-child {
          color: var(--ai-cyan);
        }

        .ai-kicker-line {
          width: 35px;
          height: 1px;
          background: var(--ai-border);
        }

        .ai-manifesto-grid {
          display: grid;
          grid-template-columns: 1fr 0.7fr;
          align-items: end;
          gap: 60px;
          margin-top: 38px;
        }

        .ai-manifesto h2,
        .ai-section-heading h2,
        .ai-lab-heading h2,
        .ai-process-heading h2,
        .ai-faq-intro h2,
        .ai-cta-content h2 {
          margin: 0;
          font-size: clamp(38px, 5vw, 63px);
          font-weight: 680;
          letter-spacing: -0.065em;
          line-height: 1.06;
        }

        .ai-manifesto h2 span,
        .ai-section-heading h2 span,
        .ai-lab-heading h2 span,
        .ai-process-heading h2 span,
        .ai-faq-intro h2 span {
          color: var(--ai-muted);
        }

        .ai-manifesto-copy p {
          margin: 0 0 16px;
          color: var(--ai-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .ai-text-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 9px;
          color: var(--ai-ink);
          font-size: 13px;
          font-weight: 650;
        }

        .ai-text-link svg {
          color: var(--ai-cyan);
          transition: transform 180ms ease;
        }

        .ai-text-link:hover svg {
          transform: translateX(4px);
        }

        .ai-manifesto-visual {
          position: relative;
          display: flex;
          min-height: 165px;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 66px;
          overflow: hidden;
          padding: 24px 30px;
          border-block: 1px solid var(--ai-border);
        }

        .ai-manifesto-word {
          font-size: clamp(35px, 7vw, 90px);
          font-weight: 750;
          letter-spacing: -0.08em;
          color: color-mix(in srgb, var(--ai-ink) 72%, transparent);
        }

        .ai-manifesto-word-right {
          color: var(--ai-cyan);
        }

        .ai-manifesto-symbol {
          position: absolute;
          top: 50%;
          left: 50%;
          display: grid;
          width: 92px;
          height: 92px;
          place-items: center;
          border: 1px solid var(--ai-border);
          border-radius: 50%;
          background: var(--background);
          color: var(--ai-cyan);
          box-shadow: 0 0 35px rgba(102, 232, 255, 0.08);
          transform: translate(-50%, -50%);
        }

        .ai-manifesto-symbol svg {
          width: 48px;
          height: 48px;
          stroke-width: 1;
        }

        .ai-manifesto-scanline {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -20%;
          width: 1px;
          background: var(--ai-cyan);
          opacity: 0.35;
          box-shadow: 0 0 20px var(--ai-cyan);
          animation: ai-scan 8s linear infinite;
        }

        .ai-capabilities {
          padding-block: 30px 120px;
          scroll-margin-top: 40px;
        }

        .ai-section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 48px;
        }

        .ai-section-heading h2 {
          margin-top: 30px;
        }

        .ai-section-heading > p {
          max-width: 345px;
          margin: 0 0 5px;
          color: var(--ai-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .ai-capability-layout {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 20px;
        }

        .ai-capability-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .ai-capability-item {
          position: relative;
          display: grid;
          grid-template-columns: 29px 43px 1fr 18px;
          align-items: center;
          gap: 14px;
          width: 100%;
          min-height: 92px;
          padding: 17px 15px;
          overflow: hidden;
          border: 1px solid var(--ai-border);
          border-radius: 4px;
          background: var(--ai-glass);
          color: var(--ai-ink);
          text-align: left;
          cursor: pointer;
          transition:
            border-color 200ms ease,
            background 200ms ease,
            transform 200ms ease;
        }

        .ai-capability-item::before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          background: var(--ai-tone);
          content: "";
          opacity: 0;
          transform: scaleY(0.3);
          transition:
            opacity 200ms ease,
            transform 200ms ease;
        }

        .ai-capability-item:hover {
          transform: translateX(3px);
          border-color: color-mix(
            in srgb,
            var(--ai-tone) 40%,
            var(--ai-border)
          );
        }

        .ai-capability-item.is-active {
          border-color: color-mix(
            in srgb,
            var(--ai-tone) 45%,
            var(--ai-border)
          );
          background: color-mix(in srgb, var(--ai-tone) 6%, var(--card));
        }

        .ai-capability-item.is-active::before {
          opacity: 1;
          transform: scaleY(1);
        }

        .ai-capability-number {
          align-self: start;
          padding-top: 4px;
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
        }

        .ai-capability-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid
            color-mix(in srgb, var(--ai-tone) 34%, var(--ai-border));
          background: color-mix(in srgb, var(--ai-tone) 9%, transparent);
          color: var(--ai-tone);
        }

        .ai-capability-title {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .ai-capability-title strong {
          font-size: 14px;
          font-weight: 650;
        }

        .ai-capability-title small {
          color: var(--ai-muted);
          font-size: 11px;
        }

        .ai-capability-arrow {
          color: var(--ai-muted);
          transition:
            color 200ms ease,
            transform 200ms ease;
        }

        .ai-capability-item.is-active .ai-capability-arrow {
          color: var(--ai-tone);
          transform: translateX(2px);
        }

        .ai-tone-cyan {
          --ai-tone: var(--ai-cyan);
        }

        .ai-tone-violet {
          --ai-tone: var(--ai-violet);
        }

        .ai-tone-pink {
          --ai-tone: var(--ai-pink);
        }

        .ai-tone-lime {
          --ai-tone: var(--ai-lime);
        }

        .ai-capability-detail {
          min-width: 0;
          min-height: 400px;
          overflow: hidden;
          border: 1px solid var(--ai-border);
          background: var(--ai-glass);
        }

        .ai-capability-detail-inner {
          height: 100%;
        }

        .ai-detail-topline {
          display: flex;
          min-height: 44px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 18px;
          border-bottom: 1px solid var(--ai-border);
          color: var(--ai-muted);
          font-size: 9px;
        }

        .ai-detail-live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ai-tone);
        }

        .ai-detail-live > span {
          width: 5px;
          height: 5px;
          background: var(--ai-tone);
          box-shadow: 0 0 9px var(--ai-tone);
        }

        .ai-detail-art {
          position: relative;
          display: grid;
          min-height: 205px;
          place-items: center;
          overflow: hidden;
          border-bottom: 1px solid var(--ai-border);
          background:
            radial-gradient(
              circle at 50% 50%,
              color-mix(in srgb, var(--ai-tone) 12%, transparent),
              transparent 45%
            ),
            var(--background);
          perspective: 800px;
        }

        .ai-detail-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              to right,
              color-mix(in srgb, var(--ai-tone) 12%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--ai-tone) 12%, transparent) 1px,
              transparent 1px
            );
          background-size: 27px 27px;
          mask-image: radial-gradient(ellipse, black, transparent 76%);
        }

        .ai-detail-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid color-mix(in srgb, var(--ai-tone) 52%, transparent);
          border-radius: 50%;
        }

        .ai-detail-orbit-a {
          width: 160px;
          height: 72px;
          transform: translate(-50%, -50%) rotate(-30deg);
        }

        .ai-detail-orbit-b {
          width: 132px;
          height: 110px;
          border-color: color-mix(in srgb, var(--ai-tone) 24%, transparent);
          transform: translate(-50%, -50%) rotateX(62deg);
        }

        .ai-detail-orbit span {
          position: absolute;
          top: 0;
          left: 20%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--ai-tone);
          box-shadow: 0 0 12px var(--ai-tone);
        }

        .ai-detail-object {
          position: relative;
          z-index: 2;
          display: grid;
          width: 72px;
          height: 72px;
          place-items: center;
          border: 1px solid color-mix(in srgb, var(--ai-tone) 55%, transparent);
          background: color-mix(in srgb, var(--ai-tone) 10%, var(--background));
          color: var(--ai-tone);
          box-shadow:
            0 0 40px color-mix(in srgb, var(--ai-tone) 16%, transparent),
            inset 0 0 25px color-mix(in srgb, var(--ai-tone) 8%, transparent);
          transform-style: preserve-3d;
        }

        .ai-art-label {
          position: absolute;
          z-index: 2;
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-art-label-a {
          top: 15px;
          left: 16px;
        }

        .ai-art-label-b {
          right: 16px;
          bottom: 15px;
        }

        .ai-art-crosshair {
          position: absolute;
          width: 13px;
          height: 13px;
          border-color: var(--ai-tone);
          opacity: 0.65;
        }

        .ai-art-crosshair-a {
          top: 15px;
          right: 16px;
          border-top: 1px solid;
          border-right: 1px solid;
        }

        .ai-art-crosshair-b {
          bottom: 15px;
          left: 16px;
          border-bottom: 1px solid;
          border-left: 1px solid;
        }

        .ai-detail-copy {
          padding: 23px 24px 25px;
        }

        .ai-detail-copy h3 {
          margin: 0;
          font-size: 22px;
          font-weight: 650;
          letter-spacing: -0.04em;
        }

        .ai-detail-copy > p {
          max-width: 560px;
          margin: 11px 0 0;
          color: var(--ai-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .ai-detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }

        .ai-detail-tags span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 9px;
          border: 1px solid var(--ai-border);
          color: var(--ai-muted);
          font-size: 10px;
        }

        .ai-detail-tags svg {
          color: var(--ai-tone);
        }

        .ai-lab-section {
          position: relative;
          overflow: hidden;
          padding-block: 105px 95px;
          border-block: 1px solid var(--ai-border);
          background:
            radial-gradient(
              ellipse at 5% 45%,
              rgba(69, 205, 255, 0.08),
              transparent 33%
            ),
            radial-gradient(
              ellipse at 93% 70%,
              rgba(138, 98, 255, 0.09),
              transparent 36%
            ),
            var(--ai-panel);
          scroll-margin-top: 30px;
        }

        .ai-lab-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .ai-lab-blob {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          filter: blur(85px);
          opacity: 0.13;
          animation: ai-blob-drift 15s ease-in-out infinite alternate;
        }

        .ai-lab-blob-one {
          top: 18%;
          left: -170px;
          background: var(--ai-cyan);
        }

        .ai-lab-blob-two {
          right: -190px;
          bottom: 0;
          background: var(--ai-violet);
          animation-delay: -6s;
        }

        .ai-lab-inner {
          position: relative;
          z-index: 1;
        }

        .ai-lab-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 40px;
          margin-top: 33px;
          margin-bottom: 43px;
        }

        .ai-lab-heading h2 {
          font-size: clamp(38px, 4.8vw, 60px);
        }

        .ai-lab-heading > div:first-child > p {
          max-width: 550px;
          margin: 19px 0 0;
          color: var(--ai-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .ai-lab-stamp {
          display: flex;
          min-width: 112px;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          padding: 16px 14px;
          border: 1px solid var(--ai-border);
          color: var(--ai-cyan);
        }

        .ai-lab-stamp span,
        .ai-lab-stamp strong {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .ai-lab-stamp strong {
          color: var(--ai-muted);
          font-weight: 500;
        }

        .ai-lab-console {
          overflow: hidden;
          border: 1px solid
            color-mix(in srgb, var(--ai-cyan) 24%, var(--ai-border));
          background: color-mix(in srgb, var(--card) 91%, transparent);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(16px);
        }

        .ai-console-top {
          display: flex;
          min-height: 46px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-inline: 17px;
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-console-window-controls {
          display: flex;
          gap: 5px;
        }

        .ai-console-window-controls span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--ai-border);
        }

        .ai-console-window-controls span:first-child {
          background: #ff8d9c;
        }

        .ai-console-window-controls span:nth-child(2) {
          background: #ffce83;
        }

        .ai-console-window-controls span:nth-child(3) {
          background: #a7e7ad;
        }

        .ai-console-title,
        .ai-console-status {
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-console-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .ai-console-status > span {
          width: 5px;
          height: 5px;
          background: var(--ai-lime);
          box-shadow: 0 0 9px var(--ai-lime);
        }

        .ai-console-tabs {
          display: flex;
          gap: 0;
          overflow-x: auto;
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-console-tabs button {
          display: flex;
          min-height: 51px;
          flex: 1 0 auto;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 16px;
          border: 0;
          border-right: 1px solid var(--ai-border);
          background: transparent;
          color: var(--ai-muted);
          font-size: 11px;
          cursor: pointer;
          transition:
            color 180ms ease,
            background 180ms ease;
        }

        .ai-console-tabs button:last-child {
          border-right: 0;
        }

        .ai-console-tabs button > span {
          color: color-mix(in srgb, var(--ai-muted) 60%, transparent);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
        }

        .ai-console-tabs button.is-selected {
          background: color-mix(in srgb, var(--ai-cyan) 7%, transparent);
          color: var(--ai-ink);
          box-shadow: inset 0 -2px var(--ai-cyan);
        }

        .ai-console-tabs button.is-selected > span {
          color: var(--ai-cyan);
        }

        .ai-console-body {
          display: grid;
          grid-template-columns: 0.75fr 1.25fr;
          min-height: 360px;
        }

        .ai-architecture-copy {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 27px 25px;
          border-right: 1px solid var(--ai-border);
        }

        .ai-architecture-code {
          display: inline-block;
          color: var(--ai-cyan);
          font-size: 9px;
        }

        .ai-architecture-copy h3 {
          margin: 17px 0 0;
          font-size: 22px;
          font-weight: 650;
          letter-spacing: -0.04em;
        }

        .ai-architecture-copy p {
          margin: 12px 0 0;
          color: var(--ai-muted);
          font-size: 12px;
          line-height: 1.85;
        }

        .ai-architecture-output {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 24px;
          padding: 13px;
          border-left: 2px solid var(--ai-cyan);
          background: color-mix(in srgb, var(--ai-cyan) 5%, transparent);
        }

        .ai-architecture-output > span,
        .ai-architecture-meta {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-architecture-output strong {
          font-size: 11px;
          font-weight: 600;
        }

        .ai-architecture-meta {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 14px;
        }

        .ai-console-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
        }

        .ai-run-button {
          display: inline-flex;
          min-height: 37px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          border: 1px solid
            color-mix(in srgb, var(--ai-cyan) 35%, var(--ai-border));
          background: color-mix(in srgb, var(--ai-cyan) 8%, transparent);
          color: var(--ai-ink);
          font-size: 10px;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease;
        }

        .ai-run-button:hover {
          border-color: var(--ai-cyan);
          background: color-mix(in srgb, var(--ai-cyan) 14%, transparent);
        }

        .ai-console-actions > span {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-pipeline {
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          padding: 25px 20px 18px;
        }

        .ai-pipeline-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 34px;
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-pipeline-topline > span:last-child {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .ai-pipeline-topline i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ai-muted);
        }

        .ai-pipeline-topline i.is-running {
          background: var(--ai-lime);
          box-shadow: 0 0 10px var(--ai-lime);
          animation: ai-status-pulse 1s ease-in-out infinite;
        }

        .ai-pipeline-nodes {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }

        .ai-pipeline-step-wrap {
          display: flex;
          min-width: 0;
          flex: 1;
          align-items: center;
        }

        .ai-pipeline-node {
          display: flex;
          min-width: 0;
          width: 100%;
          min-height: 112px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 10px 4px;
          border: 1px solid var(--ai-border);
          background: var(--background);
          text-align: center;
        }

        .ai-node-index {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
        }

        .ai-node-icon {
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          color: var(--ai-cyan);
        }

        .ai-pipeline-node strong {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.06em;
        }

        .ai-node-state {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 7px;
          letter-spacing: 0.08em;
        }

        .ai-pipeline-node.is-executing .ai-node-state {
          color: var(--ai-lime);
        }

        .ai-pipeline-connector {
          position: relative;
          width: 21px;
          min-width: 10px;
          height: 1px;
          flex-shrink: 0;
          background: var(--ai-border);
        }

        .ai-pipeline-connector > span {
          position: absolute;
          top: -2px;
          left: 0;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--ai-cyan);
          box-shadow: 0 0 8px var(--ai-cyan);
        }

        .ai-pipeline-result {
          display: flex;
          min-height: 57px;
          align-items: center;
          gap: 12px;
          margin-top: 25px;
          padding: 10px 12px;
          border: 1px solid var(--ai-border);
          background: color-mix(in srgb, var(--background) 70%, transparent);
        }

        .ai-pipeline-result.is-active {
          border-color: color-mix(
            in srgb,
            var(--ai-lime) 40%,
            var(--ai-border)
          );
        }

        .ai-result-icon {
          display: grid;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid var(--ai-border);
          color: var(--ai-cyan);
        }

        .ai-pipeline-result > span:nth-child(2) {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 5px;
        }

        .ai-pipeline-result strong {
          font-size: 10px;
          font-weight: 600;
        }

        .ai-pipeline-result small {
          color: var(--ai-muted);
          font-size: 9px;
          line-height: 1.5;
        }

        .ai-result-pulse {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          margin-left: auto;
          border-radius: 50%;
          background: var(--ai-lime);
          box-shadow: 0 0 10px var(--ai-lime);
        }

        .ai-pipeline-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 19px;
          color: var(--ai-muted);
          font-size: 7px;
        }

        .ai-lab-footnote {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 12px;
          margin-top: 18px;
          color: var(--ai-muted);
          font-size: 10px;
          line-height: 1.7;
        }

        .ai-lab-footnote > span:first-child {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ai-cyan);
        }

        .ai-principles {
          padding-block: 115px 120px;
        }

        .ai-principle-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
        }

        .ai-principle-card {
          position: relative;
          display: flex;
          min-height: 280px;
          flex-direction: column;
          overflow: hidden;
          padding: 22px;
          border: 1px solid var(--ai-border);
          background: var(--ai-glass);
          transition: border-color 200ms ease;
        }

        .ai-principle-card:hover {
          border-color: color-mix(
            in srgb,
            var(--ai-cyan) 40%,
            var(--ai-border)
          );
        }

        .ai-principle-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-principle-card-top svg {
          color: var(--ai-cyan);
        }

        .ai-principle-icon {
          display: grid;
          width: 51px;
          height: 51px;
          place-items: center;
          margin-top: 37px;
          border: 1px solid
            color-mix(in srgb, var(--ai-cyan) 30%, var(--ai-border));
          background: color-mix(in srgb, var(--ai-cyan) 7%, transparent);
          color: var(--ai-cyan);
        }

        .ai-principle-card h3 {
          margin: 21px 0 0;
          font-size: 17px;
          font-weight: 650;
          letter-spacing: -0.035em;
        }

        .ai-principle-card p {
          margin: 10px 0 25px;
          color: var(--ai-muted);
          font-size: 12px;
          line-height: 1.85;
        }

        .ai-principle-card-line {
          position: absolute;
          right: 22px;
          bottom: 0;
          left: 22px;
          height: 1px;
          background: var(--ai-border);
        }

        .ai-principle-card-line span {
          display: block;
          width: 22%;
          height: 1px;
          background: var(--ai-cyan);
          transition: width 250ms ease;
        }

        .ai-principle-card:hover .ai-principle-card-line span {
          width: 100%;
        }

        .ai-process {
          padding-block: 0 125px;
        }

        .ai-process-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 40px;
          margin-block: 33px 48px;
        }

        .ai-process-heading > p {
          max-width: 340px;
          margin: 0 0 4px;
          color: var(--ai-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .ai-process-track {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid var(--ai-border);
        }

        .ai-process-step {
          display: flex;
          min-width: 0;
          min-height: 292px;
          flex-direction: column;
          padding: 19px 17px 0;
          border-right: 1px solid var(--ai-border);
          transition: background 200ms ease;
        }

        .ai-process-step:last-child {
          border-right: 0;
        }

        .ai-process-step:hover {
          background: color-mix(in srgb, var(--ai-cyan) 4%, transparent);
        }

        .ai-process-step-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-process-step-top > span:first-child {
          color: var(--ai-cyan);
        }

        .ai-process-icon {
          display: grid;
          width: 45px;
          height: 45px;
          place-items: center;
          margin-top: 31px;
          border: 1px solid var(--ai-border);
          color: var(--ai-cyan);
          transition:
            transform 250ms ease,
            background 250ms ease;
        }

        .ai-process-step:hover .ai-process-icon {
          transform: rotate(-7deg) translateY(-3px);
          background: color-mix(in srgb, var(--ai-cyan) 9%, transparent);
        }

        .ai-process-step h3 {
          margin: 20px 0 0;
          font-size: 15px;
          font-weight: 650;
          letter-spacing: -0.025em;
        }

        .ai-process-step p {
          margin: 10px 0 24px;
          color: var(--ai-muted);
          font-size: 11px;
          line-height: 1.85;
        }

        .ai-process-step-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-height: 42px;
          margin-top: auto;
          border-top: 1px solid var(--ai-border);
          color: var(--ai-muted);
          font-size: 8px;
        }

        .ai-process-step-bottom svg {
          color: var(--ai-cyan);
        }

        .ai-faq {
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 80px;
          padding-block: 0 125px;
        }

        .ai-faq-intro h2 {
          margin-top: 30px;
        }

        .ai-faq-intro > p {
          max-width: 270px;
          margin: 18px 0 0;
          color: var(--ai-muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .ai-faq-list {
          border-top: 1px solid var(--ai-border);
        }

        .ai-faq-item {
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-faq-item summary {
          display: grid;
          grid-template-columns: 30px 1fr 27px;
          align-items: center;
          gap: 13px;
          min-height: 74px;
          cursor: pointer;
          list-style: none;
        }

        .ai-faq-item summary::-webkit-details-marker {
          display: none;
        }

        .ai-faq-number {
          color: var(--ai-cyan);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
        }

        .ai-faq-question {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.6;
        }

        .ai-faq-toggle {
          position: relative;
          display: grid;
          width: 25px;
          height: 25px;
          place-items: center;
          border: 1px solid var(--ai-border);
        }

        .ai-faq-toggle span {
          position: absolute;
          width: 9px;
          height: 1px;
          background: var(--ai-ink);
          transition: transform 180ms ease;
        }

        .ai-faq-toggle span:last-child {
          transform: rotate(90deg);
        }

        .ai-faq-item[open] .ai-faq-toggle span:last-child {
          transform: rotate(0deg);
        }

        .ai-faq-answer {
          padding: 0 38px 23px 43px;
          animation: ai-faq-reveal 180ms ease both;
        }

        .ai-faq-answer p {
          max-width: 570px;
          margin: 0;
          color: var(--ai-muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .ai-cta-section {
          position: relative;
          overflow: hidden;
          border-block: 1px solid var(--ai-border);
          background:
            radial-gradient(
              ellipse at 78% 42%,
              rgba(73, 199, 255, 0.11),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 86% 70%,
              rgba(136, 98, 255, 0.1),
              transparent 36%
            ),
            var(--ai-panel);
        }

        .ai-cta-inner {
          position: relative;
          z-index: 2;
          padding-block: 83px 87px;
        }

        .ai-cta-content {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 25px;
          margin-top: 37px;
        }

        .ai-cta-overline {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 21px;
          color: var(--ai-muted);
          font-size: 9px;
        }

        .ai-cta-overline > span {
          width: 6px;
          height: 6px;
        }

        .ai-cta-content h2 {
          font-size: clamp(42px, 5.5vw, 70px);
        }

        .ai-cta-highlight {
          color: var(--ai-cyan);
        }

        .ai-cta-content > div:first-child > p {
          max-width: 460px;
          margin: 20px 0 0;
          color: var(--ai-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .ai-cta-visual {
          position: relative;
          display: grid;
          min-height: 350px;
          place-items: center;
          overflow: hidden;
          perspective: 900px;
        }

        .ai-cta-visual-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              to right,
              rgba(102, 232, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(102, 232, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse, black, transparent 72%);
        }

        .ai-cta-visual-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(102, 232, 255, 0.4);
          border-radius: 50%;
        }

        .ai-cta-visual-ring-one {
          width: 270px;
          height: 120px;
          transform: translate(-50%, -50%) rotate(-35deg);
        }

        .ai-cta-visual-ring-two {
          width: 210px;
          height: 230px;
          border-color: rgba(181, 160, 255, 0.4);
          transform: translate(-50%, -50%) rotateX(60deg);
        }

        .ai-cta-visual-core {
          position: relative;
          z-index: 2;
          display: grid;
          width: 110px;
          height: 110px;
          place-items: center;
          border: 1px solid rgba(102, 232, 255, 0.7);
          background:
            radial-gradient(circle, rgba(102, 232, 255, 0.2), transparent 72%),
            color-mix(in srgb, var(--background) 70%, transparent);
          color: var(--ai-cyan);
          box-shadow:
            0 0 35px rgba(102, 232, 255, 0.15),
            inset 0 0 25px rgba(102, 232, 255, 0.08);
          transform-style: preserve-3d;
        }

        .ai-cta-visual-label {
          position: absolute;
          z-index: 3;
          padding: 7px 9px;
          border: 1px solid var(--ai-border);
          background: var(--background);
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-cta-visual-label-one {
          top: 17%;
          left: 13%;
        }

        .ai-cta-visual-label-two {
          top: 23%;
          right: 8%;
        }

        .ai-cta-visual-label-three {
          right: 15%;
          bottom: 16%;
        }

        .ai-cta-orb {
          position: absolute;
          z-index: 1;
          width: 70px;
          height: 70px;
          border: 1px solid rgba(102, 232, 255, 0.5);
          background: rgba(102, 232, 255, 0.04);
          box-shadow: inset 0 0 25px rgba(102, 232, 255, 0.09);
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .ai-cta-orb-one {
          top: 13%;
          right: 9%;
          transform: rotate(30deg);
        }

        .ai-cta-orb-two {
          bottom: 12%;
          left: 5%;
          width: 44px;
          height: 44px;
          border-color: rgba(181, 160, 255, 0.55);
          border-radius: 50%;
          box-shadow: inset 0 0 20px rgba(181, 160, 255, 0.12);
        }

        .ai-next-service {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding-block: 34px;
        }

        .ai-next-service > div > span {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.14em;
        }

        .ai-next-service h2 {
          max-width: 480px;
          margin: 9px 0 0;
          font-size: 15px;
          font-weight: 550;
          line-height: 1.7;
        }

        .ai-next-link {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 13px 15px;
          border: 1px solid var(--ai-border);
          color: var(--ai-ink);
          transition:
            border-color 180ms ease,
            transform 180ms ease;
        }

        .ai-next-link:hover {
          transform: translateX(3px);
          border-color: var(--ai-cyan);
        }

        .ai-next-link > span {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ai-next-link small {
          color: var(--ai-muted);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .ai-next-link strong {
          font-size: 13px;
          font-weight: 650;
        }

        .ai-next-link > svg {
          color: var(--ai-cyan);
          transition: transform 180ms ease;
        }

        .ai-next-link:hover > svg {
          transform: translateX(3px);
        }

        @keyframes ai-scan {
          0% {
            left: -20%;
          }
          100% {
            left: 120%;
          }
        }

        @keyframes ai-blob-drift {
          0% {
            transform: translate3d(0, 0, 0) scale(0.9);
          }
          100% {
            transform: translate3d(80px, -40px, 0) scale(1.15);
          }
        }

        @keyframes ai-status-pulse {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes ai-faq-reveal {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 1500px) {
          .ai-hero-inner {
            min-height: 790px;
          }

          .ai-hero {
            min-height: 840px;
          }

          .ai-core-stage {
            width: 580px;
          }
        }

        @media (max-width: 1050px) {
          .ai-hero-inner {
            grid-template-columns: 1fr 0.85fr;
            width: min(100% - 48px, 1100px);
          }

          .ai-hero h1 {
            font-size: clamp(45px, 6vw, 66px);
          }

          .ai-core-stage {
            width: 100%;
          }

          .ai-core-data {
            font-size: 7px;
          }

          .ai-core-data strong {
            font-size: 7px;
          }

          .ai-manifesto-grid {
            gap: 38px;
          }

          .ai-capability-layout {
            grid-template-columns: 0.95fr 1.05fr;
          }

          .ai-capability-item {
            grid-template-columns: 22px 37px 1fr 14px;
            gap: 10px;
            padding-inline: 11px;
          }

          .ai-capability-icon {
            width: 37px;
            height: 37px;
          }

          .ai-console-body {
            grid-template-columns: 0.8fr 1.2fr;
          }

          .ai-pipeline {
            padding-inline: 13px;
          }

          .ai-pipeline-connector {
            width: 13px;
          }

          .ai-pipeline-node strong {
            font-size: 7px;
          }

          .ai-process-step {
            padding-inline: 13px;
          }

          .ai-process-step-top {
            font-size: 7px;
          }

          .ai-faq {
            gap: 45px;
          }
        }

        @media (max-width: 760px) {
          .ai-page .section-shell {
            width: calc(100% - 36px);
          }

          .ai-hero {
            min-height: auto;
          }

          .ai-hero-inner {
            grid-template-columns: 1fr;
            gap: 0;
            width: calc(100% - 36px);
            padding-block: 72px 28px;
          }

          .ai-hero-copy {
            max-width: 590px;
          }

          .ai-eyebrow {
            margin-bottom: 25px;
            font-size: 9px;
          }

          .ai-hero h1 {
            font-size: clamp(48px, 10.5vw, 76px);
          }

          .ai-hero-description {
            max-width: 540px;
            font-size: 14px;
          }

          .ai-hero-footnote {
            margin-top: 27px;
          }

          .ai-core-stage {
            width: min(100%, 480px);
            justify-self: center;
            margin-top: 7px;
          }

          .ai-hero-bottom-inner {
            width: calc(100% - 36px);
            min-height: 44px;
            font-size: 7px;
          }

          .ai-hero-bottom-track {
            width: 17vw;
          }

          .ai-orbit-one {
            top: 63%;
            left: 72%;
          }

          .ai-orbit-two {
            top: 47%;
            left: 58%;
          }

          .ai-manifesto {
            padding-block: 78px 65px;
          }

          .ai-manifesto-grid {
            grid-template-columns: 1fr;
            gap: 22px;
            margin-top: 28px;
          }

          .ai-manifesto h2,
          .ai-section-heading h2,
          .ai-lab-heading h2,
          .ai-process-heading h2,
          .ai-faq-intro h2 {
            font-size: clamp(39px, 8vw, 58px);
          }

          .ai-manifesto-copy p {
            font-size: 13px;
          }

          .ai-manifesto-visual {
            min-height: 110px;
            margin-top: 38px;
            padding-inline: 5px;
          }

          .ai-manifesto-word {
            font-size: clamp(32px, 8vw, 60px);
          }

          .ai-manifesto-symbol {
            width: 65px;
            height: 65px;
          }

          .ai-manifesto-symbol svg {
            width: 35px;
            height: 35px;
          }

          .ai-capabilities {
            padding-block: 10px 78px;
          }

          .ai-section-heading {
            align-items: start;
            flex-direction: column;
            gap: 17px;
            margin-bottom: 30px;
          }

          .ai-section-heading h2 {
            margin-top: 24px;
          }

          .ai-section-heading > p {
            max-width: 520px;
            font-size: 13px;
          }

          .ai-capability-layout {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .ai-capability-list {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }

          .ai-capability-item {
            grid-template-columns: 28px 1fr 14px;
            min-height: 104px;
            gap: 8px;
            padding: 12px 10px;
          }

          .ai-capability-number {
            grid-column: 1;
            grid-row: 1;
            padding-top: 0;
          }

          .ai-capability-icon {
            grid-column: 1;
            grid-row: 2;
            width: 30px;
            height: 30px;
          }

          .ai-capability-icon svg {
            width: 15px;
            height: 15px;
          }

          .ai-capability-title {
            grid-column: 2;
            grid-row: 1 / span 2;
            gap: 6px;
          }

          .ai-capability-title strong {
            font-size: 12px;
            line-height: 1.5;
          }

          .ai-capability-title small {
            font-size: 10px;
            line-height: 1.5;
          }

          .ai-capability-arrow {
            grid-column: 3;
            grid-row: 1;
            align-self: start;
          }

          .ai-capability-detail {
            min-height: 0;
          }

          .ai-detail-art {
            min-height: 185px;
          }

          .ai-detail-copy {
            padding: 20px 17px;
          }

          .ai-detail-copy h3 {
            font-size: 20px;
          }

          .ai-detail-tags {
            gap: 6px;
          }

          .ai-detail-tags span {
            font-size: 9px;
          }

          .ai-lab-section {
            padding-block: 77px 68px;
          }

          .ai-lab-heading {
            align-items: start;
            gap: 18px;
            margin-top: 28px;
            margin-bottom: 28px;
          }

          .ai-lab-heading > div:first-child > p {
            font-size: 13px;
          }

          .ai-lab-stamp {
            min-width: 78px;
            padding: 11px 8px;
          }

          .ai-lab-stamp span,
          .ai-lab-stamp strong {
            font-size: 7px;
          }

          .ai-console-top {
            padding-inline: 12px;
          }

          .ai-console-title {
            font-size: 7px;
          }

          .ai-console-status {
            font-size: 7px;
          }

          .ai-console-tabs button {
            min-height: 48px;
            justify-content: start;
            gap: 7px;
            padding-inline: 12px;
            font-size: 10px;
          }

          .ai-console-body {
            grid-template-columns: 1fr;
          }

          .ai-architecture-copy {
            padding: 22px 17px;
            border-right: 0;
            border-bottom: 1px solid var(--ai-border);
          }

          .ai-architecture-copy h3 {
            font-size: 20px;
          }

          .ai-architecture-copy p {
            max-width: 520px;
          }

          .ai-architecture-output {
            margin-top: 18px;
          }

          .ai-console-actions {
            margin-top: 19px;
          }

          .ai-pipeline {
            padding: 22px 12px 17px;
          }

          .ai-pipeline-topline {
            margin-bottom: 25px;
          }

          .ai-pipeline-nodes {
            align-items: stretch;
          }

          .ai-pipeline-node {
            min-height: 100px;
            gap: 7px;
          }

          .ai-node-icon {
            width: 25px;
            height: 25px;
          }

          .ai-node-icon svg {
            width: 15px;
            height: 15px;
          }

          .ai-pipeline-connector {
            width: 10px;
            min-width: 6px;
          }

          .ai-pipeline-footer {
            font-size: 6px;
          }

          .ai-lab-footnote {
            font-size: 9px;
          }

          .ai-principles {
            padding-block: 78px 80px;
          }

          .ai-principle-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .ai-principle-card {
            min-height: 0;
            padding: 18px;
          }

          .ai-principle-icon {
            width: 43px;
            height: 43px;
            margin-top: 25px;
          }

          .ai-principle-card h3 {
            margin-top: 16px;
          }

          .ai-principle-card p {
            max-width: 490px;
            margin-bottom: 20px;
          }

          .ai-principle-card-line {
            right: 18px;
            left: 18px;
          }

          .ai-process {
            padding-bottom: 80px;
          }

          .ai-process-heading {
            align-items: start;
            flex-direction: column;
            gap: 16px;
            margin-block: 27px 30px;
          }

          .ai-process-heading > p {
            max-width: 520px;
          }

          .ai-process-track {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ai-process-step {
            min-height: 270px;
            padding: 16px 14px 0;
            border-bottom: 1px solid var(--ai-border);
          }

          .ai-process-step:nth-child(2) {
            border-right: 0;
          }

          .ai-process-step:nth-child(3),
          .ai-process-step:nth-child(4) {
            border-bottom: 0;
          }

          .ai-process-step-top {
            flex-wrap: wrap;
          }

          .ai-process-step h3 {
            font-size: 14px;
          }

          .ai-process-step p {
            font-size: 10px;
          }

          .ai-faq {
            grid-template-columns: 1fr;
            gap: 28px;
            padding-bottom: 80px;
          }

          .ai-faq-intro h2 {
            margin-top: 24px;
          }

          .ai-faq-intro > p {
            max-width: 400px;
          }

          .ai-faq-item summary {
            grid-template-columns: 25px 1fr 25px;
            gap: 9px;
            min-height: 68px;
          }

          .ai-faq-question {
            font-size: 12px;
          }

          .ai-faq-answer {
            padding: 0 28px 20px 34px;
          }

          .ai-cta-inner {
            padding-block: 70px;
          }

          .ai-cta-content {
            grid-template-columns: 1fr;
            gap: 8px;
            margin-top: 29px;
          }

          .ai-cta-content h2 {
            font-size: clamp(43px, 9vw, 64px);
          }

          .ai-cta-visual {
            min-height: 270px;
          }

          .ai-cta-visual-ring-one {
            width: 230px;
          }

          .ai-cta-visual-ring-two {
            height: 190px;
          }

          .ai-next-service {
            align-items: start;
            flex-direction: column;
            padding-block: 25px;
          }

          .ai-next-link {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 420px) {
          .ai-page .section-shell {
            width: calc(100% - 28px);
          }

          .ai-hero-inner {
            width: calc(100% - 28px);
            padding-top: 58px;
          }

          .ai-hero h1 {
            font-size: clamp(43px, 11vw, 53px);
          }

          .ai-hero-description {
            font-size: 13px;
          }

          .ai-hero-actions {
            align-items: stretch;
          }

          .ai-button {
            min-height: 45px;
            padding-inline: 12px;
            font-size: 11px;
          }

          .ai-core-stage {
            width: calc(100% + 12px);
            margin-left: -6px;
          }

          .ai-core-data {
            gap: 4px;
            padding: 7px 6px;
            font-size: 6px;
            letter-spacing: 0.06em;
          }

          .ai-core-data strong {
            font-size: 6px;
          }

          .ai-data-left {
            left: 0;
          }

          .ai-data-right {
            right: 0;
          }

          .ai-data-top {
            left: 28%;
          }

          .ai-data-bottom {
            left: 26%;
          }

          .ai-mini-node {
            width: 34px;
            height: 34px;
          }

          .ai-mini-node svg {
            width: 15px;
            height: 15px;
          }

          .ai-core-caption {
            font-size: 6px;
          }

          .ai-hero-bottom-inner {
            width: calc(100% - 28px);
            gap: 9px;
            font-size: 6px;
          }

          .ai-hero-bottom-inner > span:last-child {
            text-align: right;
          }

          .ai-eyebrow {
            gap: 7px;
            font-size: 8px;
          }

          .ai-capability-list {
            gap: 6px;
          }

          .ai-capability-item {
            grid-template-columns: 23px 1fr 10px;
            min-height: 103px;
            gap: 6px;
            padding: 10px 7px;
          }

          .ai-capability-icon {
            width: 26px;
            height: 26px;
          }

          .ai-capability-title strong {
            font-size: 11px;
          }

          .ai-capability-title small {
            font-size: 9px;
          }

          .ai-detail-topline {
            padding-inline: 11px;
            font-size: 7px;
          }

          .ai-detail-copy {
            padding-inline: 13px;
          }

          .ai-detail-tags span {
            padding: 6px;
            font-size: 8px;
          }

          .ai-lab-stamp {
            min-width: 63px;
          }

          .ai-lab-stamp svg {
            width: 18px;
            height: 18px;
          }

          .ai-console-title {
            max-width: 115px;
            text-align: center;
          }

          .ai-console-tabs button {
            padding-inline: 9px;
            font-size: 9px;
          }

          .ai-pipeline {
            padding-inline: 7px;
          }

          .ai-pipeline-node {
            min-height: 91px;
            padding-inline: 1px;
          }

          .ai-pipeline-node strong {
            font-size: 6px;
            letter-spacing: 0;
          }

          .ai-node-state {
            font-size: 6px;
          }

          .ai-pipeline-connector {
            width: 7px;
            min-width: 4px;
          }

          .ai-pipeline-footer {
            letter-spacing: 0.04em;
          }

          .ai-process-step {
            min-height: 285px;
            padding-inline: 10px;
          }

          .ai-process-step-top {
            font-size: 6px;
          }

          .ai-process-step h3 {
            font-size: 13px;
          }

          .ai-process-step-bottom {
            font-size: 7px;
          }

          .ai-cta-actions {
            align-items: stretch;
          }

          .ai-cta-actions .ai-button {
            flex: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-page *,
          .ai-page *::before,
          .ai-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
