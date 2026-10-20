"use client";

import { CheckCircle2 } from "lucide-react";

import type { ApiStatus } from "./dashboard-types";

type DashboardFooterProps = {
  apiStatus: ApiStatus;
};

export default function DashboardFooter({ apiStatus }: DashboardFooterProps) {
  return (
    <footer className="flex flex-col justify-between gap-2 border-t border-[var(--border-subtle)] pt-5 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
      <p>Nexus Administration</p>
      <div className="flex items-center gap-2">
        <CheckCircle2 size={14} />
        <span>
          {apiStatus === "online"
            ? "Connected to the existing API"
            : apiStatus === "offline"
              ? "API connection needs attention"
              : "Checking API connection"}
        </span>
      </div>
    </footer>
  );
}
