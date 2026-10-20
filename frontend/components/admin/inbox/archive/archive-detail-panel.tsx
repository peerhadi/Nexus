"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import type { Conversation } from "@/lib/inbox/inbox-types";

import { ArchiveDetail } from "./ArchiveDetail";

type ArchiveDetailPanelProps = {
  item: Conversation;
  onOpenMenu: () => void;
};

export function ArchiveDetailPanel({
  item,
  onOpenMenu,
}: ArchiveDetailPanelProps) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
    >
      {/* Mobile toolbar */}
      <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:hidden">
        <button
          type="button"
          aria-label="Open archive menu"
          onClick={onOpenMenu}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {item.subject || "Archived conversation"}
          </p>

          <p className="truncate text-[11px] text-[var(--text-muted)]">
            {item.client?.name || item.client?.email || "Archived"}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          Closed
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ArchiveDetail item={item} />
      </div>
    </motion.div>
  );
}
