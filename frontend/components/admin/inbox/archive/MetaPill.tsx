type MetaPillProps = {
  label: string;
  value: string;
};

export function MetaPill({ label, value }: MetaPillProps) {
  return (
    <div className="group min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.045)]">
      <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {label}
      </div>

      <div className="mt-1 truncate text-[9px] font-bold text-[var(--text-secondary)]">
        {value}
      </div>
    </div>
  );
}
