import type { LucideIcon } from "lucide-react";

export type ArchitectureKey = "assistant" | "knowledge" | "agent";

export interface Capability {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
}

export interface Architecture {
  label: string;
  code: string;
  description: string;
  nodes: string[];
  output: string;
  time: string;
}

export interface Principle {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
  detail: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
