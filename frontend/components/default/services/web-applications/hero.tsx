import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import OrbitalInterface from "./orbital-interface";
import ServiceLink from "./service-link";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            Nexus / Web applications
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.055em] text-[var(--text-primary)] sm:text-6xl lg:text-[4.5rem]">
            Software that works the way{" "}
            <span className="relative inline-block">
              <span className="relative z-10">you do.</span>
              <span className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-full bg-[var(--selection)] sm:bottom-2 sm:h-4" />
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            Go beyond a website. Build a connected digital experience with
            useful features, reliable data, and workflows designed around the
            people who use it.
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

          <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-[var(--card-border)] pt-6">
            {[
              { value: "01", label: "Purpose-built" },
              { value: "02", label: "Connected systems" },
              { value: "03", label: "Ready to evolve" },
            ].map((item) => (
              <div key={item.value} className="pr-3">
                <p className="text-xs font-semibold tracking-widest text-[var(--accent)]">
                  {item.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)] sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-2">
          <OrbitalInterface />
        </div>
      </div>

      <div className="mt-16 flex items-center gap-3 text-xs text-[var(--text-secondary)] sm:mt-20">
        <ArrowDown size={15} />
        <span>Explore what your application could become</span>
        <span className="h-px flex-1 bg-[var(--card-border)]" />
      </div>
    </section>
  );
}
