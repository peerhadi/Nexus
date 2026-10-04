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

function getFilterLabel(filter: ClientFilter) {
  if (filter === "All") return "All";
  if (filter === "CLIENT") return "Clients";
  return "Admins";
}

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
    <section className="flex min-h-0 flex-col border-b border-[var(--border)] lg:border-b-0 lg:border-r">
      <div className="shrink-0 border-b border-[var(--border)] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[12px] font-bold">Client directory</div>

            <div className="mt-0.5 text-[10px] text-[var(--text-muted)]">
              Nexus client accounts
            </div>
          </div>

          <span className="rounded-full bg-[var(--surface-hover)] px-2 py-1 text-[9px] font-semibold text-[var(--text-tertiary)]">
            {clients.length}
          </span>
        </div>

        <div className="mt-4 flex h-9 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3">
          <Search size={14} className="shrink-0 text-[var(--text-muted)]" />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search clients..."
            className="min-w-0 flex-1 bg-transparent text-[11px] font-medium outline-none placeholder:text-[var(--text-muted)]"
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
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--surface-hover)] text-[var(--text-tertiary)] hover:bg-[var(--accent)]/[0.07] hover:text-[var(--text-primary)]"
              }`}
            >
              {getFilterLabel(item)}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {clients.length === 0 ? (
          <div className="flex h-full min-h-[250px] items-center justify-center px-6 text-center">
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-hover)]">
                <Search size={16} className="text-[var(--text-muted)]" />
              </div>

              <div className="mt-3 text-[11px] font-bold">No clients found</div>

              <div className="mt-1 text-[10px] text-[var(--text-muted)]">
                Try another search or filter.
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-subtle)]">
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
