import type { LucideIcon } from "lucide-react";

type SettingRowProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: SettingRowProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-[var(--border-subtle)] py-4 first:border-t-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]">
          <Icon size={15} className="text-[var(--text-secondary)]" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            {title}
          </p>
          <p className="mt-1 max-w-lg text-[11px] leading-5 text-[var(--text-muted)]">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0 sm:pl-5">{children}</div>
    </div>
  );
}
