"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ArchiveDetail } from "@/components/admin/inbox/archive/ArchiveDetail";
import { ArchiveFilters } from "@/components/admin/inbox/archive/ArchiveFilters";
import { ArchiveHeader } from "@/components/admin/inbox/archive/ArchiveHeader";
import { ArchiveList } from "@/components/admin/inbox/archive/ArchiveList";
import { ArchiveStats } from "@/components/admin/inbox/archive/ArchiveStats";
import type { ArchiveFilter } from "@/lib/inbox/archive-types";
import type { Conversation } from "@/lib/inbox/inbox-types";
import { API_URL } from "@/lib/api";

export default function ArchivePage() {
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

  if (!selectedItem) {
    return (
      <main className="flex h-dvh w-full items-center justify-center bg-[var(--surface)] px-6 text-[var(--text-primary)]">
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 text-sm font-semibold text-[var(--text-tertiary)]">
            No archived conversations.
          </div>

          {!loading && (
            <div className="text-xs text-[var(--text-muted)]">
              Closed conversations will appear here.
            </div>
          )}
        </div>
      </main>
    );
  }

  const archiveList = (
    <>
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
          onSelect={handleSelect}
        />
      </div>
    </>
  );

  return (
    <main className="flex h-dvh w-full min-w-0 overflow-hidden bg-[var(--surface)] text-[var(--text-primary)]">
      <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="shrink-0"
        >
          <ArchiveHeader count={items.length} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: 0.04,
            ease: "easeOut",
          }}
          className="shrink-0"
        >
          <ArchiveStats items={items} />
        </motion.div>

        <div className="relative flex min-h-0 w-full min-w-0 flex-1 overflow-hidden">
          {/* =========================
              DESKTOP SIDEBAR
          ========================== */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.25,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="hidden w-[360px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] lg:flex"
          >
            {archiveList}
          </motion.aside>

          {/* =========================
              MOBILE DRAWER
          ========================== */}
          <AnimatePresence>
            {mobileDrawerOpen && (
              <>
                {/* Backdrop */}
                <motion.button
                  type="button"
                  aria-label="Close archive menu"
                  className="fixed inset-x-0 bottom-0 top-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setMobileDrawerOpen(false)}
                />

                {/* Drawer */}
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 32,
                    mass: 0.8,
                  }}
                  className="fixed bottom-0 left-0 top-0 z-50 flex w-[min(88vw,360px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
                >
                  {/* Drawer header */}
                  <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Archive
                      </p>

                      <p className="text-sm font-semibold text-[var(--text-secondary)]">
                        {filteredItems.length} conversation
                        {filteredItems.length === 1 ? "" : "s"}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label="Close archive menu"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Drawer content */}
                  <div className="flex min-h-0 flex-1 flex-col">
                    {archiveList}
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* =========================
              DETAIL PANEL
          ========================== */}
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
              className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
            >
              {/* Mobile toolbar */}
              <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:hidden">
                <button
                  type="button"
                  aria-label="Open archive menu"
                  onClick={() => setMobileDrawerOpen(true)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                >
                  <Menu className="h-4 w-4" />
                </button>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                    {selectedItem.subject || "Archived conversation"}
                  </p>

                  <p className="truncate text-[11px] text-[var(--text-muted)]">
                    {selectedItem.client?.name ||
                      selectedItem.client?.email ||
                      "Archived"}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  Closed
                </span>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <ArchiveDetail item={selectedItem} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
