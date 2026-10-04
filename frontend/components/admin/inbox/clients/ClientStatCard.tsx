import type { LucideIcon } from "lucide-react";

type ClientStatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
};

export function ClientStatCard({
  label,
  value,
  icon: Icon,
}: ClientStatCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          {label}
        </span>

        <Icon size={14} className="text-[var(--text-muted)]" />
      </div>

      <div className="mt-3 text-[22px] font-bold tracking-[-0.05em]">
        {value}
      </div>
    </div>
  );
}
