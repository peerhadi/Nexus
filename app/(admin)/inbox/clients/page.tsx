"use client";

import { useMemo, useState } from "react";
import { Users } from "lucide-react";

import { ClientDetail } from "@/components/admin/inbox/clients/ClientDetail";
import { ClientList } from "@/components/admin/inbox/clients/ClientList";
import { ClientStats } from "@/components/admin/inbox/clients/ClientStats";
import { clients, clientFilters } from "@/lib/inbox/client-data";
import { filterClients } from "@/lib/inbox/client-utils";
import type { ClientFilter } from "@/lib/inbox/client-types";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ClientFilter>("All");
  const [selectedId, setSelectedId] = useState("CL-001");

  const filteredClients = useMemo(
    () => filterClients(clients, search, filter),
    [search, filter],
  );

  const selectedClient =
    clients.find((client) => client.id === selectedId) ??
    filteredClients[0] ??
    clients[0];

  if (!selectedClient) {
    return (
      <main className="flex h-dvh w-full items-center justify-center bg-[#f7f7f5] text-[#111]">
        <div className="text-sm font-semibold text-black/40">
          No clients found.
        </div>
      </main>
    );
  }

  return (
    <main className="h-[calc(100vh-0px)] min-h-0 overflow-hidden bg-[#f7f7f5] text-[#111]">
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white/85 px-5 backdrop-blur-xl sm:px-8">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
              Communication
            </div>

            <h1 className="mt-1 text-[21px] font-bold tracking-[-0.045em]">
              Clients
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3 py-2 sm:flex">
              <Users size={14} className="text-black/30" />

              <span className="text-[11px] font-semibold text-black/55">
                {clients.length} clients
              </span>
            </div>
          </div>
        </header>

        <div className="min-h-0 min-w-[85vw] flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1500px] p-5 sm:p-7 lg:p-8">
            <ClientStats clients={clients} />

            <div className="mt-5 grid min-h-[560px] grid-cols-1 overflow-hidden rounded-2xl border border-black/[0.08] bg-white lg:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)]">
              <ClientList
                clients={filteredClients}
                selectedId={selectedClient.id}
                search={search}
                filter={filter}
                filters={clientFilters}
                onSearchChange={setSearch}
                onFilterChange={setFilter}
                onSelect={setSelectedId}
              />

              <ClientDetail client={selectedClient} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
