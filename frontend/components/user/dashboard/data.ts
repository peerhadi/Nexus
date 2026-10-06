import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  CheckSquare,
  Files,
  FileText,
  FolderKanban,
  Image,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export const nav = [
  {
    label: "Overview",
    href: "/dashboard",
    description: "Your Nexus workspace at a glance",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    description: "Create and manage your projects",
    icon: FolderKanban,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    description: "Your conversations and messages",
    icon: MessageSquare,
  },
  {
    label: "Notes",
    href: "/dashboard/notes",
    description: "Ideas, thoughts and notes",
    icon: FileText,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    description: "Plans and Billing",
    icon: Sparkles,
  },
  {
    label: "Nexus AI",
    href: "/dashboard/ai",
    description: "Work with Nexus AI",
    icon: Sparkles,
  },
  {
    label: "Back",
    href: "/",
    description: "Go back to home page",
    icon: ArrowLeft,
  },
];
