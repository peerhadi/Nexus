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
    <div className="rounded-2xl border border-black/[0.08] bg-white px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/30">
          {label}
        </span>

        <Icon size={14} className="text-black/25" />
      </div>

      <div className="mt-3 text-[22px] font-bold tracking-[-0.05em]">
        {value}
      </div>
    </div>
  );
}
