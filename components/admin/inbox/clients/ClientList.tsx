import { Search } from "lucide-react";

import type { Client, ClientFilter } from "@/lib/inbox/client-types";

import { ClientListItem } from "./ClientListItem";

type ClientListProps = {
  clients: Client[];
  selectedId: string;
  search: string;
  filter: ClientFilter;
  filters: ClientFilter[];
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ClientFilter) => void;
  onSelect: (id: string) => void;
};

export function ClientList({
  clients,
  selectedId,
  search,
  filter,
  filters,
  onSearchChange,
  onFilterChange,
  onSelect,
}: ClientListProps) {
  return (
    <section className="flex min-h-0 flex-col border-b border-black/[0.08] lg:border-b-0 lg:border-r">
      <div className="shrink-0 border-b border-black/[0.07] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[12px] font-bold">Client directory</div>

            <div className="mt-0.5 text-[10px] text-black/35">
              People who have contacted Nexus
            </div>
          </div>

          <span className="rounded-full bg-black/[0.05] px-2 py-1 text-[9px] font-semibold text-black/45">
            {clients.length}
          </span>
        </div>

        <div className="mt-4 flex h-9 items-center gap-2 rounded-xl border border-black/[0.08] bg-[#fafaf8] px-3">
          <Search size={14} className="shrink-0 text-black/30" />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search clients..."
            className="min-w-0 flex-1 bg-transparent text-[11px] font-medium outline-none placeholder:text-black/25"
          />
        </div>

        <div className="mt-3 flex gap-1.5 overflow-x-auto">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onFilterChange(item)}
              className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[9px] font-bold transition-all ${
                filter === item
                  ? "bg-[#111] text-white"
                  : "bg-black/[0.04] text-black/40 hover:bg-black/[0.07] hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {clients.length === 0 ? (
          <div className="flex h-full min-h-[250px] items-center justify-center px-6 text-center">
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04]">
                <Search size={16} className="text-black/25" />
              </div>

              <div className="mt-3 text-[11px] font-bold">No clients found</div>

              <div className="mt-1 text-[10px] text-black/35">
                Try another search or filter.
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06]">
            {clients.map((client) => (
              <ClientListItem
                key={client.id}
                client={client}
                selected={selectedId === client.id}
                onSelect={() => onSelect(client.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
