import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "./data";
import FeatureCard from "./feature-card";
import SectionHeading from "./section-heading";

export default function WhatWeBuild() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <SectionHeading
        eyebrow="What we build"
        title="Applications made for real work."
        description="Different challenges call for different tools. The right application starts with what its users need to accomplish."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <FeatureCard key={service.number} {...service} />
        ))}
      </div>

      <div className="mt-7 flex flex-col justify-between gap-5 rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="max-w-2xl">
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            Have an idea that doesn't fit neatly into a category?
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            We can define the requirements and shape the right solution around
            your use case.
          </p>
        </div>
        <Link
          href="/build"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition hover:text-[var(--accent)]"
        >
          Start a project
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
