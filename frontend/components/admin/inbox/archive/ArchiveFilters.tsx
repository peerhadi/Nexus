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
    <div className="shrink-0 border-b border-black/[0.07] bg-white p-3">
      <div className="group flex h-9 items-center gap-2.5 rounded-xl border border-black/[0.08] bg-[#f7f7f5] px-3 shadow-[0_1px_2px_rgba(0,0,0,0.025)] transition-all focus-within:border-black/[0.18] focus-within:bg-white focus-within:shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
        <Search
          size={12}
          className="shrink-0 text-black/30 transition-colors group-focus-within:text-black/60"
        />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search archive..."
          className="min-w-0 flex-1 bg-transparent text-[9px] font-medium outline-none placeholder:text-black/25"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="flex h-5 w-5 items-center justify-center rounded-md text-black/25 transition-all hover:bg-black/[0.06] hover:text-black"
          >
            <X size={10} />
          </button>
        )}
      </div>

      <div className="mt-3 rounded-xl border border-black/[0.07] bg-[#f7f7f5] p-1">
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
                    ? "bg-white text-black shadow-[0_2px_7px_rgba(0,0,0,0.1)]"
                    : "text-black/30 hover:bg-white/70 hover:text-black/60"
                }`}
              >
                {active && (
                  <span className="absolute inset-x-2 bottom-0 h-px bg-black" />
                )}

                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-black/25">
          Conversations
        </span>

        <span className="text-[7px] font-bold text-black/25">
          {resultCount}
        </span>
      </div>
    </div>
  );
}
