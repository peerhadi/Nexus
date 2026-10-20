import { engineProject } from "./engine";
import { notifierProject } from "./notifier";
import { obsidianProject } from "./obsidian";
import { prismProject } from "./prism";
import type { WorkProject } from "./types";

export const workProjects: WorkProject[] = [
  prismProject,
  obsidianProject,
  notifierProject,
  engineProject,
];
