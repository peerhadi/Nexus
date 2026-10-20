import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import AutomationHeroVisual from "./hero-visual";
import ServiceLink from "./service-link";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)]">
            <Sparkles size={14} className="text-[var(--accent)]" />
            Nexus / Business automation
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-0.06em] sm:text-6xl lg:text-[4.65rem]">
            Less busywork.
            <br />
            <span className="automation-heading-glow">More momentum.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            Connect your tools, streamline repetitive processes, and give your
            team more room to focus on the work that actually matters.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ServiceLink href="/build">
              Start a project
              <ArrowUpRight size={16} />
            </ServiceLink>
            <ServiceLink href="/services" secondary>
              All services
              <ArrowRight size={16} />
            </ServiceLink>
          </div>

          <div className="mt-11 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--card-border)] pt-6">
            {[
              "Connect existing tools",
              "Reduce repetitive steps",
              "Keep people in control",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
              >
                <CheckCircle2 size={15} className="text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <AutomationHeroVisual />
      </div>

      <div className="mt-16 flex items-center gap-3 text-xs text-[var(--text-secondary)] sm:mt-20">
        <ArrowDown size={15} />
        <span>Explore what you could simplify</span>
        <span className="h-px flex-1 bg-[var(--card-border)]" />
      </div>
    </section>
  );
}
