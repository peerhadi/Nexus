"use client";

import { useReducedMotion } from "framer-motion";
import { services } from "./data";
import ServiceCard from "./service-card";

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative scroll-mt-20 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col justify-between gap-5 border-b border-[var(--card-border)] pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              01 / What we do
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.07em] sm:text-6xl lg:text-7xl">
              Pick your starting point.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Each service has its own approach. Some projects need one. Others
            combine several into a single solution.
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
