import { Search, X } from "lucide-react";

import type { ArchiveFilter } from "@/lib/inbox/archive-types";

type ArchiveFiltersProps = {
  search: string;
  filter: ArchiveFilter;
  resultCount: number;
  filters: {
    label: string;
    value: ArchiveFilter;
  }[];
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ArchiveFilter) => void;
};

export function ArchiveFilters({
  search,
  filter,
  resultCount,
  filters,
  onSearchChange,
  onFilterChange,
}: ArchiveFiltersProps) {
  return (
    <div className="shrink-0 border-b border-[var(--border)] bg-[var(--surface)] p-3">
      <div className="group flex h-9 items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 shadow-[0_1px_2px_rgba(0,0,0,0.025)] transition-all focus-within:border-[var(--border-strong)] focus-within:bg-[var(--surface)] focus-within:shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
        <Search
          size={12}
          className="shrink-0 text-[var(--text-muted)] transition-colors group-focus-within:text-[var(--text-secondary)]"
        />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search archive..."
          className="min-w-0 flex-1 bg-transparent text-[9px] font-medium outline-none placeholder:text-[var(--text-muted)]"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="flex h-5 w-5 items-center justify-center rounded-md text-[var(--text-muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            <X size={10} />
          </button>
        )}
      </div>

      <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-1">
        <div
          className={`grid gap-0.5 ${
            filters.length === 1
              ? "grid-cols-1"
              : filters.length === 2
                ? "grid-cols-2"
                : filters.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-4"
          }`}
        >
          {filters.map((item, i) => {
            const active = filter === item.value;

            return (
              <button
                key={i}
                type="button"
                onClick={() => onFilterChange(item.value)}
                className={`relative h-7 overflow-hidden rounded-lg text-[8px] font-bold transition-all duration-200 ${
                  active
                    ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-[0_2px_7px_rgba(0,0,0,0.1)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text-secondary)]"
                }`}
              >
                {active && (
                  <span className="absolute inset-x-2 bottom-0 h-px bg-[var(--accent)]" />
                )}

                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          Conversations
        </span>

        <span className="text-[7px] font-bold text-[var(--text-muted)]">
          {resultCount}
        </span>
      </div>
    </div>
  );
}
