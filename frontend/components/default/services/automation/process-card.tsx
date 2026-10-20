import { processStages } from "./data";

export default function ProcessCard({ stage }: { stage: (typeof processStages)[number] }) {
  return (
    <article className="automation-process-card group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition duration-300 hover:-translate-y-1 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-[var(--accent)]">
          {stage.number}
        </span>
      </div>
      <h3 className="mt-7 text-lg font-semibold">{stage.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
        {stage.description}
      </p>
      <div className="mt-6 rounded-lg border border-[var(--card-border)] bg-[var(--surface-secondary)] p-3">
        <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
          Deliverable
        </p>
        <p className="mt-1.5 text-xs font-semibold">{stage.deliverable}</p>
      </div>
    </article>
  );
}
