import type { LucideIcon } from "lucide-react";

export type Section =
  "general" | "workspace" | "notifications" | "appearance" | "security";

export type SectionItem = {
  id: Section;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type QuickAccessItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type WorkspaceStat = {
  label: string;
  value: string;
  description: string;
};

export type TimezoneOption = {
  value: string;
  label: string;
};
