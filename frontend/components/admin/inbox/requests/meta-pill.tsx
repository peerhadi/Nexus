type MetaPillProps = {
  label: string;
  value: string;
};

export function MetaPill({ label, value }: MetaPillProps) {
  return (
    <div className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
      <div className="text-[7px] font-bold uppercase tracking-[0.13em] text-[var(--text-muted)]">
        {label}
      </div>

      <div className="mt-0.5 truncate text-[9px] font-bold text-[var(--text-secondary)]">
        {value}
      </div>
    </div>
  );
}
