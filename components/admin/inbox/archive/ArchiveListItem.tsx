import { ChevronRight, UserRound } from "lucide-react";

import type { ArchiveItem } from "@/lib/inbox/archive-types";

type ArchiveListItemProps = {
  item: ArchiveItem;
  index: number;
  active: boolean;
  onSelect: () => void;
};

export function ArchiveListItem({
  item,
  index,
  active,
  onSelect,
}: ArchiveListItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full border-b border-black/[0.055] px-4 py-4 text-left transition-all duration-200 ${
        active
          ? "bg-[#f7f7f5] shadow-[inset_3px_0_0_#111]"
          : "bg-white hover:bg-[#f7f7f5]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
            active
              ? "border-black/[0.09] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
              : "border-black/[0.05] bg-[#f7f7f5] group-hover:bg-white"
          }`}
        >
          <UserRound
            size={12}
            className={`transition-transform duration-200 ${
              active ? "text-black" : "text-black/35 group-hover:text-black/60"
            }`}
          />

          {active && (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-white bg-black" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-[10px] font-bold tracking-[-0.01em]">
                {item.name}
              </div>

              <div className="mt-0.5 truncate text-[8px] text-black/30">
                {item.email}
              </div>
            </div>

            <span className="shrink-0 pt-0.5 text-[7px] font-medium text-black/22">
              {item.archived}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="truncate text-[9px] font-semibold text-black/70">
              {item.subject}
            </div>

            <ChevronRight
              size={10}
              className={`shrink-0 transition-all duration-200 ${
                active
                  ? "translate-x-0 text-black/40"
                  : "-translate-x-1 text-black/0 group-hover:translate-x-0 group-hover:text-black/25"
              }`}
            />
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <span className="rounded-md border border-black/[0.06] bg-black/[0.035] px-1.5 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-black/40">
              {item.type}
            </span>

            <span className="h-1 w-1 rounded-full bg-black/15" />

            <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-black/30">
              {item.reason}
            </span>
          </div>
        </div>
      </div>

      <span className="absolute bottom-3 right-4 text-[6px] font-bold text-black/[0.12]">
        0{index + 1}
      </span>
    </button>
  );
}
