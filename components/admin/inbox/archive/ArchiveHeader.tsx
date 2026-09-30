import { Archive } from "lucide-react";

type ArchiveHeaderProps = {
  count: number;
};

export function ArchiveHeader({ count }: ArchiveHeaderProps) {
  return (
    <header className="relative flex h-[74px] shrink-0 items-center justify-between overflow-hidden border-b border-black/[0.08] bg-white px-5 sm:px-8">
      <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full border-[24px] border-black/[0.025]" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-black" />

          <div className="text-[8px] font-bold uppercase tracking-[0.18em] text-black/30">
            Inbox / History
          </div>
        </div>

        <h1 className="mt-1 text-[21px] font-bold tracking-[-0.045em]">
          Archive
        </h1>
      </div>

      <div className="relative flex items-center gap-2">
        <div className="hidden text-[8px] font-semibold uppercase tracking-[0.12em] text-black/20 sm:block">
          Closed conversations
        </div>

        <div className="flex h-8 items-center gap-2 rounded-xl border border-black/[0.08] bg-[#f7f7f5] px-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <Archive size={11} className="text-black/50" />

          <span className="text-[9px] font-bold text-black/60">{count}</span>
        </div>
      </div>
    </header>
  );
}
