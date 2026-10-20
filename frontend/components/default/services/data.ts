import {
  Bot,
  Code2,
  CreditCard,
  Globe2,
  Layers3,
  Puzzle,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

export const services = [
  {
    number: "01",
    title: "Websites",
    label: "YOUR PLACE ON THE INTERNET",
    description:
      "Build a strong first impression with a website that looks considered, communicates clearly, and gives visitors a reason to take the next step.",
    detail:
      "From a polished portfolio to a multi-page business website, every page should have a purpose.",
    href: "/services/websites",
    icon: Globe2,
    accent: "violet",
    deliverables: [
      "Business websites",
      "Landing pages",
      "Portfolios",
      "Responsive design",
    ],
    visual: "website",
  },
  {
    number: "02",
    title: "Web applications",
    label: "TURN IDEAS INTO SOFTWARE",
    description:
      "Go beyond a traditional website with software designed around the way people work, interact, and get things done.",
    detail:
      "Create useful digital products without forcing your idea into an off-the-shelf solution.",
    href: "/services/web-applications",
    icon: Code2,
    accent: "blue",
    deliverables: [
      "Custom dashboards",
      "Customer portals",
      "Admin panels",
      "SaaS products",
    ],
    visual: "application",
  },
  {
    number: "03",
    title: "Automation",
    label: "LET REPETITIVE WORK RUN ITSELF",
    description:
      "Reduce manual work by connecting repeatable tasks into workflows that run consistently, with less unnecessary effort.",
    detail:
      "Move information, trigger actions, send notifications, and simplify everyday operations.",
    href: "/services/automation",
    icon: Workflow,
    accent: "pink",
    deliverables: [
      "Email workflows",
      "Scheduled tasks",
      "Reports and alerts",
      "Data processing",
    ],
    visual: "automation",
  },
  {
    number: "04",
    title: "AI systems",
    label: "MAKE INTELLIGENCE USEFUL",
    description:
      "Add AI where it solves a real problem, from understanding documents to helping people find information faster.",
    detail:
      "Build practical AI features around your product, data, and the tasks you actually need to improve.",
    href: "/services/ai-systems",
    icon: Bot,
    accent: "orange",
    deliverables: [
      "AI assistants",
      "Document processing",
      "Information extraction",
      "Smart search",
    ],
    visual: "ai",
  },
  {
    number: "05",
    title: "Integrations",
    label: "MAKE YOUR TOOLS WORK TOGETHER",
    description:
      "Connect the applications and services you already use so information can move between them without unnecessary manual steps.",
    detail:
      "Bring APIs, databases, webhooks, and third-party services into one connected system.",
    href: "/services/integrations",
    icon: Puzzle,
    accent: "green",
    deliverables: [
      "API integrations",
      "Database connections",
      "Webhooks",
      "Data synchronization",
    ],
    visual: "integrations",
  },
];

export const process = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Explain the problem, the idea, or the task you want to improve. You don't need to arrive with a technical specification.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Agree on the scope",
    description:
      "We establish what will be built, what is included, the expected deliverables, and the project price before work begins.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Start with 30%",
    description:
      "Once the scope and price are agreed, a 30% advance starts the project.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Build and review",
    description:
      "Development follows the agreed scope, with progress shared and the completed work reviewed against the requirements.",
    icon: Code2,
  },
  {
    number: "05",
    title: "Pay the remaining 70%",
    description:
      "When the agreed work is complete, the remaining 70% is paid before final handoff or deployment.",
    icon: ShieldCheck,
  },
];

export const fitOptions = [
  {
    label: "I need an online presence",
    result: "Websites",
    description:
      "A business site, portfolio, landing page, or a clearer way to present your work.",
    href: "/services/websites",
    icon: Globe2,
  },
  {
    label: "I want to build a product",
    result: "Web applications",
    description:
      "A dashboard, portal, platform, or custom application people can actually use.",
    href: "/services/web-applications",
    icon: Code2,
  },
  {
    label: "I want to reduce manual work",
    result: "Automation",
    description:
      "Repeatable tasks, scheduled actions, notifications, and workflows that take care of themselves.",
    href: "/services/automation",
    icon: Workflow,
  },
  {
    label: "I want to use AI",
    result: "AI systems",
    description:
      "An assistant, smarter search, document understanding, or AI-powered features inside a product.",
    href: "/services/ai-systems",
    icon: Bot,
  },
  {
    label: "My tools need to connect",
    result: "Integrations",
    description:
      "APIs, databases, and external services that need to share information reliably.",
    href: "/services/integrations",
    icon: Puzzle,
  },
];
