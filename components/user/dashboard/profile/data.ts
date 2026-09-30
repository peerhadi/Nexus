import { Bell, Mail, User } from "lucide-react";

export const settings = [
  {
    icon: User,
    title: "Personal information",
    text: "Name, email and account details",
    gradient: "from-violet-400 to-fuchsia-400",
    background: "from-violet-50 to-fuchsia-50",
    iconColor: "text-violet-500",
  },
  {
    icon: Mail,
    title: "Communication preferences",
    text: "How Nexus contacts you about projects",
    gradient: "from-cyan-400 to-blue-400",
    background: "from-cyan-50 to-blue-50",
    iconColor: "text-cyan-500",
  },
  {
    icon: Bell,
    title: "Notifications",
    text: "Project updates and message alerts",
    gradient: "from-pink-400 to-orange-400",
    background: "from-pink-50 to-orange-50",
    iconColor: "text-pink-500",
  },
];
