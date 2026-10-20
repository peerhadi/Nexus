import { Code2 } from "lucide-react";

export default function FlowNode({
  icon: Icon,
  label,
  detail,
}: {
  icon: typeof Code2;
  label: string;
  detail: string;
}) {
  return (
    <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-center sm:p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
        <Icon size={19} />
      </div>
      <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </p>
      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
        {detail}
      </p>
    </div>
  );
}
