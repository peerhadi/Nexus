import { UserRound } from "lucide-react";

import type { ArchiveItem } from "@/lib/inbox/archive-types";

import { ArchiveMessage } from "./ArchiveMessage";
import { ArchiveState } from "./ArchiveState";
import { MetaPill } from "./MetaPill";
import { StatusBadge } from "./StatusBadge";

type ArchiveDetailProps = {
  item: ArchiveItem;
};

export function ArchiveDetail({ item }: ArchiveDetailProps) {
  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="relative flex h-[74px] shrink-0 items-center justify-between overflow-hidden border-b border-black/[0.08] bg-white px-5 sm:px-7">
        <div className="pointer-events-none absolute -right-16 -top-24 h-44 w-44 rounded-full border-[30px] border-black/[0.018]" />

        <div className="relative flex min-w-0 items-center gap-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-[#f7f7f5] shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
            <UserRound size={13} />

            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-black" />
          </div>

          <div className="min-w-0">
            <div className="truncate text-[12px] font-bold tracking-[-0.01em]">
              {item.name}
            </div>

            <div className="mt-0.5 truncate text-[9px] text-black/35">
              {item.email}
            </div>
          </div>
        </div>

        <div className="relative flex shrink-0 items-center gap-2">
          <span className="hidden rounded-lg border border-black/[0.07] bg-[#f7f7f5] px-2.5 py-1.5 text-[8px] font-bold text-black/35 sm:block">
            {item.id}
          </span>

          <StatusBadge reason={item.reason} />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="w-full px-5 py-7 sm:px-8">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />

              <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-black/30">
                Archived conversation
              </div>
            </div>

            <h2 className="max-w-3xl text-[24px] font-bold leading-[1.05] tracking-[-0.05em]">
              {item.subject}
            </h2>

            <div className="mt-2 text-[9px] text-black/30">
              Archived {item.archived}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <MetaPill label="Type" value={item.type} />
            <MetaPill label="Status" value={item.reason} />
            <MetaPill label="Archive ID" value={item.id} />
            <MetaPill label="Archived" value={item.archived} />
          </div>

          <ArchiveMessage item={item} />

          <ArchiveState reason={item.reason} />

          <div className="h-8" />
        </div>
      </div>
    </section>
  );
}
