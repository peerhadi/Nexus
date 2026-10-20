"use client";

export default function SectionLabel({
  index,
  title,
  detail,
}: {
  index: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] font-semibold text-[var(--accent)]">
          {index}
        </span>
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {title}
        </h3>
      </div>
      {detail && (
        <span className="text-[10px] text-[var(--text-secondary)]">
          {detail}
        </span>
      )}
    </div>
  );
}
