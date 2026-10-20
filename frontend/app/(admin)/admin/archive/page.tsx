"use client";

import { ArchiveEmptyState } from "@/components/admin/inbox/archive/archive-empty-state";
import { ArchivePageHeader } from "@/components/admin/inbox/archive/archive-page-header";
import { ArchiveWorkspace } from "@/components/admin/inbox/archive/archive-workspace";
import { useArchivePage } from "@/components/admin/inbox/archive/use-archive-page";

export default function ArchivePage() {
  const {
    filter,
    filteredItems,
    handleSelect,
    items,
    loading,
    mobileDrawerOpen,
    search,
    selectedItem,
    setFilter,
    setMobileDrawerOpen,
    setSearch,
  } = useArchivePage();

  if (!selectedItem) {
    return <ArchiveEmptyState loading={loading} />;
  }

  return (
    <main className="flex h-dvh w-full min-w-0 overflow-hidden bg-[var(--surface)] text-[var(--text-primary)]">
      <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden">
        <ArchivePageHeader items={items} />

        <ArchiveWorkspace
          filteredItems={filteredItems}
          selectedItem={selectedItem}
          search={search}
          filter={filter}
          mobileDrawerOpen={mobileDrawerOpen}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
          onSelect={handleSelect}
          onOpenMenu={() => setMobileDrawerOpen(true)}
          onCloseMenu={() => setMobileDrawerOpen(false)}
        />
      </div>
    </main>
  );
}
