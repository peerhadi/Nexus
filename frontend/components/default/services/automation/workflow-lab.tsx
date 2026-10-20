import SectionHeading from "./section-heading";
import WorkflowPlayground from "./workflow-playground";

export default function WorkflowLab() {
  return (
    <section className="automation-band relative overflow-hidden border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="automation-band-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <SectionHeading
          eyebrow="Interactive workflow lab"
          title="Explore a workflow in action."
          description="Choose a scenario and preview how its steps connect. This is a conceptual demonstration, not a live integration with your accounts or services."
        />

        <div className="mt-10">
          <WorkflowPlayground />
        </div>
      </div>
    </section>
  );
}
