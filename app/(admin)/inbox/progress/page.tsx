"use client";

import { useMemo, useState } from "react";
import { Activity, Check, Flag, Sparkles, Target } from "lucide-react";
import { initialProjects } from "@/lib/inbox/progress-data";
import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";
import {
  filterProjects,
  getAverageProgress,
  getProjectCount,
} from "@/lib/inbox/progress-utils";
import Summary from "@/components/admin/inbox/progress/summary";
import ProjectList from "@/components/admin/inbox/progress/project-list";
import ProjectDetail from "@/components/admin/inbox/progress/project-detail";

export default function ProgressPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedId, setSelectedId] = useState(initialProjects[0].id);
  const [newUpdate, setNewUpdate] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const selectedProject =
    projects.find((project) => project.id === selectedId) ?? projects[0];

  const visibleProjects = useMemo(
    () => filterProjects(projects, filter),
    [projects, filter],
  );

  function updateProgress(amount: number) {
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== selectedProject.id) return project;

        const next = Math.max(0, Math.min(100, project.progress + amount));

        return {
          ...project,
          progress: next,
          status:
            next === 100
              ? "Completed"
              : project.status === "Completed"
                ? "On track"
                : project.status,
        };
      }),
    );
  }

  function toggleTodo(todoId: number) {
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== selectedProject.id) return project;

        return {
          ...project,
          todos: project.todos.map((todo) =>
            todo.id === todoId ? { ...todo, done: !todo.done } : todo,
          ),
        };
      }),
    );
  }

  function addUpdate() {
    const text = newUpdate.trim();

    if (!text) return;

    setProjects((current) =>
      current.map((project) => {
        if (project.id !== selectedProject.id) return project;

        return {
          ...project,
          updates: [
            {
              id: Date.now(),
              text,
              date: "Just now",
            },
            ...project.updates,
          ],
        };
      }),
    );

    setNewUpdate("");
  }

  function selectProject(project: Project) {
    setSelectedId(project.id);
  }

  return (
    <main className="flex h-dvh w-full min-w-0 overflow-hidden bg-[#f7f7f5] text-[#111]">
      <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white px-5 sm:px-7">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-black" />

              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-black/30">
                Admin / Projects
              </span>
            </div>

            <h1 className="mt-1 text-[21px] font-bold tracking-[-0.045em]">
              Progress
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-black/[0.08] bg-[#f7f7f5] px-3 py-2 sm:flex">
              <Activity size={11} className="text-black/35" />

              <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-black/40">
                Live project tracking
              </span>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
              <Sparkles size={13} />
            </div>
          </div>
        </header>

        <div className="grid h-[68px] shrink-0 grid-cols-4 border-b border-black/[0.08] bg-white">
          <Summary
            label="Active projects"
            value={String(projects.length)}
            icon={<Target size={11} />}
          />

          <Summary
            label="Average progress"
            value={`${getAverageProgress(projects)}%`}
            icon={<Activity size={11} />}
          />

          <Summary
            label="Needs attention"
            value={String(getProjectCount(projects, "Needs attention"))}
            icon={<Flag size={11} />}
          />

          <Summary
            label="Completed"
            value={String(getProjectCount(projects, "Completed"))}
            icon={<Check size={11} />}
          />
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <ProjectList
            projects={visibleProjects}
            selectedId={selectedProject.id}
            filter={filter}
            onFilterChange={setFilter}
            onSelect={selectProject}
          />

          <ProjectDetail
            project={selectedProject}
            newUpdate={newUpdate}
            onProgressChange={updateProgress}
            onToggleTodo={toggleTodo}
            onUpdateChange={setNewUpdate}
            onAddUpdate={addUpdate}
          />
        </div>
      </div>
    </main>
  );
}
