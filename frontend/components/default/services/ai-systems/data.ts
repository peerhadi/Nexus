import {
  BrainCircuit,
  Database,
  Eye,
  Fingerprint,
  GitBranch,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import type {
  Architecture,
  ArchitectureKey,
  Capability,
  Principle,
} from "@/components/default/services/ai-systems/types";

export const capabilities: Capability[] = [
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

export const architectures: Record<ArchitectureKey, Architecture> = {
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

export const principles: Principle[] = [
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

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
