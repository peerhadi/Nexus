import { automationServices } from "./data";

export default function AutomationCard({
  service,
}: {
  service: (typeof automationServices)[number];
}) {
  const Icon = service.icon;

  return (
    <article className="automation-service-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition duration-300 hover:-translate-y-1.5 sm:p-7">
      <div className={`service-card-glow ${service.glow}`} />
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div className="automation-service-icon flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--surface-secondary)] transition duration-300">
          <Icon size={21} strokeWidth={1.7} />
        </div>
        <span className="text-xs tracking-widest text-[var(--text-secondary)]">
          {service.number}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-secondary)]">
          {service.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {service.examples.map((example) => (
            <span
              key={example}
              className="rounded-full border border-[var(--card-border)] px-2.5 py-1.5 text-[10px] text-[var(--text-secondary)]"
            >
              {example}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
