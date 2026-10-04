"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Check, Flag, Menu, Target, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Summary from "@/components/admin/inbox/progress/summary";
import ProjectList from "@/components/admin/inbox/progress/project-list";
import ProjectDetail from "@/components/admin/inbox/progress/project-detail";
import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";
import { API_URL } from "@/lib/api";

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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
    } finally {
      setLoading(false);
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

  useEffect(() => {
    if (!mobileDrawerOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const selectedProject = projects.find((project) => project.id === selectedId);

  const visibleProjects = useMemo(() => {
    if (filter === "All") {
      return projects;
    }

    return projects.filter((project) => project.status === filter);
  }, [projects, filter]);

  function selectProject(project: Project) {
    setSelectedId(project.id);
    setMobileDrawerOpen(false);
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
    <main className="flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-[#f7f7f5] text-[#111]">
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white px-4 sm:px-7"
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
              className="shrink-0 overflow-hidden border-b border-red-500/10 bg-red-50 px-4 py-2 text-[8px] font-semibold text-red-500 sm:px-5"
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
          className="grid h-auto shrink-0 grid-cols-2 border-b border-black/[0.08] bg-white sm:h-[68px] sm:grid-cols-4 py-2 gap-2"
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

        <div className="relative flex min-h-0 min-w-0 flex-1 overflow-hidden">
          {/* Desktop project list */}
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
              projects={visibleProjects}
              selectedId={selectedProject?.id ?? ""}
              filter={filter}
              onFilterChange={setFilter}
              onSelect={selectProject}
              statusOptions={statusOptions}
              getStatusLabel={getStatusLabel}
            />
          </motion.aside>

          {/* Mobile drawer */}
          <AnimatePresence>
            {mobileDrawerOpen && (
              <>
                <motion.button
                  type="button"
                  aria-label="Close project menu"
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setMobileDrawerOpen(false)}
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
                  className="fixed inset-y-0 left-0 z-50 flex w-[min(90vw,400px)] min-w-0 flex-col border-r border-black/[0.08] bg-white shadow-2xl lg:hidden"
                >
                  <div className="flex h-[58px] shrink-0 items-center justify-between border-b border-black/[0.08] px-4">
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-black/25">
                        Nexus
                      </div>

                      <div className="mt-0.5 text-[13px] font-bold tracking-[-0.03em]">
                        Projects
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Close project menu"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.08] bg-[#f7f7f5] text-black/50 transition hover:bg-black hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="min-h-0 flex-1 overflow-hidden">
                    <ProjectList
                      projects={visibleProjects}
                      selectedId={selectedProject?.id ?? ""}
                      filter={filter}
                      onFilterChange={setFilter}
                      onSelect={selectProject}
                      statusOptions={statusOptions}
                      getStatusLabel={getStatusLabel}
                    />
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

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
                className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto"
              >
                {/* Mobile detail toolbar */}
                <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-black/[0.07] bg-white px-4 lg:hidden">
                  <button
                    type="button"
                    aria-label="Open project menu"
                    onClick={() => setMobileDrawerOpen(true)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-[#f7f7f5] text-black/50 transition hover:bg-black hover:text-white"
                  >
                    <Menu size={15} />
                  </button>

                  <div className="min-w-0">
                    <div className="truncate text-[11px] font-bold">
                      {selectedProject.name}
                    </div>

                    <div className="mt-0.5 truncate text-[8px] text-black/35">
                      {getStatusLabel(selectedProject.status)}
                    </div>
                  </div>
                </div>

                <div className="min-h-0 flex-1">
                  <ProjectDetail
                    project={selectedProject}
                    onProgressChange={updateProgress}
                    onStatusChange={updateStatus}
                    onDeadlineChange={updateDeadline}
                    onAddUpdate={addUpdate}
                  />
                </div>
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
                <div className="px-6 text-center">
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
