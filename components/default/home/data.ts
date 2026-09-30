import { Bot, Code2, Workflow } from "lucide-react";

export const services = [
  {
    number: "01",
    title: "Automations",
    description:
      "Take the repetitive stuff off your plate. Emails, reminders, reports, workflows — handled.",
    icon: Workflow,
    accent: "from-violet-300 via-fuchsia-200 to-transparent",
  },
  {
    number: "02",
    title: "Applications",
    description:
      "Have an idea that doesn't exist yet? We turn it into a real, polished application.",
    icon: Code2,
    accent: "from-blue-300 via-cyan-200 to-transparent",
  },
  {
    number: "03",
    title: "AI Systems",
    description:
      "Put intelligent systems where they actually help — inside the tools you already use.",
    icon: Bot,
    accent: "from-orange-200 via-yellow-200 to-transparent",
  },
];

export const steps = [
  "You tell us the annoying thing.",
  "We figure out how to remove it.",
  "We build the system.",
  "You stop thinking about it.",
];
