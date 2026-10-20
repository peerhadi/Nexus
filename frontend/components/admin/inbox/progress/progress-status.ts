import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";

export const statusOptions: ProjectFilter[] = [
  "All",
  "PLANNING",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
  "PAUSED",
];

export function getStatusLabel(status: ProjectFilter) {
  switch (status) {
    case "PLANNING":
      return "Planning";
    case "IN_PROGRESS":
      return "In progress";
    case "REVIEW":
      return "Review";
    case "COMPLETED":
      return "Completed";
    case "PAUSED":
      return "Paused";
    default:
      return "All";
  }
}

export function getProjectStatusLabel(status: Project["status"]) {
  return getStatusLabel(status);
}
