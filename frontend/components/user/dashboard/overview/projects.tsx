"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import OverviewProjectCard from "./project-card";
import { API_URL } from "@/lib/api";

type BackendProject = {
  id: string;
  name: string;
  description?: string | null;
  status: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
  progress: number;
  startDate?: string | null;
  deadline?: string | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  updates?: {
    id: string;
    title: string;
    description: string;
    type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED";
    progress: number;
    createdAt: string;
    updatedAt: string;
  }[];
};

type Project = {
  id: string;
  name: string;
  type: string;
  progress: number;
  status: string;
  color: string;
  soft: string;
  milestone: string;
  due: string;
};

const gradients = [
  {
    color: "var(--gradient-violet-pink)",
    soft: "var(--gradient-soft)",
  },
  {
    color: "var(--gradient-cyan-violet)",
    soft: "var(--gradient-soft)",
  },
  {
    color: "var(--gradient-emerald-cyan)",
    soft: "var(--gradient-soft)",
  },
  {
    color: "var(--gradient-orange-pink)",
    soft: "var(--gradient-soft)",
  },
  {
    color: "var(--gradient-rainbow)",
    soft: "var(--gradient-soft)",
  },
  {
    color: "var(--gradient-violet-pink)",
    soft: "var(--gradient-soft)",
  },
];

function getProjectType(project: BackendProject) {
  switch (project.status) {
    case "PLANNING":
      return "Planning";

    case "IN_PROGRESS":
      return "Development";

    case "REVIEW":
      return "Review";

    case "COMPLETED":
      return "Completed";

    case "PAUSED":
      return "Paused";

    default:
      return "Project";
  }
}

function getMilestone(project: BackendProject) {
  const updates = project.updates ?? [];

  const current = updates
    .filter((update) => update.progress < 100 && update.type !== "COMPLETED")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];

  if (current) {
    return current.title;
  }

  if (project.status === "COMPLETED") {
    return "Project completed";
  }

  return "No milestone yet";
}

function formatDeadline(deadline: string | null | undefined) {
  if (!deadline) {
    return "No deadline";
  }

  return new Date(deadline).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

function mapProject(project: BackendProject, index: number): Project {
  const gradient = gradients[index % gradients.length];

  return {
    id: project.id,
    name: project.name,
    type: getProjectType(project),
    progress: project.progress,
    status: project.status.replaceAll("_", " "),
    color: gradient.color,
    soft: gradient.soft,
    milestone: getMilestone(project),
    due: formatDeadline(project.deadline),
  };
}

export default function OverviewProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) return;

        const response = await fetch(`${API_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();

        const backendProjects: BackendProject[] = Array.isArray(data)
          ? data
          : (data.projects ?? []);

        setProjects(backendProjects.map(mapProject));
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadProjects();
  }, []);

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Workspace
          </div>

          <h2 className="mt-1 text-xl font-black tracking-tight text-[var(--text-primary)]">
            Your projects
          </h2>
        </div>

        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1 text-[10px] font-black text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
        >
          See all
          <ChevronRight size={13} />
        </Link>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 text-center text-[11px] font-semibold text-[var(--text-muted)]">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 text-center text-[11px] font-semibold text-[var(--text-muted)]">
            No projects yet.
          </div>
        ) : (
          <div className="max-h-[400px] overflow-auto flex flex-col gap-3">
            {projects.map((project, index) => (
              <OverviewProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
