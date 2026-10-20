"use client";

import { Menu } from "lucide-react";

import type { Request } from "@/lib/inbox/request-types";

type RequestsToolbarProps = {
  selectedRequest: Request;
  onOpenDrawer: () => void;
};

export default function RequestsToolbar({
  selectedRequest,
  onOpenDrawer,
}: RequestsToolbarProps) {
  return (
    <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:hidden">
      <button
        type="button"
        aria-label="Open request menu"
        onClick={onOpenDrawer}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
          {selectedRequest.subject || "Client request"}
        </p>

        <p className="truncate text-[11px] text-[var(--text-muted)]">
          {selectedRequest.name} · {selectedRequest.email}
        </p>
      </div>

      <span className="hidden shrink-0 rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-tertiary)] xs:inline">
        {selectedRequest.status.replace("_", " ")}
      </span>
    </div>
  );
}
