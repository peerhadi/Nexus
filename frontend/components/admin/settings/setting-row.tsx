import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export default function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[var(--border-subtle)] py-5 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-tertiary)] text-[var(--text-primary)]">
          <Icon size={16} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-semibold tracking-[-0.01em]">
            {title}
          </p>
          <p className="mt-0.5 text-[11px] leading-4 text-[var(--text-tertiary)]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}
