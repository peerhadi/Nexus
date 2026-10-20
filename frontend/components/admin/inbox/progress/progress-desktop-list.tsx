"use client";

import { motion } from "framer-motion";

import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";
import ProjectList from "./project-list";

type ProgressDesktopListProps = {
  projects: Project[];
  selectedId: string;
  filter: ProjectFilter;
  statusOptions: ProjectFilter[];
  getStatusLabel: (status: ProjectFilter) => string;
  onFilterChange: (filter: ProjectFilter) => void;
  onSelect: (project: Project) => void;
};

export default function ProgressDesktopList({
  projects,
  selectedId,
  filter,
  statusOptions,
  getStatusLabel,
  onFilterChange,
  onSelect,
}: ProgressDesktopListProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.25,
        delay: 0.08,
        ease: "easeOut",
      }}
      className="hidden min-h-0 shrink-0 lg:flex"
    >
      <ProjectList
        projects={projects}
        selectedId={selectedId}
        filter={filter}
        onFilterChange={onFilterChange}
        onSelect={onSelect}
        statusOptions={statusOptions}
        getStatusLabel={getStatusLabel}
      />
    </motion.aside>
  );
}
