export type WorkProjectId =
  "the-prism" | "obsidian" | "dps-campus-event-notifier" | "nexus-game-engine";

export type WorkProject = {
  id: WorkProjectId;
  title: string;
  category: string;
  status: string;
  tagline: string;
  description: string;
  overview: string;
  repository: string | null;
  website: string | null;
  gradient: string;
  accentGradient: string;
  visual: "prism" | "obsidian" | "notifier" | "engine";
  heroEyebrow: string;
  heroStatement: string;
  projectType: string;
  focusAreas: string[];
  technologies: {
    name: string;
    role: string;
    verified: boolean;
  }[];
  capabilities: {
    number: string;
    title: string;
    description: string;
    detail: string;
    icon: string;
  }[];
  workflow: {
    number: string;
    title: string;
    description: string;
    output: string;
  }[];
  deepDive: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
  }[];
  principles: {
    title: string;
    description: string;
  }[];
  showcase: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
  };
  challenges: {
    title: string;
    problem: string;
    approach: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  galleryLabels: string[];
  nextProjectText: string;
};
