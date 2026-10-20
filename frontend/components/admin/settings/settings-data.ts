import type { ThemeOption } from "./settings-types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export const themes: ThemeOption[] = [
  {
    id: "neon",
    name: "Neon",
    description: "Clean white surfaces with cyan accents.",
    accent: "#06b6d4",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "A cool cyan-to-green accent palette.",
    accent: "#14b8a6",
  },
  {
    id: "violet",
    name: "Violet",
    description: "A subtle violet accent palette.",
    accent: "#8b5cf6",
  },
  {
    id: "sunrise",
    name: "Sunrise",
    description: "Warm orange accents on light surfaces.",
    accent: "#f97316",
  },
];

export const workspaceShortcuts = [
  {
    label: "Admin dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Data Center",
    href: "/admin/data-center",
  },
  {
    label: "Inbox",
    href: "/admin/inbox",
  },
  {
    label: "Progress",
    href: "/admin/progress",
  },
];
