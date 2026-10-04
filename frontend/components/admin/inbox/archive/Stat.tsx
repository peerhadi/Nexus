import type { ReactNode } from "react";

type StatProps = {
  label: string;
  value: string;
  icon: ReactNode;
};

export function Stat({ label, value, icon }: StatProps) {
  return (
    <div className="group flex items-center justify-between border-r border-[var(--border)] px-5 last:border-r-0">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--surface-secondary)] text-[var(--text-muted)] transition-all group-hover:bg-[var(--surface-hover)] group-hover:text-[var(--text-secondary)]">
          {icon}
        </div>

        <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {label}
        </span>
      </div>

      <span className="text-[16px] font-bold tracking-[-0.04em]">{value}</span>
    </div>
  );
}
