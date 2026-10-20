import type { Conversation } from "@/lib/inbox/inbox-types";
import type { ArchiveFilter } from "@/lib/inbox/archive-types";

import { ArchiveFilters } from "./ArchiveFilters";
import { ArchiveList } from "./ArchiveList";

type ArchiveSidebarProps = {
  items: Conversation[];
  selectedId: string;
  search: string;
  filter: ArchiveFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ArchiveFilter) => void;
  onSelect: (id: string) => void;
};

export function ArchiveSidebar({
  items,
  selectedId,
  search,
  filter,
  onSearchChange,
  onFilterChange,
  onSelect,
}: ArchiveSidebarProps) {
  return (
    <>
      <ArchiveFilters
        search={search}
        filter={filter}
        resultCount={items.length}
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
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <ArchiveList
          items={items}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </div>
    </>
  );
}
