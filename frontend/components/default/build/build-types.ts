import { Layers3, Sparkles, WandSparkles, Zap } from "lucide-react";

export const projectTypes = [
  {
    id: "automation",
    title: "Automation",
    description: "Make repetitive work disappear.",
    icon: Zap,
  },
  {
    id: "application",
    title: "Custom application",
    description: "Build something completely custom.",
    icon: Layers3,
  },
  {
    id: "workflow",
    title: "Workflow",
    description: "Connect tools, people, and processes.",
    icon: WandSparkles,
  },
  {
    id: "not-sure",
    title: "Not sure yet",
    description: "I have an idea. Let's figure it out.",
    icon: Sparkles,
  },
];

export const budgets = [
  "Under ₹5000",
  "₹5000 – ₹15,000",
  "₹15,000 – ₹50,000",
  "₹50,000+",
  "Not sure yet",
];
