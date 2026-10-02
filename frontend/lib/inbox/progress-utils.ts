import type { Project, ProjectFilter, ProjectStatus } from "./progress-types";

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function filterProjects(projects: Project[], filter: ProjectFilter) {
  if (filter === "All") return projects;

  return projects.filter((project) => project.status === filter);
}

export function getAverageProgress(projects: Project[]) {
  if (projects.length === 0) return 0;

  return Math.round(
    projects.reduce((sum, project) => sum + project.progress, 0) /
      projects.length,
  );
}

export function getProjectCount(projects: Project[], status: ProjectStatus) {
  return projects.filter((project) => project.status === status).length;
}
