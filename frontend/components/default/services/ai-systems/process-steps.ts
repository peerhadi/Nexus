import { Braces, Fingerprint, Layers3, Network } from "lucide-react";

import type { ProcessStep } from "@/components/default/services/ai-systems/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Define the job",
    text: "Identify the user, the problem, the expected outcome, and where AI actually adds value.",
    icon: Fingerprint,
    detail: "DISCOVERY",
  },
  {
    number: "02",
    title: "Design the system",
    text: "Map data, model behavior, integrations, failure paths, and the boundaries of what it can do.",
    icon: Network,
    detail: "ARCHITECTURE",
  },
  {
    number: "03",
    title: "Build and test",
    text: "Connect the components, test real scenarios, and improve the experience against clear criteria.",
    icon: Braces,
    detail: "ENGINEERING",
  },
  {
    number: "04",
    title: "Integrate and refine",
    text: "Bring the system into the product, measure its behavior, and plan for continued improvement.",
    icon: Layers3,
    detail: "DELIVERY",
  },
];
