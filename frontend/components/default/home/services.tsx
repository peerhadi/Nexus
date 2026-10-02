"use client";
import ServiceCard from "./service-card";
import { services } from "./data";

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-black/[0.08] px-5 py-28 sm:px-8 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-black/30">
              What we build
            </p>

            <h2 className="max-w-4xl text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.82] tracking-[-0.08em]">
              YOUR PROBLEM.
              <br />
              <span className="text-black/20">OUR PLAYGROUND.</span>
            </h2>
          </div>

          <p className="max-w-sm text-base leading-7 text-black/45">
            From one tiny annoyance to an entire internal platform, we like
            turning “someone should build this” into “oh, it's done.”
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
