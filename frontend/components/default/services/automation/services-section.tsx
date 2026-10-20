import AutomationCard from "./automation-card";
import { automationServices } from "./data";
import SectionHeading from "./section-heading";

export default function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <SectionHeading
        eyebrow="What we automate"
        title="Small steps. Connected systems."
        description="From individual recurring tasks to multi-step processes, the goal is to reduce unnecessary effort without losing control or visibility."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {automationServices.map((service) => (
          <AutomationCard key={service.number} service={service} />
        ))}
      </div>
    </section>
  );
}
