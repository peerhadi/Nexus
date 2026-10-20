import { Check } from "lucide-react";
import { services } from "./data";

export default function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const Icon = service.icon;

  return (
      <article
        key={service.number}
        className="group rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
            <Icon size={21} strokeWidth={1.6} />
          </div>
          <span className="text-xs text-[var(--text-secondary)]">
            {service.number}
          </span>
        </div>

        <h3 className="mt-7 text-lg font-semibold text-[var(--text-primary)]">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          {service.description}
        </p>

        <div className="mt-6 border-t border-[var(--card-border)] pt-5">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            Possible features
          </p>
          <ul className="space-y-2.5">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-xs leading-5 text-[var(--text-secondary)]"
              >
                <Check
                  size={14}
                  className="mt-0.5 shrink-0 text-[var(--accent)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </article>
  );
}
