"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";
import ProjectList from "./project-list";

type ProgressMobileDrawerProps = {
  open: boolean;
  projects: Project[];
  selectedId: string;
  filter: ProjectFilter;
  statusOptions: ProjectFilter[];
  getStatusLabel: (status: ProjectFilter) => string;
  onFilterChange: (filter: ProjectFilter) => void;
  onSelect: (project: Project) => void;
  onClose: () => void;
};

export default function ProgressMobileDrawer({
  open,
  projects,
  selectedId,
  filter,
  statusOptions,
  getStatusLabel,
  onFilterChange,
  onSelect,
  onClose,
}: ProgressMobileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close project menu"
            className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 32,
              mass: 0.8,
            }}
            className="fixed inset-y-0 left-0 z-50 flex w-[min(90vw,400px)] min-w-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
          >
            <div className="flex h-[58px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Nexus
                </div>

                <div className="mt-0.5 text-[13px] font-bold tracking-[-0.03em]">
                  Projects
                </div>
              </div>

              <button
                type="button"
                aria-label="Close project menu"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden">
              <ProjectList
                projects={projects}
                selectedId={selectedId}
                filter={filter}
                onFilterChange={onFilterChange}
                onSelect={onSelect}
                statusOptions={statusOptions}
                getStatusLabel={getStatusLabel}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
