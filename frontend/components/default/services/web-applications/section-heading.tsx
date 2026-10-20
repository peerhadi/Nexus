export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}
