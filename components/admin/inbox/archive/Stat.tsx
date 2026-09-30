import type { ReactNode } from "react";

type StatProps = {
  label: string;
  value: string;
  icon: ReactNode;
};

export function Stat({ label, value, icon }: StatProps) {
  return (
    <div className="group flex items-center justify-between border-r border-black/[0.07] px-5 last:border-r-0">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#f7f7f5] text-black/35 transition-all group-hover:bg-black/[0.06] group-hover:text-black/60">
          {icon}
        </div>

        <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/25">
          {label}
        </span>
      </div>

      <span className="text-[16px] font-bold tracking-[-0.04em]">{value}</span>
    </div>
  );
}
