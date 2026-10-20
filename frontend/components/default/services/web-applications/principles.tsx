import { ArrowRight, Network } from "lucide-react";
import { principles } from "./data";
import PrincipleCard from "./principle-card";
import SectionHeading from "./section-heading";

export default function Principles() {
  return (
    <section className="bg-[var(--surface-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            eyebrow="Built with intention"
            title="The experience is only half the system."
            description="A polished interface matters. So does everything behind it: the data, permissions, performance, and structure that make it dependable."
          />
          <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                <Network size={19} />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  One connected system
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Interface · Logic · Data
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {["UI", "API", "DB"].map((label, index) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <div className="flex h-10 flex-1 items-center justify-center rounded-lg border border-[var(--card-border)] text-xs font-semibold">
                    {label}
                  </div>
                  {index < 2 && (
                    <ArrowRight
                      size={13}
                      className="shrink-0 text-[var(--text-secondary)]"
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-6 text-[var(--text-secondary)]">
              The architecture depends on the project. The goal is to keep the
              parts understandable, connected, and maintainable.
            </p>
          </div>
        </div>

        <div className="divide-y divide-[var(--card-border)]">
          {principles.map((principle) => (
            <PrincipleCard key={principle.title} {...principle} />
          ))}
        </div>
      </div>
    </section>
  );
}
