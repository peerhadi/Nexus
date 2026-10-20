"use client";

import { AnimatePresence } from "framer-motion";

import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";
import ProgressDesktopList from "./progress-desktop-list";
import ProgressDetailPanel from "./progress-detail-panel";
import ProgressEmptyDetail from "./progress-empty-detail";
import ProgressMobileDrawer from "./progress-mobile-drawer";
import { getStatusLabel } from "./progress-status";

type ProgressWorkspaceProps = {
  projects: Project[];
  selectedProject: Project | undefined;
  filter: ProjectFilter;
  statusOptions: ProjectFilter[];
  mobileDrawerOpen: boolean;
  onFilterChange: (filter: ProjectFilter) => void;
  onSelect: (project: Project) => void;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onProgressChange: (amount: number) => void;
  onStatusChange: (status: Project["status"]) => void;
  onDeadlineChange: (deadline: string | null) => void;
  onAddUpdate: (
    title: string,
    description: string,
    type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED",
  ) => Promise<void>;
};

export default function ProgressWorkspace({
  projects,
  selectedProject,
  filter,
  statusOptions,
  mobileDrawerOpen,
  onFilterChange,
  onSelect,
  onOpenMenu,
  onCloseMenu,
  onProgressChange,
  onStatusChange,
  onDeadlineChange,
  onAddUpdate,
}: ProgressWorkspaceProps) {
  const selectedStatusLabel = selectedProject
    ? getStatusLabel(selectedProject.status)
    : "";

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 overflow-hidden">
      <ProgressDesktopList
        projects={projects}
        selectedId={selectedProject?.id ?? ""}
        filter={filter}
        statusOptions={statusOptions}
        getStatusLabel={getStatusLabel}
        onFilterChange={onFilterChange}
        onSelect={onSelect}
      />

      <ProgressMobileDrawer
        open={mobileDrawerOpen}
        projects={projects}
        selectedId={selectedProject?.id ?? ""}
        filter={filter}
        statusOptions={statusOptions}
        getStatusLabel={getStatusLabel}
        onFilterChange={onFilterChange}
        onSelect={onSelect}
        onClose={onCloseMenu}
      />

      <AnimatePresence mode="wait" initial={false}>
        {selectedProject ? (
          <ProgressDetailPanel
            key={selectedProject.id}
            project={selectedProject}
            statusLabel={selectedStatusLabel}
            onProgressChange={onProgressChange}
            onStatusChange={onStatusChange}
            onDeadlineChange={onDeadlineChange}
            onAddUpdate={onAddUpdate}
            onOpenMenu={onOpenMenu}
          />
        ) : (
          <ProgressEmptyDetail />
        )}
      </AnimatePresence>
    </div>
  );
}
