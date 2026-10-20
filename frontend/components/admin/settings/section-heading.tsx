type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {eyebrow}
      </p>
      <h2 className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );
}
