import { Gauge, LockKeyhole } from "lucide-react";
import { principles } from "./data";
import SectionHeading from "./section-heading";

export default function Details() {
  return (
    <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="THE DETAILS MATTER"
          title="A strong website needs more than a polished first screen."
          description="The experience should remain clear, usable, and maintainable after visitors move beyond the hero section."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.title}
                className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 text-base font-semibold text-[var(--text-primary)]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {principle.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <LockKeyhole size={20} className="text-[var(--accent)]" />
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Functionality with appropriate safeguards
              </h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Data collection, forms, accounts, and external integrations need
              protections that match their purpose. The requirements should be
              established before implementation.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Gauge size={20} className="text-[var(--accent)]" />
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                A considered technical foundation
              </h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Structure, dependencies, assets, and rendering decisions should
              suit the website's actual needs and leave room for sensible
              future changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
