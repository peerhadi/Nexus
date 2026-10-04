import { Archive, MessageSquare, Users } from "lucide-react";

import type { Conversation } from "@/lib/inbox/inbox-types";

import { Stat } from "./Stat";

type ArchiveStatsProps = {
  items: Conversation[];
};

export function ArchiveStats({ items }: ArchiveStatsProps) {
  const clientCount = new Set(items.map((item) => item.clientId)).size;

  const messageCount = items.reduce(
    (total, item) => total + (item.messages?.length ?? 0),
    0,
  );

  return (
    <div className="grid h-[58px] shrink-0 grid-cols-3 border-b border-[var(--border)] bg-[var(--surface)]">
      <Stat
        label="Archived"
        value={String(items.length)}
        icon={<Archive size={11} />}
      />

      <Stat
        label="Clients"
        value={String(clientCount)}
        icon={<Users size={11} />}
      />

      <Stat
        label="Messages"
        value={String(messageCount)}
        icon={<MessageSquare size={11} />}
      />
    </div>
  );
}
