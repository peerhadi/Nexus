import { UserRound } from "lucide-react";

import type { Conversation } from "@/lib/inbox/inbox-types";

import { ArchiveMessage } from "./ArchiveMessage";
import { ArchiveState } from "./ArchiveState";
import { MetaPill } from "./MetaPill";
import { StatusBadge } from "./StatusBadge";

type ArchiveDetailProps = {
  item: Conversation;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArchiveDetail({ item }: ArchiveDetailProps) {
  const clientName = item.client?.name ?? "Unknown client";
  const clientEmail = item.client?.email ?? "";

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[var(--surface)]">
      <div className="relative flex h-[74px] shrink-0 items-center justify-between overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] px-5 sm:px-7">
        <div className="pointer-events-none absolute -right-16 -top-24 h-44 w-44 rounded-full border-[30px] border-[var(--border-subtle)]" />

        <div className="relative flex min-w-0 items-center gap-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
            <UserRound size={13} />

            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--accent)]" />
          </div>

          <div className="min-w-0">
            <div className="truncate text-[12px] font-bold tracking-[-0.01em]">
              {clientName}
            </div>

            <div className="mt-0.5 truncate text-[9px] text-[var(--text-muted)]">
              {clientEmail}
            </div>
          </div>
        </div>

        <div className="relative flex shrink-0 items-center gap-2">
          <span className="hidden rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1.5 text-[8px] font-bold text-[var(--text-muted)] sm:block">
            {item.id}
          </span>

          <StatusBadge status={item.status} />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="w-full px-5 py-7 sm:px-8">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />

              <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Archived conversation
              </div>
            </div>

            <h2 className="max-w-3xl text-[24px] font-bold leading-[1.05] tracking-[-0.05em]">
              {item.subject ?? "Untitled conversation"}
            </h2>

            <div className="mt-2 text-[9px] text-[var(--text-muted)]">
              Closed {formatDate(item.updatedAt)}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <MetaPill label="Client" value={clientName} />

            <MetaPill label="Status" value={item.status} />

            <MetaPill label="Conversation ID" value={item.id} />

            <MetaPill label="Closed" value={formatDate(item.updatedAt)} />
          </div>

          <ArchiveMessage item={item} />

          <ArchiveState status={item.status} />

          <div className="h-8" />
        </div>
      </div>
    </section>
  );
}
