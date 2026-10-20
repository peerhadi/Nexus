import type { WorkProject } from "./types";

export const engineProject: WorkProject = {
  id: "nexus-game-engine",
  title: "Nexus Game Engine",
  category: "Engine development",
  status: "In development",
  tagline: "A foundation for building interactive worlds.",
  description:
    "An original game-engine project in development, exploring the foundations of interactive scenes, reusable systems, and real-time visual experiences.",
  overview:
    "The Nexus Game Engine is an in-development project in the Engines category. This case study presents a visual exploration of the systems and relationships that matter in an engine project without claiming that every illustrated control or system is already implemented.",
  repository: "https://github.com/peerhadi/Nexus-Engine",
  website: null,
  gradient: "var(--gradient-emerald-cyan)",
  accentGradient: "var(--gradient-cyan-violet)",
  visual: "engine",
  heroEyebrow: "Building the foundations",
  heroStatement: "Every world begins with the systems that bring it to life.",
  projectType: "Game engine and interactive systems",
  focusAreas: [
    "Engine development",
    "Interactive scenes",
    "Reusable systems",
    "Real-time visuals",
    "Development tooling",
    "World-building foundations",
  ],
  technologies: [
    {
      name: "Game engine",
      role: "The project's development category.",
      verified: true,
    },
    {
      name: "Interactive scenes",
      role: "A visual direction demonstrated in this case study.",
      verified: false,
    },
    {
      name: "Reusable systems",
      role: "An engine-design area explored by the showcase.",
      verified: false,
    },
    {
      name: "Development tooling",
      role: "A potential area represented by the illustrative editor view.",
      verified: false,
    },
  ],
  capabilities: [
    {
      number: "01",
      title: "Think in systems",
      description:
        "An engine brings multiple parts of an interactive experience into a coordinated environment.",
      detail:
        "The case study explores how scene content, controls, and reusable building blocks can be presented as connected parts of a larger system.",
      icon: "systems",
    },
    {
      number: "02",
      title: "Build a scene",
      description:
        "A scene provides a useful visual unit for exploring an interactive world.",
      detail:
        "The animated scene below is a demonstration environment, not a claim about a finished in-engine renderer.",
      icon: "scene",
    },
    {
      number: "03",
      title: "Make structure visible",
      description:
        "Development interfaces help expose the relationships behind what appears on screen.",
      detail:
        "A scene tree and inspector-style panel are useful visual metaphors for understanding how an engine workspace might be organized.",
      icon: "structure",
    },
    {
      number: "04",
      title: "Leave room to grow",
      description:
        "An engine project needs a foundation that can accommodate more systems as development continues.",
      detail:
        "The page treats this project as work in progress and distinguishes design exploration from confirmed implementation.",
      icon: "growth",
    },
  ],
  workflow: [
    {
      number: "01",
      title: "Define the scene",
      description:
        "Establish the objects and relationships that make up an interactive environment.",
      output: "A scene structure",
    },
    {
      number: "02",
      title: "Connect systems",
      description:
        "Consider how scene elements and reusable systems relate to one another.",
      output: "A connected engine model",
    },
    {
      number: "03",
      title: "Inspect and adjust",
      description:
        "Use development tooling concepts to understand the scene and its configuration.",
      output: "A clearer development workflow",
    },
    {
      number: "04",
      title: "Expand the foundation",
      description:
        "Develop the project incrementally as its implemented capabilities grow.",
      output: "A foundation for future work",
    },
  ],
  deepDive: [
    {
      eyebrow: "01 / The foundation",
      title: "An engine is more than what appears on screen.",
      description:
        "The visible scene is only one part of an engine-oriented project. The broader challenge is how the scene relates to reusable systems, configuration, and the tools used to develop it.",
      bullets: [
        "Separate the visible experience from the systems behind it.",
        "Consider how scene elements relate to one another.",
        "Keep the development workflow understandable.",
        "Build the project incrementally rather than presenting unfinished systems as complete.",
      ],
    },
    {
      eyebrow: "02 / The tooling",
      title: "Make the work easier to inspect.",
      description:
        "An editor-style interface can make an engine's structure easier to reason about. The showcase uses a scene hierarchy and property panel as an illustrative way to communicate that idea.",
      bullets: [
        "Represent scene elements in a readable hierarchy.",
        "Give related settings a clear place in the interface.",
        "Keep the active scene visually prominent.",
        "Distinguish a design mockup from a working editor feature.",
      ],
    },
    {
      eyebrow: "03 / The direction",
      title: "Treat development as an evolving system.",
      description:
        "The project is in development. This page is designed to show the ambition and areas of exploration while being clear about what has and has not been verified.",
      bullets: [
        "Show the project's direction without inventing implementation claims.",
        "Keep potential systems distinct from confirmed features.",
        "Use visual prototypes to communicate ideas.",
        "Allow the case study to grow as real milestones are completed.",
      ],
    },
  ],
  principles: [
    {
      title: "Systems over isolated effects",
      description:
        "An engine's value comes from how its pieces work together, not just from a striking scene.",
    },
    {
      title: "Make structure understandable",
      description:
        "Development tools should help explain how an interactive experience is organized.",
    },
    {
      title: "Prototype honestly",
      description:
        "Visual exploration can communicate a direction without pretending to be a finished feature.",
    },
    {
      title: "Build incrementally",
      description:
        "An in-development engine should be presented as evolving work, with room for real progress to be documented.",
    },
  ],
  showcase: {
    eyebrow: "Animated scene concept",
    title: "A small window into a larger world.",
    description:
      "Explore a procedural-looking scene, a scene-tree concept, and an inspector-style panel. This is a visual case-study prototype intended to communicate engine-development ideas.",
    note: "The scene and editor panels are illustrative web visuals. They are not a live build of the Nexus Game Engine and do not confirm that the depicted systems have been implemented.",
  },
  challenges: [
    {
      title: "Separating the scene from its systems",
      problem:
        "A visually impressive scene does not communicate how the underlying engine is structured.",
      approach:
        "Show the scene alongside illustrative system and editor views to make the wider development context easier to understand.",
    },
    {
      title: "Communicating work in progress",
      problem:
        "A polished showcase can accidentally imply that every depicted feature is already complete.",
      approach:
        "Label the visuals as illustrative and keep the project's in-development status visible.",
    },
    {
      title: "Planning for expansion",
      problem:
        "An engine project can grow in many directions, making it important to keep its systems understandable.",
      approach:
        "Use reusable concepts and clear organization as the guiding themes for the case study.",
    },
  ],
  faqs: [
    {
      question: "What is the Nexus Game Engine?",
      answer:
        "It is an original game-engine project that is currently in development.",
    },
    {
      question: "Is the animated scene running in the engine?",
      answer:
        "No. The scene on this page is a web-based visual demonstration created for the case study. It is not a live engine build.",
    },
    {
      question: "Are all the editor panels implemented?",
      answer:
        "The editor-style panels are illustrative. They communicate development concepts and should not be read as a list of completed engine features.",
    },
    {
      question: "Can I download it?",
      answer:
        "A public repository or downloadable build has not been provided for this project, so this page does not offer a download link.",
    },
  ],
  galleryLabels: [
    "Scene exploration",
    "System relationships",
    "Editor concepts",
    "Engine development",
  ],
  nextProjectText:
    "Return to the complete collection and explore another project.",
};
