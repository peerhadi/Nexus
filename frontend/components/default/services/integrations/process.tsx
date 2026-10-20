import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { process } from "./data";

export default function Process() {
  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[var(--surface-secondary)] opacity-60" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
              How we work
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Connected with intention.
            </h2>
            <p className="integration-muted mt-5 max-w-md text-sm leading-7 sm:text-base">
              Good integrations are more than a successful API request. They
              account for the whole journey: requirements, data, edge cases,
              security, and what happens after launch.
            </p>
            <Link
              href="/build"
              className="integration-button-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              Start a project <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[var(--card-border)] sm:left-[27px]" />
            <div className="space-y-5">
              {process.map((item, index) => (
                <article
                  key={item.step}
                  className="integration-card group relative rounded-3xl p-5 sm:p-7"
                >
                  <div className="flex gap-5 sm:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white sm:h-14 sm:w-14">
                      <item.icon size={21} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] integration-kicker">
                          Step {item.step}
                        </span>
                        {index === 0 && (
                          <span className="rounded-full border border-[var(--card-border)] px-2 py-1 text-[9px] integration-muted">
                            Foundation
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="integration-muted mt-3 text-sm leading-7">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100 sm:left-7 sm:right-7" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
