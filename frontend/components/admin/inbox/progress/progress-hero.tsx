"use client";

import { Clock3, Minus, Plus, Target } from "lucide-react";
import type { Project } from "@/lib/inbox/progress-types";

type ProgressHeroProps = {
  project: Project;
  onProgressChange: (amount: number) => void;
};

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

function getProgressClass(progress: number) {
  if (progress >= 100) {
    return "bg-emerald-500";
  }

  if (progress >= 70) {
    return "bg-violet-500";
  }

  if (progress >= 40) {
    return "bg-blue-500";
  }

  return "bg-[var(--accent)]";
}

export default function ProgressHero({
  project,
  onProgressChange,
}: ProgressHeroProps) {
  const progress = Math.max(0, Math.min(100, project.progress));

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_5px_22px_rgba(0,0,0,0.035)]">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
            Project progress
          </div>

          <h2 className="mt-1.5 text-[23px] font-bold leading-[1.05] tracking-[-0.05em]">
            {project.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-[8px] text-[var(--text-muted)]">
            <Clock3 size={10} />

            {project.deadline
              ? `Deadline ${formatDeadline(project.deadline)}`
              : "No deadline set"}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <div className="text-[34px] font-black leading-none tracking-[-0.07em]">
            {progress}%
          </div>

          <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Complete
          </span>
        </div>
      </div>

      <div className="mt-7">
        <div className="relative h-3 overflow-hidden rounded-full bg-[var(--surface-hover)]">
          <div
            className={`relative h-full rounded-full transition-all duration-700 ease-out ${getProgressClass(
              progress,
            )}`}
            style={{
              width: `${progress}%`,
            }}
          >
            <div className="absolute inset-y-0 right-0 w-8 bg-[var(--surface)]/25 blur-md" />
          </div>
        </div>

        <div className="mt-2 flex justify-between text-[7px] font-bold text-[var(--text-muted)]">
          <span>
            {project.startDate
              ? `Started ${new Date(project.startDate).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}`
              : "Not started"}
          </span>

          <span>
            {project.deadline ? "Target completion" : "No target date"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-2">
        <div className="flex items-center gap-2 px-2">
          <Target size={12} className="text-[var(--text-muted)]" />

          <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
            Adjust progress
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onProgressChange(-5)}
            disabled={progress <= 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-tertiary)] transition-all hover:-translate-y-0.5 hover:text-[var(--text-primary)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.07)] disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0"
          >
            <Minus size={12} />
          </button>

          <button
            type="button"
            onClick={() => onProgressChange(5)}
            disabled={progress >= 100}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-contrast)] transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_13px_rgba(0,0,0,0.14)] disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
