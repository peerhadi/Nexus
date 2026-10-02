"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectCard from "@/components/user/dashboard/projects/project-card";
import { API_URL } from "@/lib/api";

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
  progress: number;
  startDate: string | null;
  deadline: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);

        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) {
          console.error("No Nexus authentication token found.");
          return;
        }

        const response = await fetch(`${API_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => null);

        console.log("GET /projects:", {
          status: response.status,
          data,
        });

        if (!response.ok) {
          throw new Error(
            data?.message ?? data?.error ?? "Failed to load projects.",
          );
        }

        const loadedProjects: Project[] = Array.isArray(data)
          ? data
          : (data?.projects ?? []);

        console.log("Projects returned:", loadedProjects);

        setProjects(loadedProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadProjects();
  }, []);

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-9">
      <div className="space-y-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
              Workspace
            </div>

            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em]">
              Projects
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-black/40">
              Everything Nexus is building for you, in one place.
            </p>
          </div>

          <Link
            href="/build"
            className="flex w-fit items-center gap-2 rounded-xl bg-black px-4 py-3 text-[11px] font-black text-white shadow-lg transition hover:-translate-y-1"
          >
            <Plus size={14} />
            New project
          </Link>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-black/5 bg-white text-[11px] font-bold text-black/30">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-black/5 bg-white text-center">
            <div>
              <div className="text-sm font-black text-black/70">
                No projects yet
              </div>

              <p className="mt-2 text-[11px] font-medium text-black/35">
                Your Nexus projects will appear here once they are created.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
