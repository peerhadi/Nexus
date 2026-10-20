"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import type { Client } from "@/lib/inbox/client-types";

import { ClientDetail } from "./ClientDetail";

type ClientsDetailPanelProps = {
  client: Client;
  onOpenMenu: () => void;
};

export function ClientsDetailPanel({
  client,
  onOpenMenu,
}: ClientsDetailPanelProps) {
  return (
    <motion.div
      key={client.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
      className="flex min-h-[560px] min-w-0 flex-col lg:min-h-0"
    >
      {/* Mobile toolbar */}
      <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:hidden">
        <button
          type="button"
          aria-label="Open client menu"
          onClick={onOpenMenu}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {client.name}
          </p>

          <p className="truncate text-[11px] text-[var(--text-muted)]">
            {client.email}
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <ClientDetail client={client} />
      </div>
    </motion.div>
  );
}
