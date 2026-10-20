"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import type { Project } from "@/lib/inbox/progress-types";
import ProjectDetail from "./project-detail";

type ProgressDetailPanelProps = {
  project: Project;
  statusLabel: string;
  onProgressChange: (amount: number) => void;
  onStatusChange: (status: Project["status"]) => void;
  onDeadlineChange: (deadline: string | null) => void;
  onAddUpdate: (
    title: string,
    description: string,
    type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED",
  ) => Promise<void>;
  onOpenMenu: () => void;
};

export default function ProgressDetailPanel({
  project,
  statusLabel,
  onProgressChange,
  onStatusChange,
  onDeadlineChange,
  onAddUpdate,
  onOpenMenu,
}: ProgressDetailPanelProps) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto"
    >
      {/* Mobile detail toolbar */}
      <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:hidden">
        <button
          type="button"
          aria-label="Open project menu"
          onClick={onOpenMenu}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
        >
          <Menu size={15} />
        </button>

        <div className="min-w-0">
          <div className="truncate text-[11px] font-bold">{project.name}</div>

          <div className="mt-0.5 truncate text-[8px] text-[var(--text-muted)]">
            {statusLabel}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ProjectDetail
          project={project}
          onProgressChange={onProgressChange}
          onStatusChange={onStatusChange}
          onDeadlineChange={onDeadlineChange}
          onAddUpdate={onAddUpdate}
        />
      </div>
    </motion.div>
  );
}
