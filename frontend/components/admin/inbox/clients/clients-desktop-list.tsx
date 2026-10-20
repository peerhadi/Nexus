"use client";

import { motion } from "framer-motion";

import type { Client, ClientFilter } from "@/lib/inbox/client-types";

import { ClientList } from "./ClientList";

type ClientsDesktopListProps = {
  clients: Client[];
  selectedId: string;
  search: string;
  filter: ClientFilter;
  filters: ClientFilter[];
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ClientFilter) => void;
  onSelect: (id: string) => void;
};

export function ClientsDesktopList({
  clients,
  selectedId,
  search,
  filter,
  filters,
  onSearchChange,
  onFilterChange,
  onSelect,
}: ClientsDesktopListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.22,
        delay: 0.1,
        ease: "easeOut",
      }}
      className="hidden min-h-0 lg:block"
    >
      <ClientList
        clients={clients}
        selectedId={selectedId}
        search={search}
        filter={filter}
        filters={filters}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
        onSelect={onSelect}
      />
    </motion.div>
  );
}
