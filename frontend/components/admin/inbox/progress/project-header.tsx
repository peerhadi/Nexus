"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import type { Project } from "@/lib/inbox/progress-types";

type ProjectHeaderProps = {
  project: Project;
  onStatusChange: (status: Project["status"]) => void;
  onDeadlineChange: (deadline: string | null) => void;
};

const statuses: Project["status"][] = [
  "PLANNING",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
  "PAUSED",
];

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStatusLabel(status: Project["status"]) {
  return status.replaceAll("_", " ");
}

export default function ProjectHeader({
  project,
  onStatusChange,
  onDeadlineChange,
}: ProjectHeaderProps) {
  const clientName = project.client?.name ?? "Client";
  const clientEmail = project.client?.email ?? "";

  return (
    <div className="flex min-h-[74px] shrink-0 items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-5 py-3 sm:px-7">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[10px] font-bold text-[var(--accent-contrast)]">
          {getInitials(clientName)}
        </div>

        <div className="min-w-0">
          <div className="truncate text-[12px] font-bold">{clientName}</div>

          <div className="mt-0.5 truncate text-[9px] text-[var(--text-muted)]">
            {clientEmail}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="relative hidden sm:block">
          <select
            value={project.status}
            onChange={(event) =>
              onStatusChange(event.target.value as Project["status"])
            }
            className="h-8 appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] px-3 pr-7 text-[8px] font-bold uppercase outline-none"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(status)}
              </option>
            ))}
          </select>

          <ChevronDown
            size={10}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
        </div>

        <label className="flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5">
          <CalendarDays size={10} className="text-[var(--text-muted)]" />

          <input
            type="date"
            value={project.deadline ? project.deadline.slice(0, 10) : ""}
            onChange={(event) =>
              onDeadlineChange(
                event.target.value
                  ? new Date(`${event.target.value}T00:00:00`).toISOString()
                  : null,
              )
            }
            className="w-[105px] bg-transparent text-[8px] font-bold outline-none"
          />
        </label>

        <span className="hidden rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1.5 text-[8px] font-bold text-[var(--text-muted)] lg:block">
          {project.id}
        </span>
      </div>
    </div>
  );
}
