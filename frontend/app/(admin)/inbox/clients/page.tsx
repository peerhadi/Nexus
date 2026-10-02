"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";

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

  if (error) {
    return (
      <main className="flex h-dvh w-full items-center justify-center bg-[#f7f7f5] text-[#111]">
        <div className="rounded-2xl border border-black/[0.08] bg-white px-8 py-7 text-center shadow-sm">
          <div className="text-sm font-bold">Failed to load clients</div>

          <div className="mt-2 text-[10px] text-black/40">{error}</div>
        </div>
      </main>
    );
  }
  return (
    <main className="h-[calc(100vh-0px)] min-h-0 overflow-hidden bg-[#f7f7f5] text-[#111]">
      <div className="flex h-full min-h-0 flex-col">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white/85 px-5 backdrop-blur-xl sm:px-8"
        >
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
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
            className="flex items-center gap-2"
          >
            <div className="hidden items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3 py-2 sm:flex">
              <Users size={14} className="text-black/30" />

              <span className="text-[11px] font-semibold text-black/55">
                {clients.length} clients
              </span>
            </div>
          </motion.div>
        </motion.header>

        <div className="min-h-0 min-w-[85vw] flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1500px] p-5">
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

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: 0.08,
                ease: "easeOut",
              }}
              className="mt-5 grid min-h-[560px] grid-cols-1 overflow-hidden rounded-2xl border border-black/[0.08] bg-white lg:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)]"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.22,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="min-h-0"
              >
                <ClientList
                  clients={filteredClients}
                  selectedId={selectedClient?.id ?? ""}
                  search={search}
                  filter={filter}
                  filters={clientFilters}
                  onSearchChange={setSearch}
                  onFilterChange={setFilter}
                  onSelect={setSelectedId}
                />
              </motion.div>

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
                    className="min-w-0"
                  >
                    <ClientDetail client={selectedClient} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex min-h-[560px] items-center justify-center p-8 text-center"
                  >
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/[0.04]">
                        <Users size={18} className="text-black/25" />
                      </div>

                      <div className="mt-4 text-sm font-bold">
                        No clients yet
                      </div>

                      <div className="mt-1 text-[10px] text-black/35">
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
