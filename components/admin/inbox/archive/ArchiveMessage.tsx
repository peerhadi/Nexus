import { Clock3, Mail } from "lucide-react";

import type { ArchiveItem } from "@/lib/inbox/archive-types";

type ArchiveMessageProps = {
  item: ArchiveItem;
};

export function ArchiveMessage({ item }: ArchiveMessageProps) {
  return (
    <div className="group relative mt-7 overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.035)]">
      <div className="absolute left-0 top-0 h-full w-[2px] bg-black/[0.08]" />

      <div className="flex min-h-[72px] items-center justify-between border-b border-black/[0.07] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-[#f7f7f5]">
            <Mail size={13} className="text-black/55" />
          </div>

          <div>
            <div className="text-[11px] font-bold">{item.name}</div>

            <div className="mt-0.5 text-[8px] text-black/30">{item.email}</div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-[8px] text-black/25">
          <Clock3 size={10} />
          {item.archived}
        </div>
      </div>

      <div className="min-h-[220px] px-6 py-8">
        <div className="mb-5 flex items-center gap-2">
          <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-black/25">
            Message
          </div>

          <div className="h-px w-10 bg-black/[0.08]" />
        </div>

        <p className="max-w-4xl whitespace-pre-line text-[13px] leading-7 tracking-[-0.005em] text-black/65">
          {item.message}
        </p>
      </div>
    </div>
  );
}
