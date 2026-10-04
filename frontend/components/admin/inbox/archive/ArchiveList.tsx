import { Archive } from "lucide-react";

import type { Conversation } from "@/lib/inbox/inbox-types";

import { ArchiveListItem } from "./ArchiveListItem";

type ArchiveListProps = {
  items: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ArchiveList({ items, selectedId, onSelect }: ArchiveListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center px-5 py-14 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Archive size={14} className="text-[var(--text-muted)]" />
        </div>

        <div className="mt-3 text-[9px] font-bold text-[var(--text-tertiary)]">
          Nothing found
        </div>

        <div className="mt-1.5 max-w-[190px] text-[8px] leading-4 text-[var(--text-muted)]">
          Try another search or change the archive filter.
        </div>
      </div>
    );
  }

  return (
    <>
      {items.map((item, index) => (
        <ArchiveListItem
          key={item.id}
          item={item}
          index={index}
          active={item.id === selectedId}
          onSelect={() => onSelect(item.id)}
        />
      ))}
    </>
  );
}
