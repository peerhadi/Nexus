import { Archive, Check, X } from "lucide-react";

import type { ArchiveReason } from "@/lib/inbox/archive-types";

type ArchiveStateProps = {
  reason: ArchiveReason;
};

export function ArchiveState({ reason }: ArchiveStateProps) {
  const content = {
    Completed: {
      icon: <Check size={13} />,
      title: "Project completed",
    },
    Declined: {
      icon: <X size={13} />,
      title: "Request declined",
    },
    Closed: {
      icon: <Archive size={13} />,
      title: "Conversation closed",
    },
  }[reason];

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.08] bg-[#f7f7f5] shadow-[0_2px_10px_rgba(0,0,0,0.025)]">
      <div className="flex items-center gap-4 p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.07] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          {content.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold">{content.title}</div>

          <div className="mt-1 text-[9px] leading-4 text-black/35">
            This conversation is archived and won't appear in the active inbox.
          </div>
        </div>

        <div className="hidden h-7 items-center rounded-lg border border-black/[0.07] bg-white px-2.5 text-[7px] font-bold uppercase tracking-[0.1em] text-black/30 sm:flex">
          Read only
        </div>
      </div>
    </div>
  );
}
