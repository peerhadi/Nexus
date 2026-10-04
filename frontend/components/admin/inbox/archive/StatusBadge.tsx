import { Archive } from "lucide-react";

import type { ConversationStatus } from "@/lib/inbox/inbox-types";

type StatusBadgeProps = {
  status: ConversationStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1.5 text-[8px] font-bold text-[var(--text-secondary)] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <Archive size={9} />
      {status === "CLOSED" ? "Closed" : "Open"}
    </span>
  );
}
