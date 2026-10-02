import { CheckCircle2, MessageCircle, Zap } from "lucide-react";

export const projects = [
  {
    id: "nexus-portal",
    name: "Nexus Portal",
    type: "Web application",
    progress: 68,
    status: "In development",
    color: "from-violet-400 via-fuchsia-400 to-pink-400",
    soft: "from-violet-50 via-fuchsia-50 to-pink-50",
    milestone: "Dashboard implementation",
    due: "Oct 8",
  },
  {
    id: "automation",
    name: "Lead Automation",
    type: "Automation",
    progress: 35,
    status: "Planning",
    color: "from-cyan-400 via-blue-400 to-violet-400",
    soft: "from-cyan-50 via-blue-50 to-violet-50",
    milestone: "Workflow architecture",
    due: "Oct 14",
  },
];

export const activity = [
  {
    icon: CheckCircle2,
    title: "Nexus Portal milestone completed",
    text: "Authentication flow has been approved.",
    time: "2 hours ago",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    icon: MessageCircle,
    title: "New message from Nexus",
    text: "We have a question about your dashboard.",
    time: "5 hours ago",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    icon: Zap,
    title: "Lead Automation started",
    text: "The project has entered planning.",
    time: "Yesterday",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-500",
  },
];

export const stats = [
  {
    label: "Active projects",
    value: "2",
    gradient: "from-pink-100 via-rose-50 to-orange-100",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    label: "In development",
    value: "1",
    gradient: "from-violet-100 via-fuchsia-50 to-pink-100",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-500",
  },
  {
    label: "Unread messages",
    value: "2",
    gradient: "from-cyan-100 via-sky-50 to-blue-100",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-500",
  },
  {
    label: "Next milestone",
    value: "Oct 8",
    gradient: "from-yellow-100 via-amber-50 to-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
];
