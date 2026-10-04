import { Clock3, Mail } from "lucide-react";

import type { Conversation } from "@/lib/inbox/inbox-types";

type ArchiveMessageProps = {
  item: Conversation;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArchiveMessage({ item }: ArchiveMessageProps) {
  const clientName = item.client?.name ?? "Unknown client";
  const clientEmail = item.client?.email ?? "";

  const messages = item.messages ?? [];

  return (
    <div className="group relative mt-7 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_18px_rgba(0,0,0,0.035)]">
      <div className="absolute left-0 top-0 h-full w-[2px] bg-[var(--border)]" />

      <div className="flex min-h-[72px] items-center justify-between border-b border-[var(--border)] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
            <Mail size={13} className="text-[var(--text-secondary)]" />
          </div>

          <div>
            <div className="text-[11px] font-bold">{clientName}</div>

            <div className="mt-0.5 text-[8px] text-[var(--text-muted)]">{clientEmail}</div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-[8px] text-[var(--text-muted)]">
          <Clock3 size={10} />
          {formatDate(item.updatedAt)}
        </div>
      </div>

      <div className="min-h-[220px] px-6 py-8">
        <div className="mb-5 flex items-center gap-2">
          <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Conversation
          </div>

          <div className="h-px w-10 bg-[var(--border)]" />
        </div>

        {messages.length === 0 ? (
          <p className="text-[9px] text-[var(--text-muted)]">
            No messages in this conversation.
          </p>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {message.senderType}
                  </span>

                  <span className="text-[7px] text-[var(--text-muted)]">
                    {formatDate(message.createdAt)}
                  </span>
                </div>

                <p className="mt-2 whitespace-pre-line text-[12px] leading-6 tracking-[-0.005em] text-[var(--text-secondary)]">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
