"use client";

import { useCallback, useEffect, useState } from "react";

import { API_URL, emptyData } from "./dashboard-data";
import type { ApiStatus, DashboardData } from "./dashboard-types";
import { objectFrom, recordsFrom } from "./dashboard-utils";

export function useDashboard() {
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const token =
        localStorage.getItem("nexus_token") ??
        sessionStorage.getItem("nexus_token");

      const headers: HeadersInit = {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      async function get(path: string): Promise<unknown> {
        const response = await fetch(`${API_URL}${path}`, {
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`${path}: HTTP ${response.status}`);
        }

        return response.json();
      }

      const results = await Promise.allSettled([
        get("/stats"),
        get("/requests"),
        get("/projects"),
        get("/conversations"),
      ]);

      const [statsResult, requestsResult, projectsResult, conversationsResult] =
        results;

      const stats =
        statsResult.status === "fulfilled"
          ? objectFrom(statsResult.value)
          : null;

      const requests =
        requestsResult.status === "fulfilled"
          ? recordsFrom(requestsResult.value)
          : [];

      const projects =
        projectsResult.status === "fulfilled"
          ? recordsFrom(projectsResult.value)
          : [];

      const conversations =
        conversationsResult.status === "fulfilled"
          ? recordsFrom(conversationsResult.value)
          : [];

      const successful = results.filter(
        (result) => result.status === "fulfilled",
      ).length;

      if (successful === 0) {
        throw new Error("Could not retrieve dashboard data from the API.");
      }

      setData({ stats, requests, projects, conversations });
      setApiStatus("online");
      setLastUpdated(new Date());

      if (successful !== results.length) {
        setError(
          "Some sections could not load. Check the corresponding API endpoints.",
        );
      }
    } catch (cause) {
      setApiStatus("offline");
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to connect to the Nexus API.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    data,
    loading,
    refreshing,
    apiStatus,
    lastUpdated,
    error,
    loadDashboard,
  };
}
