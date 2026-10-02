"use client";

import { ChevronDown, Clock3 } from "lucide-react";
import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";

type ProjectListProps = {
  projects: Project[];
  selectedId: string;
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  onSelect: (project: Project) => void;
  statusOptions: ProjectFilter[];
  getStatusLabel: (status: Project["status"]) => string;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDeadline(deadline: string | null) {
  if (!deadline) {
    return "No deadline";
  }

  return new Date(deadline).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusClasses(status: Project["status"]) {
  switch (status) {
    case "COMPLETED":
      return "bg-emerald-50 text-emerald-600";

    case "IN_PROGRESS":
      return "bg-blue-50 text-blue-600";

    case "REVIEW":
      return "bg-violet-50 text-violet-600";

    case "PAUSED":
      return "bg-orange-50 text-orange-600";

    case "PLANNING":
    default:
      return "bg-black/[0.05] text-black/40";
  }
}

export default function ProjectList({
  projects,
  selectedId,
  filter,
  onFilterChange,
  onSelect,
  statusOptions,
  getStatusLabel,
}: ProjectListProps) {
  return (
    <aside className="flex min-h-0 w-[360px] shrink-0 flex-col border-r border-black/[0.08] bg-white">
      <div className="shrink-0 border-b border-black/[0.07] p-3">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-black/30">
            Projects
          </div>

          <div className="text-[8px] font-bold text-black/25">
            {projects.length}
          </div>
        </div>

        <div className="relative">
          <select
            value={filter}
            onChange={(event) =>
              onFilterChange(event.target.value as ProjectFilter)
            }
            className="h-9 w-full appearance-none rounded-xl border border-black/[0.08] bg-[#f7f7f5] px-3 text-[9px] font-bold outline-none transition-colors focus:bg-white"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "All" : getStatusLabel(option)}
              </option>
            ))}
          </select>

          <ChevronDown
            size={11}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/30"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="flex h-full items-center justify-center px-8 text-center">
            <div>
              <div className="text-[11px] font-bold">No projects</div>

              <div className="mt-1 text-[9px] text-black/35">
                No projects match this filter.
              </div>
            </div>
          </div>
        ) : (
          projects.map((project) => {
            const active = project.id === selectedId;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => onSelect(project)}
                className={`group relative w-full border-b border-black/[0.06] px-4 py-4 text-left transition-colors ${
                  active
                    ? "bg-[#f7f7f5] shadow-[inset_3px_0_0_#111]"
                    : "bg-white hover:bg-[#fafaf8]"
                }`}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-[10px] font-bold text-white">
                    {getInitials(project.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="truncate text-[10px] font-bold">
                        {project.name}
                      </span>

                      <span
                        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-bold ${getStatusClasses(
                          project.status,
                        )}`}
                      >
                        {getStatusLabel(project.status)}
                      </span>
                    </div>

                    <div className="mt-1 truncate text-[9px] font-medium text-black/40">
                      {project.client?.name ?? "Client"}
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-500"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, project.progress),
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[7px] font-bold uppercase tracking-[0.08em] text-black/25">
                        {project.progress}% complete
                      </span>

                      <span className="flex items-center gap-1 text-[7px] text-black/25">
                        <Clock3 size={9} />
                        {formatDeadline(project.deadline)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
