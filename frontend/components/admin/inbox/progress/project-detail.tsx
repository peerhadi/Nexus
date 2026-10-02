"use client";

import type { Project } from "@/lib/inbox/progress-types";
import ProgressHero from "./progress-hero";
import ProjectHeader from "./project-header";
import ProjectInfo from "./project-info";
import ProjectUpdates from "./project-updates";

type ProjectDetailProps = {
  project: Project;
  onProgressChange: (amount: number) => void;
  onStatusChange: (status: Project["status"]) => void;
  onDeadlineChange: (deadline: string | null) => void;
  onAddUpdate: (
    title: string,
    description: string,
    type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED",
  ) => Promise<void>;
};

export default function ProjectDetail({
  project,
  onProgressChange,
  onStatusChange,
  onDeadlineChange,
  onAddUpdate,
}: ProjectDetailProps) {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#f7f7f5]">
      <ProjectHeader
        project={project}
        onStatusChange={onStatusChange}
        onDeadlineChange={onDeadlineChange}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="w-full px-5 py-6 sm:px-8">
          <ProgressHero project={project} onProgressChange={onProgressChange} />

          <div className="mt-5 gap-5">
            <ProjectUpdates project={project} onAddUpdate={onAddUpdate} />
          </div>

          <ProjectInfo project={project} />

          <div className="h-8" />
        </div>
      </div>
    </section>
  );
}
