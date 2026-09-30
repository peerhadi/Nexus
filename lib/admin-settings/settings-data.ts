import {
  Bell,
  CircleHelp,
  Globe,
  Mail,
  Palette,
  Shield,
  SlidersHorizontal,
  UserRound,
  Users,
} from "lucide-react";

import type {
  QuickAccessItem,
  SectionItem,
  TimezoneOption,
  WorkspaceStat,
} from "./settings-types";

export const sections: SectionItem[] = [
  {
    id: "general",
    label: "General",
    description: "Admin profile and preferences",
    icon: UserRound,
  },
  {
    id: "workspace",
    label: "Workspace",
    description: "Nexus workspace configuration",
    icon: SlidersHorizontal,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Control admin alerts",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Interface and motion",
    icon: Palette,
  },
  {
    id: "security",
    label: "Security",
    description: "Access and protection",
    icon: Shield,
  },
];

export const quickAccessItems: QuickAccessItem[] = [
  {
    icon: Users,
    title: "Client management",
    description: "Manage active clients",
  },
  {
    icon: Mail,
    title: "Inbox",
    description: "Review conversations",
  },
  {
    icon: SlidersHorizontal,
    title: "Project progress",
    description: "Update active projects",
  },
  {
    icon: CircleHelp,
    title: "Help & support",
    description: "Nexus documentation",
  },
];

export const timezoneOptions: TimezoneOption[] = [
  {
    value: "Asia/Kolkata",
    label: "India — Kolkata",
  },
  {
    value: "Europe/London",
    label: "United Kingdom — London",
  },
  {
    value: "America/New_York",
    label: "United States — New York",
  },
  {
    value: "America/Los_Angeles",
    label: "United States — Los Angeles",
  },
];

export const workspaceStats: WorkspaceStat[] = [
  {
    label: "Projects",
    value: "12",
    description: "active",
  },
  {
    label: "Contacts",
    value: "28",
    description: "managed",
  },
  {
    label: "Automations",
    value: "7",
    description: "configured",
  },
];
