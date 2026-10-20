import { workProjects } from "./projects";
import type { WorkProject } from "./types";

export function getWorkProject(id: string): WorkProject | undefined {
  return workProjects.find((project) => project.id === id);
}

export function getNextWorkProject(id: string): WorkProject {
  const currentIndex = workProjects.findIndex((project) => project.id === id);
  const nextIndex =
    currentIndex < 0 ? 0 : (currentIndex + 1) % workProjects.length;
  return workProjects[nextIndex];
}
