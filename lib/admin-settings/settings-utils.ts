import type { Section } from "./settings-types";

export function getSectionTitle(active: Section) {
  switch (active) {
    case "general":
      return "General settings";
    case "workspace":
      return "Workspace settings";
    case "notifications":
      return "Notifications";
    case "appearance":
      return "Appearance";
    case "security":
      return "Security";
  }
}
