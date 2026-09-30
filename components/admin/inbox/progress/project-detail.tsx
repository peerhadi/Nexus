"use client";

import type { Project } from "@/lib/inbox/progress-types";
import ProgressHero from "./progress-hero";
import ProjectHeader from "./project-header";
import ProjectInfo from "./project-info";
import ProjectTasks from "./project-tasks";
import ProjectUpdates from "./project-updates";

type ProjectDetailProps = {
  project: Project;
  newUpdate: string;
  onProgressChange: (amount: number) => void;
  onToggleTodo: (todoId: number) => void;
  onUpdateChange: (value: string) => void;
  onAddUpdate: () => void;
};

export default function ProjectDetail({
  project,
  newUpdate,
  onProgressChange,
  onToggleTodo,
  onUpdateChange,
  onAddUpdate,
}: ProjectDetailProps) {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#f7f7f5]">
      <ProjectHeader project={project} />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="w-full px-5 py-6 sm:px-8">
          <ProgressHero project={project} onProgressChange={onProgressChange} />

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_.95fr]">
            <ProjectTasks project={project} onToggle={onToggleTodo} />

            <ProjectUpdates
              project={project}
              newUpdate={newUpdate}
              onUpdateChange={onUpdateChange}
              onAddUpdate={onAddUpdate}
            />
          </div>

          <ProjectInfo project={project} />

          <div className="h-8" />
        </div>
      </div>
    </section>
  );
}
