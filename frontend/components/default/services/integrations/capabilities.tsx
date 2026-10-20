import { ArrowUpRight } from "lucide-react";
import { capabilities } from "./data";

export default function Capabilities() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
              What we build
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              The connective tissue behind better software.
            </h2>
          </div>
          <p className="integration-muted max-w-xl text-sm leading-7 lg:justify-self-end sm:text-base">
            Each connection is designed around what the systems need to
            exchange, how they behave under pressure, and how the result will
            be maintained.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {capabilities.map((item, index) => (
            <article
              key={item.number}
              className="integration-card group relative overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.14]" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] transition-transform duration-300 group-hover:rotate-[-7deg] group-hover:scale-110">
                    <item.icon size={21} className="integration-kicker" />
                  </div>
                  <span className="text-xs font-medium tracking-[0.15em] integration-muted">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="integration-muted mt-3 max-w-xl text-sm leading-7">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-[10px] font-medium integration-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 h-px w-full bg-[var(--card-border)]" />
                <div className="mt-4 flex items-center justify-between text-xs integration-muted">
                  <span>Designed for your requirements</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                  />
                </div>
              </div>
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full"
                style={{ transitionDelay: `${index * 20}ms` }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
