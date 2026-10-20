"use client";

import { useProgressActions } from "./use-progress-actions";
import { useProgressData } from "./use-progress-data";

export function useProgressPage() {
  const data = useProgressData();

  const actions = useProgressActions({
    token: data.token,
    selectedProject: data.selectedProject,
    setProjects: data.setProjects,
    setError: data.setError,
    fetchProjects: data.fetchProjects,
    fetchStats: data.fetchStats,
  });

  return {
    ...data,
    ...actions,
  };
}
