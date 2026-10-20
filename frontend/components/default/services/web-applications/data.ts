import {
  Database,
  Gauge,
  Layers3,
  PanelsTopLeft,
  Puzzle,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const services = [
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

export const principles = [
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

export const stages = [
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

export const faqs = [
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

export const typeDetails: Record<string, { title: string; points: string[] }> =
  {
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
