"use client";

import { CircleAlert } from "lucide-react";

type DashboardNoticeProps = {
  error: string;
};

export default function DashboardNotice({ error }: DashboardNoticeProps) {
  if (!error) return null;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--warning)] bg-[var(--warning-soft)] p-4">
      <CircleAlert
        size={18}
        className="mt-0.5 shrink-0 text-[var(--warning)]"
      />
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)]">
          Dashboard notice
        </p>
        <p className="mt-1 break-words text-sm text-[var(--text-secondary)]">
          {error}
        </p>
      </div>
    </div>
  );
}
