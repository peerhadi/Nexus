type InfoCardProps = {
  label: string;
  value: number | string;
  small?: boolean;
};

export function InfoCard({ label, value, small = false }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3">
      <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {label}
      </div>

      <div
        className={`mt-1.5 font-bold ${
          small ? "truncate text-[10px]" : "text-[17px] tracking-[-0.03em]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
