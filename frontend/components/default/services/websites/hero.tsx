import Link from "next/link";
import { ArrowRight, ArrowUpRight, Zap } from "lucide-react";
import FloatingScene from "./floating-scene";

export default function Hero() {
  return (
    <section className="relative isolate border-b border-[var(--card-border)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, var(--selection), transparent 45%), radial-gradient(ellipse at 10% 80%, var(--surface-secondary), transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[800px] max-w-7xl items-center gap-5 px-5 py-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12 lg:py-20">
        <div className="relative z-10 py-10 lg:py-16">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)]">
            <Zap size={14} className="text-[var(--accent)]" />
            WEBSITE DEVELOPMENT
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
            Make your
            <span className="mt-2 block text-[var(--accent)]">
              online presence count.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            A great website does more than look good. It explains what you do,
            helps people find what they need, and gives them a clear reason to
            take the next step. We build considered digital experiences around
            your goals.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/build"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold !text-white transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[var(--surface-secondary)] text-[var(--text-primary)]"
            >
              All services
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--card-border)] pt-6">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Designed around people
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                Clear, thoughtful experiences
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Built for real use
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                Functionality with a purpose
              </p>
            </div>
          </div>
        </div>

        <FloatingScene
          variant="hero"
          className="min-h-[460px] sm:min-h-[600px]"
        />
      </div>
    </section>
  );
}
