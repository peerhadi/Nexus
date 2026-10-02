"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import OverviewProjectCard from "./project-card";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

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
    color: "from-violet-400 via-fuchsia-400 to-pink-400",
    soft: "from-violet-100 via-fuchsia-50 to-pink-50",
  },
  {
    color: "from-cyan-400 via-blue-400 to-violet-400",
    soft: "from-cyan-100 via-blue-50 to-violet-50",
  },
  {
    color: "from-emerald-400 via-cyan-400 to-blue-400",
    soft: "from-emerald-100 via-cyan-50 to-blue-50",
  },
  {
    color: "from-orange-400 via-pink-400 to-fuchsia-400",
    soft: "from-orange-100 via-pink-50 to-fuchsia-50",
  },
  {
    color: "from-yellow-400 via-orange-400 to-pink-400",
    soft: "from-yellow-100 via-orange-50 to-pink-50",
  },
  {
    color: "from-indigo-400 via-violet-400 to-fuchsia-400",
    soft: "from-indigo-100 via-violet-50 to-fuchsia-50",
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
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Workspace
          </div>

          <h2 className="mt-1 text-xl font-black tracking-tight text-slate-800">
            Your projects
          </h2>
        </div>

        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1 text-[10px] font-black text-violet-500 transition hover:text-fuchsia-500"
        >
          See all
          <ChevronRight size={13} />
        </Link>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="rounded-[22px] border border-black/[0.05] bg-white p-6 text-center text-[11px] font-semibold text-slate-400">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-[22px] border border-black/[0.05] bg-white p-6 text-center text-[11px] font-semibold text-slate-400">
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
