"use client";

import type { Dispatch, SetStateAction } from "react";

import type { Project } from "@/lib/inbox/progress-types";
import { API_URL } from "@/lib/api";

type UseProgressActionsArgs = {
  token: string | null;
  selectedProject: Project | undefined;
  setProjects: Dispatch<SetStateAction<Project[]>>;
  setError: Dispatch<SetStateAction<string>>;
  fetchProjects: () => Promise<void>;
  fetchStats: () => Promise<void>;
};

export function useProgressActions({
  token,
  selectedProject,
  setProjects,
  setError,
  fetchProjects,
  fetchStats,
}: UseProgressActionsArgs) {
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

  return {
    addUpdate,
    updateDeadline,
    updateProgress,
    updateStatus,
  };
}
