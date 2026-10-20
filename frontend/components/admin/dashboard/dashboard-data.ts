import {
  Archive,
  ClipboardList,
  Database,
  FolderKanban,
  Inbox,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import type { AdminSection, DashboardData } from "./dashboard-types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const emptyData: DashboardData = {
  stats: null,
  requests: [],
  projects: [],
  conversations: [],
};

export const sections: AdminSection[] = [
  {
    title: "Inbox",
    description: "Client conversations and replies",
    href: "/admin/inbox",
    icon: Inbox,
  },
  {
    title: "Requests",
    description: "Review incoming client requests",
    href: "/admin/requests",
    icon: ClipboardList,
  },
  {
    title: "Clients",
    description: "Manage registered clients",
    href: "/admin/clients",
    icon: Users,
  },
  {
    title: "Progress",
    description: "Projects, milestones and updates",
    href: "/admin/progress",
    icon: FolderKanban,
  },
  {
    title: "Archive",
    description: "Previously closed conversations",
    href: "/admin/archive",
    icon: Archive,
  },
  {
    title: "Team",
    description: "Chat with the team",
    href: "/admin/team",
    icon: Users,
  },

  {
    title: "Admin AI",
    description: "Explore platform records",
    href: "/admin/ai",
    icon: Sparkles,
  },
  {
    title: "Data Center",
    description: "Explore platform records",
    href: "/admin/data-center",
    icon: Database,
  },
  {
    title: "Settings",
    description: "Administrative preferences",
    href: "/admin/settings",
    icon: Settings,
  },
];
