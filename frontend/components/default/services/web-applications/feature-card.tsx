import { Code2 } from "lucide-react";

export default function FeatureCard({
  icon: Icon,
  number,
  title,
  description,
  tags,
}: {
  icon: typeof Code2;
  number: string;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] sm:p-7">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--surface-secondary)] transition-colors group-hover:border-[var(--accent)]">
          <Icon size={21} strokeWidth={1.7} />
        </div>
        <span className="text-xs font-medium tracking-widest text-[var(--text-secondary)]">
          {number}
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-secondary)]">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--card-border)] px-2.5 py-1.5 text-[10px] text-[var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
