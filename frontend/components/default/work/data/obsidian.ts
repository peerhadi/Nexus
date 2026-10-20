import type { WorkProject } from "./types";

export const obsidianProject: WorkProject = {
  id: "obsidian",
  title: "Obsidian",
  category: "Browser extension",
  status: "Project",
  tagline: "Keep project context closer to the work.",
  description:
    "A browser-extension project exploring an Obsidian-like approach to project organization, with a focus on keeping useful context and work references close at hand.",
  overview:
    "Obsidian explores the idea of bringing project-oriented organization into the browser. Rather than treating browsing and project context as completely separate activities, the concept focuses on a compact workspace for keeping related information together.",
  repository: "https://github.com/peerhadi/Nexus-Engine",
  website: null,
  gradient: "var(--gradient-violet-pink)",
  accentGradient: "var(--gradient-cyan-violet)",
  visual: "obsidian",
  heroEyebrow: "A workspace that stays close",
  heroStatement:
    "Your browser is where work happens. Your context should not disappear into it.",
  projectType: "Browser extension and project organization",
  focusAreas: [
    "Browser extension",
    "Project organization",
    "Context management",
    "Compact workspace",
    "Information retrieval",
    "Workflow continuity",
  ],
  technologies: [
    {
      name: "Browser extension",
      role: "The project's known delivery format.",
      verified: true,
    },
    {
      name: "Project organization",
      role: "The central product direction.",
      verified: true,
    },
    {
      name: "Context management",
      role: "A design focus explored by the concept.",
      verified: true,
    },
    {
      name: "Workspace interface",
      role: "An illustrative interface direction for this case study.",
      verified: false,
    },
  ],
  capabilities: [
    {
      number: "01",
      title: "Keep project context together",
      description:
        "Explore a workspace where related notes, references, and project details can sit close together.",
      detail:
        "The central idea is to reduce the distance between the page someone is working on and the context they need to remember.",
      icon: "workspace",
    },
    {
      number: "02",
      title: "Work from the browser",
      description:
        "A browser extension gives the concept a natural place alongside everyday browsing.",
      detail:
        "Instead of requiring a completely separate full-screen environment, the extension format suggests a compact, nearby workspace.",
      icon: "browser",
    },
    {
      number: "03",
      title: "Organize around projects",
      description:
        "Use projects as a way to group information by what it belongs to, not only where it came from.",
      detail:
        "A project-oriented view can give related material a shared home and make the context behind a task easier to follow.",
      icon: "projects",
    },
    {
      number: "04",
      title: "Reduce context switching",
      description:
        "Keep useful information within reach while moving between browser pages and tasks.",
      detail:
        "The design goal is continuity: make it easier to reconnect with the work instead of repeatedly reconstructing its context.",
      icon: "focus",
    },
  ],
  workflow: [
    {
      number: "01",
      title: "Browse",
      description:
        "Start with the browser as the environment where the work is happening.",
      output: "Current browsing context",
    },
    {
      number: "02",
      title: "Connect",
      description: "Relate useful information to a project or work area.",
      output: "Project-related context",
    },
    {
      number: "03",
      title: "Organize",
      description:
        "Keep references and project information in a more deliberate structure.",
      output: "A more coherent workspace",
    },
    {
      number: "04",
      title: "Return",
      description:
        "Make it easier to pick up the thread when returning to the work.",
      output: "Less context to reconstruct",
    },
  ],
  deepDive: [
    {
      eyebrow: "01 / The idea",
      title: "A small workspace can have a big job.",
      description:
        "Browser extensions occupy a constrained space. That makes clarity and prioritization especially important: the interface should help without taking over the page.",
      bullets: [
        "Treat the browser as the primary working environment.",
        "Keep project context organized around meaningful groups.",
        "Make important information recognizable in a compact interface.",
        "Avoid turning a small extension panel into a crowded dashboard.",
      ],
    },
    {
      eyebrow: "02 / The experience",
      title: "Keep the connection between a page and a project.",
      description:
        "The project explores a closer relationship between browsing, references, and project context. The goal is a more continuous workflow, not another destination that needs constant attention.",
      bullets: [
        "Make the project the organizing unit.",
        "Keep context visually distinct from controls.",
        "Favor quick orientation over unnecessary complexity.",
        "Design for returning to work after interruptions.",
      ],
    },
    {
      eyebrow: "03 / The constraint",
      title: "Useful information, limited space.",
      description:
        "An extension cannot assume that it has an entire monitor to itself. Its interface needs to communicate structure quickly and make efficient use of the available space.",
      bullets: [
        "Use compact information groups.",
        "Establish a clear order of importance.",
        "Make navigation predictable.",
        "Let the surrounding browser remain the main workspace.",
      ],
    },
  ],
  principles: [
    {
      title: "Context stays close",
      description:
        "The project explores bringing relevant project information closer to the browser workflow.",
    },
    {
      title: "Projects are the organizing unit",
      description:
        "Related information should be understandable in relation to the work it supports.",
    },
    {
      title: "Compact, not cramped",
      description:
        "A small interface still needs readable hierarchy and intentional spacing.",
    },
    {
      title: "Continuity over interruption",
      description:
        "The experience should help someone resume work rather than create another task to manage.",
    },
  ],
  showcase: {
    eyebrow: "Interface concept",
    title: "A project workspace, right beside the page.",
    description:
      "Explore an illustrative extension panel with project navigation, references, and a compact workspace. It demonstrates the intended product direction rather than claiming to be a screenshot of a shipped build.",
    note: "The workspace entries and controls shown here are illustrative interface content. No public repository or verified live demo is currently linked for this project.",
  },
  challenges: [
    {
      title: "Working within extension space",
      problem:
        "A compact browser panel has much less room than a full application page.",
      approach:
        "Prioritize clear grouping, quick orientation, and a compact visual hierarchy.",
    },
    {
      title: "Keeping project information connected",
      problem:
        "References and task context can become disconnected from the project they support.",
      approach:
        "Use project-oriented grouping as the organizing concept for the workspace.",
    },
    {
      title: "Avoiding another source of clutter",
      problem:
        "A tool intended to help with organization can become one more crowded surface.",
      approach:
        "Keep the experience focused on the context that matters to the current work.",
    },
  ],
  faqs: [
    {
      question: "What is Obsidian?",
      answer:
        "Obsidian is a browser-extension project exploring an Obsidian-like approach to organizing projects and keeping useful context close to the browser workflow.",
    },
    {
      question: "Is this the same as the Obsidian note-taking app?",
      answer:
        "The name describes this project. The case study focuses on its browser-extension and project-organization direction, not on claiming it is the official Obsidian application.",
    },
    {
      question: "Can I try a live version?",
      answer:
        "A public repository or live demo has not been provided for this project, so this page presents an illustrative interface concept instead of an install link.",
    },
    {
      question: "What is the main design challenge?",
      answer:
        "The concept has to make project context useful and understandable within the limited space of a browser extension.",
    },
  ],
  galleryLabels: [
    "Browser workspace",
    "Project context",
    "Compact organization",
    "Workflow continuity",
  ],
  nextProjectText:
    "From keeping context close to turning incoming messages into usable events.",
};
