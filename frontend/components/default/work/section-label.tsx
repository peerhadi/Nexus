export default function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)]">
        {number}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
        {children}
      </span>
      <div className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}
