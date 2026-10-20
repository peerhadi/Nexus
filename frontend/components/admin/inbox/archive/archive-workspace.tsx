"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { Conversation } from "@/lib/inbox/inbox-types";
import type { ArchiveFilter } from "@/lib/inbox/archive-types";

import { ArchiveDetailPanel } from "./archive-detail-panel";
import { ArchiveMobileDrawer } from "./archive-mobile-drawer";
import { ArchiveSidebar } from "./archive-sidebar";

type ArchiveWorkspaceProps = {
  filteredItems: Conversation[];
  selectedItem: Conversation;
  search: string;
  filter: ArchiveFilter;
  mobileDrawerOpen: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ArchiveFilter) => void;
  onSelect: (id: string) => void;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
};

export function ArchiveWorkspace({
  filteredItems,
  selectedItem,
  search,
  filter,
  mobileDrawerOpen,
  onSearchChange,
  onFilterChange,
  onSelect,
  onOpenMenu,
  onCloseMenu,
}: ArchiveWorkspaceProps) {
  const archiveList = (
    <ArchiveSidebar
      items={filteredItems}
      selectedId={selectedItem.id}
      search={search}
      filter={filter}
      onSearchChange={onSearchChange}
      onFilterChange={onFilterChange}
      onSelect={onSelect}
    />
  );

  return (
    <div className="relative flex min-h-0 w-full min-w-0 flex-1 overflow-hidden">
      {/* =========================
          DESKTOP SIDEBAR
      ========================== */}
      <motion.aside
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.25,
          delay: 0.08,
          ease: "easeOut",
        }}
        className="hidden w-[360px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] lg:flex"
      >
        {archiveList}
      </motion.aside>

      {/* =========================
          MOBILE DRAWER
      ========================== */}
      <ArchiveMobileDrawer
        open={mobileDrawerOpen}
        count={filteredItems.length}
        onClose={onCloseMenu}
      >
        {archiveList}
      </ArchiveMobileDrawer>

      {/* =========================
          DETAIL PANEL
      ========================== */}
      <AnimatePresence mode="wait" initial={false}>
        <ArchiveDetailPanel
          key={selectedItem.id}
          item={selectedItem}
          onOpenMenu={onOpenMenu}
        />
      </AnimatePresence>
    </div>
  );
}
