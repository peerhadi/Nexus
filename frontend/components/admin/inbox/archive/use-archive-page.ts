"use client";

import { useEffect, useMemo, useState } from "react";

import type { ArchiveFilter } from "@/lib/inbox/archive-types";
import type { Conversation } from "@/lib/inbox/inbox-types";
import { API_URL } from "@/lib/api";

export function useArchivePage() {
  const [items, setItems] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ArchiveFilter>("All");
  const [loading, setLoading] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadArchive() {
      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) return;

        const response = await fetch(`${API_URL}/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load archived conversations");
        }

        const data = await response.json();

        const conversations: Conversation[] = Array.isArray(data)
          ? data
          : (data.conversations ?? []);

        const archived = conversations.filter(
          (conversation: Conversation) => conversation.status === "CLOSED",
        );

        if (!cancelled) {
          setItems(archived);
          setSelectedId((current) => current || archived[0]?.id || "");
        }
      } catch (error) {
        console.error("Failed to load archive:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadArchive();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const filteredItems = useMemo(() => {
    const value = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !value ||
        item.subject?.toLowerCase().includes(value) ||
        item.client?.name.toLowerCase().includes(value) ||
        item.client?.email.toLowerCase().includes(value) ||
        item.id.toLowerCase().includes(value);

      if (!matchesSearch) {
        return false;
      }

      if (filter === "All") {
        return true;
      }

      return item.status === filter;
    });
  }, [items, search, filter]);

  const selectedItem =
    items.find((item) => item.id === selectedId) ??
    filteredItems[0] ??
    items[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileDrawerOpen(false);
  };

  return {
    filter,
    filteredItems,
    handleSelect,
    items,
    loading,
    mobileDrawerOpen,
    search,
    selectedItem,
    setFilter,
    setMobileDrawerOpen,
    setSearch,
  };
}
