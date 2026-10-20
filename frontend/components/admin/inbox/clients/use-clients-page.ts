"use client";

import { useEffect, useMemo, useState } from "react";

import type { Client, ClientFilter } from "@/lib/inbox/client-types";
import { API_URL } from "@/lib/api";

export const clientFilters: ClientFilter[] = ["All"];

export function useClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ClientFilter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const loadClients = async () => {
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

        const response = await fetch(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.message ?? data?.error ?? "Failed to load clients.",
          );
        }

        const users: Client[] = Array.isArray(data)
          ? data
          : (data?.users ?? []);

        const realClients = users.filter((user) => user.role === "CLIENT");

        setClients(realClients);

        setSelectedId((current) => {
          if (current && realClients.some((client) => client.id === current)) {
            return current;
          }

          return realClients[0]?.id ?? null;
        });
      } catch (error) {
        console.error("Failed to load clients:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load clients.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadClients();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesFilter = filter === "All" || client.role === filter;

      if (!matchesFilter) return false;

      if (!query) return true;

      return (
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.id.toLowerCase().includes(query)
      );
    });
  }, [clients, search, filter]);

  const selectedClient =
    clients.find((client) => client.id === selectedId) ??
    filteredClients[0] ??
    clients[0] ??
    null;

  useEffect(() => {
    if (selectedClient && selectedClient.id !== selectedId) {
      setSelectedId(selectedClient.id);
    }
  }, [selectedClient, selectedId]);

  const handleSelectClient = (id: string) => {
    setSelectedId(id);
    setMobileDrawerOpen(false);
  };

  return {
    clients,
    error,
    filter,
    filteredClients,
    handleSelectClient,
    loading,
    mobileDrawerOpen,
    search,
    selectedClient,
    setFilter,
    setMobileDrawerOpen,
    setSearch,
  };
}
