"use client";

import { useEffect, useMemo, useState } from "react";

import type { Project, ProjectFilter } from "@/lib/inbox/progress-types";
import { API_URL } from "@/lib/api";

export function useProgressData() {
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

  return {
    error,
    filter,
    loading,
    mobileDrawerOpen,
    selectedProject,
    setError,
    setFilter,
    setMobileDrawerOpen,
    setProjects,
    stats,
    token,
    visibleProjects,
    fetchProjects,
    fetchStats,
    selectProject,
  };
}
