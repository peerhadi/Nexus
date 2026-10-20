import { ArrowRight, ArrowUpRight, Zap } from "lucide-react";
import ServiceLink from "./service-link";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-secondary)] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-[var(--card-border)]" />
        <div className="pointer-events-none absolute -right-2 -top-6 h-44 w-44 rounded-full border border-[var(--card-border)]" />
        <div className="pointer-events-none absolute bottom-[-100px] left-[35%] h-48 w-48 rounded-full bg-[var(--accent)] opacity-[0.06] blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
            <Zap size={21} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Your idea, engineered
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
            Ready to build something people can actually use?
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
            Start with the challenge you want to solve. We can work from there
            to define the features, structure, and a realistic plan for your
            application.
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
