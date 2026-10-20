"use client";

import { useEffect, useMemo, useState } from "react";

import { filterRequests } from "./requests-utils";
import { patchRequestStatus, postRequestProject } from "./requests-actions";
import { API_URL } from "@/lib/api";
import type {
  Request,
  RequestFilter,
  RequestStatus,
} from "@/lib/inbox/request-types";

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RequestFilter>("All");
  const [status, setStatus] = useState<RequestStatus>("NEW");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);
  const [createdProjectRequestId, setCreatedProjectRequestId] = useState<
    string | null
  >(null);
  const [error, setError] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) {
          setError("Authentication required.");
          return;
        }

        const response = await fetch(`${API_URL}/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.message ?? data?.error ?? "Failed to load requests.",
          );
        }

        const loadedRequests: Request[] = Array.isArray(data)
          ? data
          : (data?.requests ?? []);

        setRequests(loadedRequests);

        if (loadedRequests.length > 0) {
          setSelectedId(loadedRequests[0].id);
          setStatus(loadedRequests[0].status);
        }
      } catch (error) {
        console.error("Failed to load requests:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load requests.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadRequests();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const filteredRequests = useMemo(
    () => filterRequests(requests, search, filter),
    [requests, search, filter],
  );

  const selectedRequest =
    requests.find((request) => request.id === selectedId) ??
    filteredRequests[0] ??
    requests[0] ??
    null;

  function selectRequest(request: Request) {
    setSelectedId(request.id);
    setStatus(request.status);
    setError("");
    setMobileDrawerOpen(false);
  }

  async function updateRequestStatus(nextStatus: RequestStatus) {
    if (!selectedRequest || updating || creatingProject) {
      return;
    }

    const token =
      localStorage.getItem("nexus_token") ??
      sessionStorage.getItem("nexus_token");

    if (!token) {
      setError("Authentication required.");
      return;
    }

    setError("");

    await patchRequestStatus(nextStatus, {
      token,
      selectedRequest,
      onStart: () => setUpdating(true),
      onSuccess: (updatedRequest) => {
        setRequests((current) =>
          current.map((request) =>
            request.id === updatedRequest.id ? updatedRequest : request,
          ),
        );

        setSelectedId(updatedRequest.id);
        setStatus(updatedRequest.status);
      },
      onError: (message) => setError(message),
      onFinish: () => setUpdating(false),
    });
  }

  async function createProjectFromRequest() {
    if (
      !selectedRequest ||
      creatingProject ||
      createdProjectRequestId === selectedRequest.id
    ) {
      return;
    }

    const token =
      localStorage.getItem("nexus_token") ??
      sessionStorage.getItem("nexus_token");

    if (!token) {
      setError("Authentication required.");
      return;
    }

    setError("");

    await postRequestProject({
      token,
      selectedRequest,
      onStart: () => setCreatingProject(true),
      onRequestUpdated: (createdRequest) => {
        setRequests((current) =>
          current.map((request) =>
            request.id === createdRequest.id ? createdRequest : request,
          ),
        );

        setStatus(createdRequest.status);
      },
      onCreated: () => setCreatedProjectRequestId(selectedRequest.id),
      onError: (message) => setError(message),
      onFinish: () => setCreatingProject(false),
    });
  }

  return {
    requests,
    loading,
    updating,
    creatingProject,
    createdProjectRequestId,
    error,
    mobileDrawerOpen,
    search,
    filter,
    status,
    setSearch,
    setFilter,
    setMobileDrawerOpen,
    filteredRequests,
    selectedRequest,
    selectRequest,
    updateRequestStatus,
    createProjectFromRequest,
  };
}
