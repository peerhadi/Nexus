export type GalleryProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  action?: string;
  visual: string;
};

export const galleryProjects: GalleryProject[] = [
  {
    id: "01",
    name: "The Prism",
    category: "CONTENT DISCOVERY",
    description:
      "A different lens on the internet. Discover stories, connect perspectives and bring structure to a noisy stream of information.",
    stack: ["TypeScript", "AI", "RSS"],
    href: "/work/the-prism",
    action: "Explore the repository",
    visual: "prism",
  },
  {
    id: "02",
    name: "Obsidian",
    category: "BROWSER EXTENSION",
    description:
      "A browser experience built around projects, with a focused interface designed to keep useful things close at hand.",
    stack: ["Browser APIs", "TypeScript", "Extension UI"],
    href: "/work/obsidian",
    action: "Project details coming next",
    visual: "obsidian",
  },
  {
    id: "03",
    name: "Campus Event Notifier",
    category: "AUTOMATION",
    description:
      "Turn campus announcements into something actionable. Extract event details and generate a calendar-ready file.",
    stack: ["TypeScript", "Gemini", ".ics"],
    href: "/work/dps-campus-event-notifier",
    visual: "automation",
  },
  {
    id: "04",
    name: "Nexus Game Engine",
    category: "GAME TECHNOLOGY",
    description:
      "An exploration of game systems, interactive worlds and the building blocks behind playable experiences.",
    stack: ["Game systems", "Rendering", "Interaction"],
    href: "/work/nexus-game-engine",
    action: "Project details coming next",
    visual: "engine",
  },
];

export const galleryFaqs = [
  {
    question: "What am I looking at?",
    answer:
      "A selection of original projects built to explore ideas, solve problems and experiment with software. Each project has its own purpose and direction.",
  },
  {
    question: "Can I explore the source code?",
    answer:
      "Public repositories are linked directly from their project cards. Projects without a public repository will receive their own detail pages as the portfolio develops.",
  },
  {
    question: "Are these client projects?",
    answer:
      "This gallery focuses on original projects and independent experiments. It does not present every project as commissioned client work.",
  },
  {
    question: "Can we build something together?",
    answer:
      "Yes. Visit the build page to share your idea, explain what you need and start a project conversation with Nexus.",
  },
];
