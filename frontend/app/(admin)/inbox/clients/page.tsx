"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ClientDetail } from "@/components/admin/inbox/clients/ClientDetail";
import { ClientList } from "@/components/admin/inbox/clients/ClientList";
import { ClientStats } from "@/components/admin/inbox/clients/ClientStats";
import type { Client, ClientFilter } from "@/lib/inbox/client-types";
import { API_URL } from "@/lib/api";

export default function ClientsPage() {
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

  const clientFilters: ClientFilter[] = ["All"];

  const handleSelectClient = (id: string) => {
    setSelectedId(id);
    setMobileDrawerOpen(false);
  };

  if (error) {
    return (
      <main className="flex h-dvh w-full items-center justify-center bg-[var(--surface-secondary)] px-5 text-[var(--text-primary)]">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-7 text-center shadow-sm sm:px-8">
          <div className="text-sm font-bold">Failed to load clients</div>

          <div className="mt-2 break-words text-[10px] text-[var(--text-tertiary)]">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-dvh w-full min-w-0 overflow-hidden bg-[var(--surface-secondary)] text-[var(--text-primary)]">
      <div className="flex h-full min-h-0 flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex h-[74px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 backdrop-blur-xl sm:px-8"
        >
          <div className="min-w-0">
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Communication
            </div>

            <h1 className="mt-1 text-[21px] font-bold tracking-[-0.045em]">
              Clients
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 sm:flex">
              <Users size={14} className="text-[var(--text-muted)]" />

              <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
                {clients.length} clients
              </span>
            </div>

            {/* Mobile client count */}
            <div className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 sm:hidden">
              <Users size={13} className="text-[var(--text-muted)]" />

              <span className="text-[10px] font-semibold text-[var(--text-secondary)]">
                {clients.length}
              </span>
            </div>
          </motion.div>
        </motion.header>

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1500px] p-3 sm:p-5">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: 0.04,
                ease: "easeOut",
              }}
            >
              <ClientStats clients={clients} />
            </motion.div>

            {/* =========================
                MAIN CLIENT WORKSPACE
            ========================== */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: 0.08,
                ease: "easeOut",
              }}
              className="relative mt-3 grid min-h-[560px] grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] sm:mt-5 lg:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)]"
            >
              {/* =========================
                  DESKTOP CLIENT LIST
              ========================== */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.22,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="hidden min-h-0 lg:block"
              >
                <ClientList
                  clients={filteredClients}
                  selectedId={selectedClient?.id ?? ""}
                  search={search}
                  filter={filter}
                  filters={clientFilters}
                  onSearchChange={setSearch}
                  onFilterChange={setFilter}
                  onSelect={handleSelectClient}
                />
              </motion.div>

              {/* =========================
                  MOBILE CLIENT DRAWER
              ========================== */}
              <AnimatePresence>
                {mobileDrawerOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.button
                      type="button"
                      aria-label="Close client menu"
                      className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
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
                      className="fixed inset-y-0 left-0 z-50 flex w-[min(88vw,380px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
                    >
                      {/* Drawer header */}
                      <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                            Clients
                          </p>

                          <p className="text-sm font-semibold text-[var(--text-secondary)]">
                            {filteredClients.length} client
                            {filteredClients.length === 1 ? "" : "s"}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label="Close client menu"
                          onClick={() => setMobileDrawerOpen(false)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Client list */}
                      <div className="min-h-0 flex-1 overflow-hidden">
                        <ClientList
                          clients={filteredClients}
                          selectedId={selectedClient?.id ?? ""}
                          search={search}
                          filter={filter}
                          filters={clientFilters}
                          onSearchChange={setSearch}
                          onFilterChange={setFilter}
                          onSelect={handleSelectClient}
                        />
                      </div>
                    </motion.aside>
                  </>
                )}
              </AnimatePresence>

              {/* =========================
                  CLIENT DETAIL
              ========================== */}
              <AnimatePresence mode="wait" initial={false}>
                {selectedClient ? (
                  <motion.div
                    key={selectedClient.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                    className="flex min-h-[560px] min-w-0 flex-col lg:min-h-0"
                  >
                    {/* Mobile toolbar */}
                    <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:hidden">
                      <button
                        type="button"
                        aria-label="Open client menu"
                        onClick={() => setMobileDrawerOpen(true)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                      >
                        <Menu className="h-4 w-4" />
                      </button>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                          {selectedClient.name}
                        </p>

                        <p className="truncate text-[11px] text-[var(--text-muted)]">
                          {selectedClient.email}
                        </p>
                      </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                      <ClientDetail client={selectedClient} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex min-h-[560px] min-w-0 items-center justify-center p-6 text-center lg:min-h-0"
                  >
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-hover)]">
                        <Users size={18} className="text-[var(--text-muted)]" />
                      </div>

                      <div className="mt-4 text-sm font-bold">
                        No clients yet
                      </div>

                      <div className="mt-1 text-[10px] text-[var(--text-muted)]">
                        Client accounts will appear here when users sign up.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
