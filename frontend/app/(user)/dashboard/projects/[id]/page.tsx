"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectHero from "@/components/user/dashboard/projects/project-hero";
import ProjectMilestones from "@/components/user/dashboard/projects/project-milestones";
import ProjectSidebar from "@/components/user/dashboard/projects/project-sidebar";
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
  client: {
    id: string;
    name: string;
    email: string;
  };
  updates: {
    id: string;
    title: string;
    description: string;
    type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED";
    progress: number;
    createdAt: string;
    updatedAt: string;
    author: {
      id: string;
      name: string;
      role: "CLIENT" | "ADMIN";
    };
    comments: {
      id: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      author: {
        id: string;
        name: string;
        role: "CLIENT" | "ADMIN";
      };
    }[];
  }[];
  logs: {
    id: string;
    action: string;
    description: string | null;
    createdAt: string;
  }[];
};

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { id } = await params;

        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) {
          setNotFound(true);
          return;
        }

        const response = await fetch(`${API_URL}/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setNotFound(true);
          return;
        }

        const data = await response.json();

        setProject(data.project ?? data);
      } catch (error) {
        console.error("Failed to load project:", error);

        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    void loadProject();
  }, [params]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-[11px] font-black text-black/30">
          Loading project...
        </div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-9">
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="text-lg font-black text-black/70">
            Project not found
          </div>

          <p className="mt-2 text-[11px] font-medium text-black/35">
            This project doesn't exist or you don't have access to it.
          </p>

          <Link
            href="/dashboard/projects"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-[10px] font-black text-white"
          >
            <ArrowLeft size={13} />
            All projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-9">
      <div className="space-y-7">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 text-[10px] font-black text-black/40 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          All projects
        </Link>

        <ProjectHero project={project} />

        <div className="grid gap-7 xl:grid-cols-[1.5fr_1fr]">
          <ProjectMilestones updates={project.updates} />

          <ProjectSidebar project={project} />
        </div>
      </div>
    </main>
  );
}
