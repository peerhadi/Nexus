import type { WorkProject } from "./types";

export const prismProject: WorkProject = {
  id: "the-prism",
  title: "The Prism",
  category: "Content discovery",
  status: "Project",
  tagline: "See the story from more than one angle.",
  description:
    "An RSS-powered content discovery project exploring AI-assisted classification, organized reading, and the different perspectives surrounding a story.",
  overview:
    "The Prism explores a more intentional way to discover and understand content. Instead of treating a stream of articles as an endless list, the idea is to make incoming information easier to classify, browse, and approach from different angles.",
  repository: "https://github.com/peerhadi/The-Prism",
  website: null,
  gradient: "var(--gradient-cyan-violet)",
  accentGradient: "var(--gradient-violet-pink)",
  visual: "prism",
  heroEyebrow: "A different perspective on information",
  heroStatement:
    "Information is everywhere. Understanding it is the real interface.",
  projectType: "Content discovery and reading experience",
  focusAreas: [
    "RSS-based content",
    "AI-assisted classification",
    "Content discovery",
    "Multiple perspectives",
    "Information organization",
    "Reading experience",
  ],
  technologies: [
    {
      name: "RSS",
      role: "A foundation for collecting content from feeds.",
      verified: true,
    },
    {
      name: "AI-assisted classification",
      role: "A project focus for organizing incoming information.",
      verified: true,
    },
    {
      name: "Content discovery",
      role: "The central product experience.",
      verified: true,
    },
    {
      name: "Perspective-based exploration",
      role: "A product direction represented in this case study.",
      verified: true,
    },
  ],
  capabilities: [
    {
      number: "01",
      title: "Bring content together",
      description:
        "RSS provides a structured starting point for collecting articles from different sources.",
      detail:
        "The discovery experience begins with incoming content rather than a blank search box. Sources become part of a broader reading environment.",
      icon: "feeds",
    },
    {
      number: "02",
      title: "Make information easier to navigate",
      description:
        "Classification provides a way to move beyond a single undifferentiated stream.",
      detail:
        "Organizing content helps readers move between subjects and find a useful starting point when the amount of information grows.",
      icon: "classify",
    },
    {
      number: "03",
      title: "Explore different angles",
      description:
        "The Prism's concept emphasizes that a story can be approached from more than one perspective.",
      detail:
        "The interface direction encourages exploration instead of presenting the first result as the only relevant result.",
      icon: "perspectives",
    },
    {
      number: "04",
      title: "Keep discovery readable",
      description:
        "The product experience is centered on helping people navigate information without unnecessary friction.",
      detail:
        "Content structure, hierarchy, and clear entry points are part of the experience—not decoration added after the core idea.",
      icon: "reading",
    },
  ],
  workflow: [
    {
      number: "01",
      title: "Collect",
      description: "Start with content published through RSS feeds.",
      output: "Incoming articles",
    },
    {
      number: "02",
      title: "Classify",
      description: "Use AI-assisted classification as an organizing layer.",
      output: "More structured content",
    },
    {
      number: "03",
      title: "Discover",
      description: "Give readers ways to browse and explore what is relevant.",
      output: "A navigable reading experience",
    },
    {
      number: "04",
      title: "Compare perspectives",
      description:
        "Encourage exploration of a subject beyond a single content entry point.",
      output: "A broader view of a topic",
    },
  ],
  deepDive: [
    {
      eyebrow: "01 / The problem space",
      title: "A feed is not the same thing as understanding.",
      description:
        "Feeds are useful for bringing updates into one place. But collecting more content does not automatically make that content easier to navigate or understand.",
      bullets: [
        "A growing list can become harder to browse.",
        "Related content can be difficult to discover when everything looks equally important.",
        "Readers need useful ways to move between subjects and sources.",
        "A good discovery interface should help people explore, not merely scroll.",
      ],
    },
    {
      eyebrow: "02 / The product direction",
      title: "Turn a stream into an experience.",
      description:
        "The Prism's direction combines content collection, AI-assisted classification, and a reading experience designed around discovery.",
      bullets: [
        "Use RSS as a content input.",
        "Treat classification as an organizational aid.",
        "Make navigation and hierarchy central to the interface.",
        "Keep multiple perspectives part of the discovery concept.",
      ],
    },
    {
      eyebrow: "03 / The design challenge",
      title: "Give complex information room to breathe.",
      description:
        "A content-heavy product needs enough information to be useful without turning every screen into a wall of cards, labels, and controls.",
      bullets: [
        "Create clear visual differences between content and navigation.",
        "Make categories recognizable at a glance.",
        "Use motion to direct attention rather than distract from reading.",
        "Keep the underlying content more important than the interface effects.",
      ],
    },
  ],
  principles: [
    {
      title: "Discovery before decoration",
      description:
        "Visual effects should make the information easier to explore, not compete with the content.",
    },
    {
      title: "Structure beats clutter",
      description:
        "Classification and hierarchy give readers a clearer way to move through incoming information.",
    },
    {
      title: "More than one angle",
      description:
        "The product concept values broader exploration instead of reducing a topic to a single entry point.",
    },
    {
      title: "Readable by design",
      description:
        "Typography, spacing, and content grouping should support the act of reading.",
    },
  ],
  showcase: {
    eyebrow: "Interactive concept",
    title: "A reading interface with room to explore.",
    description:
      "This animated showcase demonstrates the content-discovery direction: source cards, topic groupings, and perspective-oriented browsing in one visual environment.",
    note: "The sample headlines and interface content shown here are illustrative. They are not presented as live articles or a live feed from the repository.",
  },
  challenges: [
    {
      title: "Organizing incoming information",
      problem:
        "Content from different sources can arrive in different formats and cover very different subjects.",
      approach:
        "Use the idea of classification and clear content grouping to make browsing more intentional.",
    },
    {
      title: "Keeping discovery approachable",
      problem:
        "Adding more filters and controls can make a reading product feel harder to use.",
      approach:
        "Give the interface a clear hierarchy and make the main paths through content easy to recognize.",
    },
    {
      title: "Showing perspective without overwhelming readers",
      problem:
        "A product about multiple perspectives can become visually noisy if every angle competes for attention.",
      approach:
        "Use focused visual groupings and progressive exploration rather than showing everything at once.",
    },
  ],
  faqs: [
    {
      question: "What is The Prism?",
      answer:
        "The Prism is an RSS-based content discovery project focused on AI-assisted classification, organized information, and exploring different perspectives.",
    },
    {
      question: "What does RSS contribute?",
      answer:
        "RSS provides a way to collect published content from feeds, giving the discovery experience a structured content input.",
    },
    {
      question: "What is AI-assisted classification for?",
      answer:
        "It is an organizing concept in the project: helping incoming content become easier to navigate and discover.",
    },
    {
      question: "Can I inspect the project?",
      answer:
        "Yes. The project has a public GitHub repository linked on this page.",
    },
  ],
  galleryLabels: [
    "Content discovery",
    "Feed organization",
    "Topic exploration",
    "Perspective-driven browsing",
  ],
  nextProjectText:
    "From discovering information to organizing the work behind it.",
};
