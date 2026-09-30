import { Archive, Check, X } from "lucide-react";

import type { ArchiveReason } from "@/lib/inbox/archive-types";

type StatusBadgeProps = {
  reason: ArchiveReason;
};

export function StatusBadge({ reason }: StatusBadgeProps) {
  return (
    <span className="flex items-center gap-1.5 rounded-lg border border-black/[0.07] bg-[#f7f7f5] px-2.5 py-1.5 text-[8px] font-bold text-black/50 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {reason === "Completed" ? (
        <Check size={9} />
      ) : reason === "Declined" ? (
        <X size={9} />
      ) : (
        <Archive size={9} />
      )}

      {reason}
    </span>
  );
}
