"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { ArchiveDetail } from "@/components/admin/inbox/archive/ArchiveDetail";
import { ArchiveFilters } from "@/components/admin/inbox/archive/ArchiveFilters";
import { ArchiveHeader } from "@/components/admin/inbox/archive/ArchiveHeader";
import { ArchiveList } from "@/components/admin/inbox/archive/ArchiveList";
import { ArchiveStats } from "@/components/admin/inbox/archive/ArchiveStats";
import type { ArchiveFilter } from "@/lib/inbox/archive-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type Conversation = {
  id: string;
  clientId: string;
  subject: string | null;
  status: "OPEN" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  client?: {
    id: string;
    name: string;
    email: string;
  };
  messages?: {
    id: string;
    content: string;
    senderType: "CLIENT" | "ADMIN";
    createdAt: string;
  }[];
};

export default function ArchivePage() {
  const [items, setItems] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ArchiveFilter>("All");
  const [loading, setLoading] = useState(true);

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
          (conversation) => conversation.status === "CLOSED",
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

  if (!selectedItem) {
    return (
      <main className="flex h-dvh w-full items-center justify-center bg-white text-[#111]">
        <div className="text-sm font-semibold text-black/40">
          No archived conversations.
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-dvh w-full min-w-0 overflow-hidden bg-white text-[#111]">
      <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <ArchiveHeader count={items.length} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: 0.04,
            ease: "easeOut",
          }}
        >
          <ArchiveStats items={items} />
        </motion.div>

        <div className="flex min-h-0 w-full min-w-0 flex-1 overflow-hidden">
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.25,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="flex w-[360px] shrink-0 flex-col border-r border-black/[0.08] bg-white"
          >
            <ArchiveFilters
              search={search}
              filter={filter}
              resultCount={filteredItems.length}
              filters={[
                {
                  label: "All",
                  value: "All",
                },
                {
                  label: "Closed",
                  value: "CLOSED",
                },
              ]}
              onSearchChange={setSearch}
              onFilterChange={setFilter}
            />

            <div className="min-h-0 flex-1 overflow-y-auto">
              <ArchiveList
                items={filteredItems}
                selectedId={selectedItem.id}
                onSelect={setSelectedId}
              />
            </div>
          </motion.aside>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              className="flex min-w-0 flex-1"
            >
              <ArchiveDetail item={selectedItem} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
