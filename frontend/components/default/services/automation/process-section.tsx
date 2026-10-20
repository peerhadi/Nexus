import ProcessCard from "./process-card";
import { processStages } from "./data";
import SectionHeading from "./section-heading";

export default function ProcessSection() {
  return (
    <section className="automation-band relative overflow-hidden border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="automation-band-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <SectionHeading
          eyebrow="How we work"
          title="From a repetitive task to a reliable process."
          description="The workflow is mapped and understood before it is automated. That keeps implementation grounded in the real process rather than guesswork."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {processStages.map((stage) => (
            <ProcessCard key={stage.number} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}
