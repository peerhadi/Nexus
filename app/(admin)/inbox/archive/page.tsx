"use client";

import { useMemo, useState } from "react";

import { ArchiveDetail } from "@/components/admin/inbox/archive/ArchiveDetail";
import { ArchiveFilters } from "@/components/admin/inbox/archive/ArchiveFilters";
import { ArchiveHeader } from "@/components/admin/inbox/archive/ArchiveHeader";
import { ArchiveList } from "@/components/admin/inbox/archive/ArchiveList";
import { ArchiveStats } from "@/components/admin/inbox/archive/ArchiveStats";
import { archivedItems, archiveFilters } from "@/lib/inbox/archive-data";
import { filterArchiveItems } from "@/lib/inbox/archive-utils";
import type { ArchiveFilter } from "@/lib/inbox/archive-types";

export default function ArchivePage() {
  const [selectedId, setSelectedId] = useState(archivedItems[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ArchiveFilter>("All");

  const filteredItems = useMemo(
    () => filterArchiveItems(archivedItems, search, filter),
    [search, filter],
  );

  const selectedItem =
    archivedItems.find((item) => item.id === selectedId) ??
    filteredItems[0] ??
    archivedItems[0];

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
        <ArchiveHeader count={archivedItems.length} />

        <ArchiveStats items={archivedItems} />

        <div className="flex min-h-0 w-full min-w-0 flex-1 overflow-hidden">
          <aside className="flex w-[360px] shrink-0 flex-col border-r border-black/[0.08] bg-white">
            <ArchiveFilters
              search={search}
              filter={filter}
              resultCount={filteredItems.length}
              filters={archiveFilters}
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
          </aside>

          <ArchiveDetail item={selectedItem} />
        </div>
      </div>
    </main>
  );
}
