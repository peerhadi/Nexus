export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <div className="automation-eyebrow mb-5 inline-flex items-center gap-2.5 rounded-full border border-[var(--card-border)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        <span className="automation-pulse h-2 w-2 rounded-full bg-[var(--accent)]" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}
