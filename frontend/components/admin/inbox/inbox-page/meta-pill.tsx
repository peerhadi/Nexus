type MetaPillProps = {
  label: string;
  value: string;
};

export default function MetaPill({ label, value }: MetaPillProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
      <div className="text-[7px] font-bold uppercase tracking-[0.13em] text-[var(--text-muted)]">
        {label}
      </div>

      <div className="mt-0.5 text-[9px] font-bold text-[var(--text-secondary)]">{value}</div>
    </div>
  );
}
