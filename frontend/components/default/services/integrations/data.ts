import {
  Braces,
  Code2,
  Database,
  Globe,
  GitBranch,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const integrations = [
  {
    id: "website",
    name: "Your website",
    category: "Source",
    symbol: "N",
    color: "#7c8cff",
  },
  {
    id: "database",
    name: "Database",
    category: "Storage",
    symbol: "DB",
    color: "#43c9b6",
  },
  {
    id: "email",
    name: "Email",
    category: "Communication",
    symbol: "@",
    color: "#f4a76b",
  },
  {
    id: "chat",
    name: "Team chat",
    category: "Communication",
    symbol: "#",
    color: "#d78af4",
  },
  {
    id: "payments",
    name: "Payments",
    category: "Commerce",
    symbol: "$",
    color: "#76d69b",
  },
  {
    id: "api",
    name: "External API",
    category: "Data",
    symbol: "{ }",
    color: "#75baff",
  },
];

export const capabilities = [
  {
    icon: Workflow,
    number: "01",
    title: "Workflow orchestration",
    description:
      "Connect events, conditions, and actions into dependable workflows that move information without repetitive manual work.",
    tags: ["Event triggers", "Conditional logic", "Multi-step flows"],
  },
  {
    icon: Braces,
    number: "02",
    title: "API development",
    description:
      "Build the endpoints, request handling, and data transformations your systems need to communicate reliably.",
    tags: ["REST APIs", "Webhooks", "Data mapping"],
  },
  {
    icon: Database,
    number: "03",
    title: "Data synchronisation",
    description:
      "Keep the right information consistent across services, with thoughtful handling of updates, failures, and duplicates.",
    tags: ["Sync rules", "Validation", "Error recovery"],
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Secure connections",
    description:
      "Design integrations around scoped credentials, server-side secrets, validation, and clear access boundaries.",
    tags: ["Credential safety", "Access control", "Monitoring"],
  },
];

export const process = [
  {
    step: "01",
    title: "Map the ecosystem",
    text: "We identify the systems involved, where information originates, what must be shared, and which rules govern the flow.",
    icon: Globe,
  },
  {
    step: "02",
    title: "Design the connection",
    text: "We choose the right APIs, webhooks, data formats, triggers, and failure-handling strategy before building.",
    icon: GitBranch,
  },
  {
    step: "03",
    title: "Build and verify",
    text: "We implement the integration and test normal requests, missing data, duplicate events, authentication, and failures.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Deploy and monitor",
    text: "We prepare the connection for production, document its behaviour, and establish useful visibility into errors.",
    icon: RefreshCw,
  },
];

export const faqs = [
  {
    q: "Can you connect software that does not have a native integration?",
    a: "Often, yes. If a service exposes an API, webhook, or another supported data interface, we can assess a custom connection. The exact approach depends on the service's capabilities and access restrictions.",
  },
  {
    q: "What is the difference between an API and a webhook?",
    a: "An API generally lets one system request information or perform an action in another system. A webhook lets a service notify another system when an event occurs. Many integrations use both.",
  },
  {
    q: "Can you connect our existing website to a database or payment service?",
    a: "Yes. We can assess your existing architecture and connect suitable services while keeping credentials server-side and validating data at the appropriate boundaries.",
  },
  {
    q: "What happens if an integration fails?",
    a: "Failure handling can include timeouts, retries, validation, useful error logs, and duplicate-event protection. The right safeguards depend on the workflow and the consequences of a failed operation.",
  },
  {
    q: "Can you maintain an integration after launch?",
    a: "We can discuss monitoring, documentation, fixes, and future changes as part of the project's agreed scope.",
  },
];

export type NodeId = (typeof integrations)[number]["id"];

export const initialConnections: [NodeId, NodeId][] = [
  ["website", "api"],
  ["api", "database"],
  ["api", "email"],
];
