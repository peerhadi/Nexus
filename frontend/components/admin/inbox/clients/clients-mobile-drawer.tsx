"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { Client, ClientFilter } from "@/lib/inbox/client-types";

import { ClientList } from "./ClientList";

type ClientsMobileDrawerProps = {
  open: boolean;
  clients: Client[];
  selectedId: string;
  search: string;
  filter: ClientFilter;
  filters: ClientFilter[];
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ClientFilter) => void;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export function ClientsMobileDrawer({
  open,
  clients,
  selectedId,
  search,
  filter,
  filters,
  onSearchChange,
  onFilterChange,
  onSelect,
  onClose,
}: ClientsMobileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close client menu"
            className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 32,
              mass: 0.8,
            }}
            className="fixed inset-y-0 left-0 z-50 flex w-[min(88vw,380px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Clients
                </p>

                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  {clients.length} client
                  {clients.length === 1 ? "" : "s"}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close client menu"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Client list */}
            <div className="min-h-0 flex-1 overflow-hidden">
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
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
