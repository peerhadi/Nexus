import { services } from "./data";
import SectionHeading from "./section-heading";
import ServiceCard from "./service-card";

export default function WhatWeBuild() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <SectionHeading
        eyebrow="WHAT WE CAN BUILD"
        title="Different websites. Different goals."
        description="From a focused landing page to a more involved digital experience, the right solution depends on what you need the website to accomplish."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
      </div>
    </section>
  );
}
