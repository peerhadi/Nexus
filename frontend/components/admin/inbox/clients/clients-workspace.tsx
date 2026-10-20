"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { Client, ClientFilter } from "@/lib/inbox/client-types";

import { ClientsDetailPanel } from "./clients-detail-panel";
import { ClientsDesktopList } from "./clients-desktop-list";
import { ClientsEmptyDetail } from "./clients-empty-detail";
import { ClientsMobileDrawer } from "./clients-mobile-drawer";
import { ClientStats } from "./ClientStats";

type ClientsWorkspaceProps = {
  clients: Client[];
  filteredClients: Client[];
  selectedClient: Client | null;
  search: string;
  filter: ClientFilter;
  filters: ClientFilter[];
  mobileDrawerOpen: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ClientFilter) => void;
  onSelect: (id: string) => void;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
};

export function ClientsWorkspace({
  clients,
  filteredClients,
  selectedClient,
  search,
  filter,
  filters,
  mobileDrawerOpen,
  onSearchChange,
  onFilterChange,
  onSelect,
  onOpenMenu,
  onCloseMenu,
}: ClientsWorkspaceProps) {
  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-[1500px] p-3 sm:p-5">
        {/* Stats */}
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

        {/* =========================
            MAIN CLIENT WORKSPACE
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.28,
            delay: 0.08,
            ease: "easeOut",
          }}
          className="relative mt-3 grid min-h-[560px] grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] sm:mt-5 lg:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)]"
        >
          {/* =========================
              DESKTOP CLIENT LIST
          ========================== */}
          <ClientsDesktopList
            clients={filteredClients}
            selectedId={selectedClient?.id ?? ""}
            search={search}
            filter={filter}
            filters={filters}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onSelect={onSelect}
          />

          {/* =========================
              MOBILE CLIENT DRAWER
          ========================== */}
          <ClientsMobileDrawer
            open={mobileDrawerOpen}
            clients={filteredClients}
            selectedId={selectedClient?.id ?? ""}
            search={search}
            filter={filter}
            filters={filters}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onSelect={onSelect}
            onClose={onCloseMenu}
          />

          {/* =========================
              CLIENT DETAIL
          ========================== */}
          <AnimatePresence mode="wait" initial={false}>
            {selectedClient ? (
              <ClientsDetailPanel
                key={selectedClient.id}
                client={selectedClient}
                onOpenMenu={onOpenMenu}
              />
            ) : (
              <ClientsEmptyDetail />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
