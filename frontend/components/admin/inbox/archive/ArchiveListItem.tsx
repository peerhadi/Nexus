import { ChevronRight, UserRound } from "lucide-react";

import type { Conversation } from "@/lib/inbox/inbox-types";

type ArchiveListItemProps = {
  item: Conversation;
  index: number;
  active: boolean;
  onSelect: () => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArchiveListItem({
  item,
  index,
  active,
  onSelect,
}: ArchiveListItemProps) {
  const clientName = item.client?.name ?? "Unknown client";
  const clientEmail = item.client?.email ?? "";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full border-b border-[var(--border-subtle)] px-4 py-4 text-left transition-all duration-200 ${
        active
          ? "bg-[var(--surface-secondary)] shadow-[inset_3px_0_0_#111]"
          : "bg-[var(--surface)] hover:bg-[var(--surface-secondary)]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
            active
              ? "border-[var(--border)] bg-[var(--surface)] shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
              : "border-[var(--border-subtle)] bg-[var(--surface-secondary)] group-hover:bg-[var(--surface)]"
          }`}
        >
          <UserRound
            size={12}
            className={`transition-transform duration-200 ${
              active ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
            }`}
          />

          {active && (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-white bg-[var(--accent)]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-[10px] font-bold tracking-[-0.01em]">
                {clientName}
              </div>

              <div className="mt-0.5 truncate text-[8px] text-[var(--text-muted)]">
                {clientEmail}
              </div>
            </div>

            <span className="shrink-0 pt-0.5 text-[7px] font-medium text-[var(--text-disabled)]">
              {formatDate(item.updatedAt)}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="truncate text-[9px] font-semibold text-[var(--text-secondary)]">
              {item.subject ?? "Untitled conversation"}
            </div>

            <ChevronRight
              size={10}
              className={`shrink-0 transition-all duration-200 ${
                active
                  ? "translate-x-0 text-[var(--text-tertiary)]"
                  : "-translate-x-1 text-[var(--text-primary)]/0 group-hover:translate-x-0 group-hover:text-[var(--text-muted)]"
              }`}
            />
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-hover)] px-1.5 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
              Conversation
            </span>

            <span className="h-1 w-1 rounded-full bg-[var(--border)]" />

            <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
              {item.status}
            </span>
          </div>
        </div>
      </div>

      <span className="absolute bottom-3 right-4 text-[6px] font-bold text-[var(--text-primary)]/[0.12]">
        {String(index + 1).padStart(2, "0")}
      </span>
    </button>
  );
}
