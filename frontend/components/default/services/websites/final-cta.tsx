import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import FloatingScene from "./floating-scene";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--card)]">
        <div className="absolute inset-y-0 right-0 hidden w-[44%] md:block">
          <FloatingScene variant="wide" className="h-full w-full" />
        </div>

        <div
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--accent), transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
            <Sparkles size={22} />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            YOUR NEXT STEP
          </p>

          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-[var(--text-primary)] sm:text-5xl">
            Let's build something worth visiting.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            Tell us what you are building, who it is for, and what you want
            the website to accomplish. We can define the requirements and
            agree on a sensible scope before work begins.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/build"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold !text-white transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--surface-secondary)] px-6 py-3 text-sm font-semibold !text-white transition-colors hover:bg-[var(--surface)]"
            >
              All services
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[var(--card-border)] pt-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
            NEXT SERVICE
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
            Web Applications
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Custom interactive products and application experiences.
          </p>
        </div>

        <Link
          href="/services/web-applications"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
        >
          Explore web applications
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
