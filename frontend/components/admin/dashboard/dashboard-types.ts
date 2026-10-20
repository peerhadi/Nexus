import type { LucideIcon } from "lucide-react";

export type RecordItem = Record<string, unknown>;

export type DashboardData = {
  stats: RecordItem | null;
  requests: RecordItem[];
  projects: RecordItem[];
  conversations: RecordItem[];
};

export type ApiStatus = "checking" | "online" | "offline";

export type AdminSection = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type DashboardMetric = {
  title: string;
  value: number;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type ActivityItem = {
  item: RecordItem;
  type: string;
  href: string;
  icon: LucideIcon;
};
