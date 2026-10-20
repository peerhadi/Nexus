import { Code2 } from "lucide-react";

export default function PrincipleCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Code2;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 border-b border-[var(--card-border)] py-6 last:border-b-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
        <Icon size={18} />
      </div>
      <div>
        <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
}
