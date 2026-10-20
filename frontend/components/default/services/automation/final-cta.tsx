import { ArrowRight, ArrowUpRight, Zap } from "lucide-react";
import ServiceLink from "./service-link";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
      <div className="automation-final-cta relative overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-secondary)] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="automation-cta-glow pointer-events-none absolute inset-0" />

        <div className="automation-cta-orbit pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[var(--card-border)]" />
        <div className="automation-cta-orbit cta-orbit-two pointer-events-none absolute -right-2 -top-10 h-48 w-48 rounded-full border border-[var(--card-border)]" />

        <div className="relative z-10 max-w-3xl">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
            <Zap size={22} className="text-[var(--accent)]" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Make room for better work
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
            What could your team stop doing manually?
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
            Tell us about a repetitive task, a disconnected tool, or a process
            that takes more effort than it should. We can define a practical
            automation approach around it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ServiceLink href="/build">
              Start a project
              <ArrowUpRight size={16} />
            </ServiceLink>
            <ServiceLink href="/services" secondary>
              All services
              <ArrowRight size={16} />
            </ServiceLink>
          </div>
        </div>
      </div>
    </section>
  );
}
