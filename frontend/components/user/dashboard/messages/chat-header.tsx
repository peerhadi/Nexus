import type { Conversation } from "@/lib/inbox/inbox-types";

export function ChatHeader({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex shrink-0 items-center gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-6 py-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-sm font-black text-[var(--text-inverse)] shadow-lg">
        N
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-black text-[var(--text-primary)]">
          {conversation.subject ?? "Nexus Team"}
        </div>

        <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-[var(--text-muted)]">
          <span>
            {conversation.status === "OPEN"
              ? "Open conversation"
              : "Closed conversation"}
          </span>

          <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />

          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
