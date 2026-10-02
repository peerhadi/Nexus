"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Activity, Check, Flag, Sparkles, Target } from "lucide-react";
import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";
import Summary from "@/components/admin/inbox/progress/summary";
import ProjectList from "@/components/admin/inbox/progress/project-list";
import ProjectDetail from "@/components/admin/inbox/progress/project-detail";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

const statusOptions: ProjectFilter[] = [
  "All",
  "PLANNING",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
  "PAUSED",
];

function getStatusLabel(status: ProjectFilter) {
  switch (status) {
    case "PLANNING":
      return "Planning";
    case "IN_PROGRESS":
      return "In progress";
    case "REVIEW":
      return "Review";
    case "COMPLETED":
      return "Completed";
    case "PAUSED":
      return "Paused";
    default:
      return "All";
  }
}

export default function ProgressPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    activeProjects: 0,
    requests: 0,
    averageProgress: 0,
  });

  const token =
    typeof window !== "undefined"
      ? (localStorage.getItem("nexus_token") ??
        sessionStorage.getItem("nexus_token"))
      : null;

  async function fetchProjects() {
    if (!token) {
      setError("Authentication required.");
      setLoading(false);
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load projects.");
      }

      const data = await response.json();

      const nextProjects: Project[] = Array.isArray(data)
        ? data
        : (data.projects ?? []);

      setProjects(nextProjects);

      setSelectedId((current) => {
        if (current && nextProjects.some((project) => project.id === current)) {
          return current;
        }

        return nextProjects[0]?.id ?? "";
      });
    } catch (requestError) {
      console.error(requestError);
      setError("Failed to load projects.");
    }
  }

  async function fetchStats() {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();

      setStats(data.stats ?? data);
    } catch (requestError) {
      console.error("Failed to load project stats:", requestError);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!token) {
        setError("Authentication required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [projectsResponse, statsResponse] = await Promise.all([
          fetch(`${API_URL}/projects`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API_URL}/stats`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!projectsResponse.ok) {
          throw new Error("Failed to load projects.");
        }

        const projectsData = await projectsResponse.json();

        const nextProjects: Project[] = Array.isArray(projectsData)
          ? projectsData
          : (projectsData.projects ?? []);

        if (cancelled) return;

        setProjects(nextProjects);

        setSelectedId((current) => {
          if (
            current &&
            nextProjects.some((project) => project.id === current)
          ) {
            return current;
          }

          return nextProjects[0]?.id ?? "";
        });

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();

          if (!cancelled) {
            setStats(statsData.stats ?? statsData);
          }
        }
      } catch (requestError) {
        console.error(requestError);

        if (!cancelled) {
          setError("Failed to load projects.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const selectedProject = projects.find((project) => project.id === selectedId);

  const visibleProjects = useMemo(() => {
    if (filter === "All") {
      return projects;
    }

    return projects.filter((project) => project.status === filter);
  }, [projects, filter]);

  function selectProject(project: Project) {
    setSelectedId(project.id);
  }

  async function updateProject(
    projectId: string,
    changes: {
      progress?: number;
      status?: Project["status"];
      deadline?: string | null;
      completedAt?: string | null;
    },
  ) {
    if (!token) {
      throw new Error("Authentication required.");
    }

    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });

    if (!response.ok) {
      throw new Error("Failed to update project.");
    }

    const data = await response.json();

    const updatedProject = data.project ?? data;

    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              ...updatedProject,
            }
          : project,
      ),
    );

    return updatedProject as Project;
  }

  async function updateProgress(amount: number) {
    if (!selectedProject) return;

    const nextProgress = Math.max(
      0,
      Math.min(100, selectedProject.progress + amount),
    );

    const nextStatus =
      nextProgress === 100
        ? "COMPLETED"
        : selectedProject.status === "COMPLETED"
          ? "IN_PROGRESS"
          : selectedProject.status;

    try {
      await updateProject(selectedProject.id, {
        progress: nextProgress,
        status: nextStatus,
        completedAt: nextProgress === 100 ? new Date().toISOString() : null,
      });

      await fetchStats();
    } catch (requestError) {
      console.error(requestError);
      setError("Failed to update project progress.");
    }
  }

  async function updateStatus(status: Project["status"]) {
    if (!selectedProject) return;

    try {
      await updateProject(selectedProject.id, {
        status,
        completedAt: status === "COMPLETED" ? new Date().toISOString() : null,
      });

      await fetchStats();
    } catch (requestError) {
      console.error(requestError);
      setError("Failed to update project status.");
    }
  }

  async function updateDeadline(deadline: string | null) {
    if (!selectedProject) return;

    try {
      await updateProject(selectedProject.id, {
        deadline,
      });
    } catch (requestError) {
      console.error(requestError);
      setError("Failed to update project deadline.");
    }
  }

  async function addUpdate(
    title: string,
    description: string,
    type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED" = "PROGRESS",
  ) {
    if (!selectedProject || !token) {
      return;
    }

    const response = await fetch(
      `${API_URL}/projects/${selectedProject.id}/updates`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          type,
          progress: selectedProject.progress,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create project update.");
    }

    await fetchProjects();
  }

  return (
    <main className="flex h-dvh min-h-0 min-w-0 w-[calc(100vw_-_250px)] flex-col overflow-hidden bg-[#f7f7f5] text-[#111]">
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white px-5 sm:px-7"
        >
          <div>
            <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-black/25">
              Nexus
            </div>

            <h1 className="mt-1 text-[18px] font-bold tracking-[-0.04em]">
              Project progress
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="flex items-center gap-2"
          >
            <div className="hidden items-center gap-2 rounded-xl border border-black/[0.07] bg-[#f7f7f5] px-3 py-2 sm:flex">
              <Activity size={11} className="text-black/30" />

              <span className="text-[8px] font-bold text-black/40">
                {stats.activeProjects} active
              </span>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white">
              <Target size={12} />
            </div>
          </motion.div>
        </motion.header>

        <AnimatePresence initial={false}>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="shrink-0 overflow-hidden border-b border-red-500/10 bg-red-50 px-5 py-2 text-[8px] font-semibold text-red-500"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.24,
            delay: 0.04,
            ease: "easeOut",
          }}
          className="grid h-[68px] shrink-0 grid-cols-2 border-b border-black/[0.08] bg-white sm:grid-cols-4"
        >
          <Summary
            label="Active projects"
            value={String(stats.activeProjects)}
            icon={<Activity size={11} />}
          />

          <Summary
            label="Average progress"
            value={`${stats.averageProgress}%`}
            icon={<Target size={11} />}
          />

          <Summary
            label="Requests"
            value={String(stats.requests)}
            icon={<Flag size={11} />}
          />

          <Summary
            label="Completed"
            value={String(stats.completedProjects)}
            icon={<Check size={11} />}
          />
        </motion.div>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.25,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="min-h-0"
          >
            <ProjectList
              projects={visibleProjects}
              selectedId={selectedProject?.id ?? ""}
              filter={filter}
              onFilterChange={setFilter}
              onSelect={selectProject}
              statusOptions={statusOptions}
              getStatusLabel={getStatusLabel}
            />
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            {selectedProject ? (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                }}
                className="flex min-h-0 min-w-0 flex-1"
              >
                <ProjectDetail
                  project={selectedProject}
                  onProgressChange={updateProgress}
                  onStatusChange={updateStatus}
                  onDeadlineChange={updateDeadline}
                  onAddUpdate={addUpdate}
                />
              </motion.div>
            ) : (
              <motion.section
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-[#f7f7f5]"
              >
                <div className="text-center">
                  <div className="text-[11px] font-bold">
                    No project selected
                  </div>

                  <div className="mt-1 text-[9px] text-black/30">
                    Select a project to manage its progress.
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
