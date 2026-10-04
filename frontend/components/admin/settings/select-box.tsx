import type { ReactNode } from "react";

export default function SelectBox({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-[11px] font-medium outline-none transition focus:border-[var(--border-focus)]"
    >
      {children}
    </select>
  );
}
