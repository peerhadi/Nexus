import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Database,
  Globe,
  Link2,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function FinalCta() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="integration-card relative overflow-hidden rounded-[32px] p-7 sm:rounded-[40px] sm:p-12 lg:p-16">
          <div className="integration-glow -right-16 -top-24 h-64 w-64 bg-[var(--accent)]" />
          <div className="integration-glow -bottom-28 left-[35%] h-56 w-56 bg-teal-400" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-2 text-xs integration-muted">
                <Sparkles size={14} className="integration-kicker" />
                YOUR STACK, WORKING TOGETHER
              </div>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Make your existing tools work harder.
              </h2>
              <p className="integration-muted mt-5 max-w-xl text-sm leading-7 sm:text-base">
                Tell us what you use, what feels disconnected, and what you
                want to happen automatically. We can work out the right
                integration approach together.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/build"
                  className="integration-button-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Start a project <ArrowUpRight size={17} />
                </Link>
                <Link
                  href="/services"
                  className="integration-button-secondary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  All services <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-0 scale-75 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-3">
                {[
                  { icon: Globe, title: "Your website", color: "#7c8cff" },
                  { icon: Cloud, title: "Cloud services", color: "#43c9b6" },
                  { icon: Database, title: "Your data", color: "#f4a76b" },
                  {
                    icon: MessageSquare,
                    title: "Your team",
                    color: "#d78af4",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className={`integration-card integration-node rounded-2xl p-4 ${
                      index === 1 || index === 2
                        ? "integration-float-delay"
                        : "integration-float"
                    }`}
                  >
                    <div
                      className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-white"
                      style={{ background: item.color }}
                    >
                      <item.icon size={20} />
                    </div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="integration-muted mt-1 text-[10px]">
                      Connected layer
                    </p>
                  </div>
                ))}
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-xl">
                <Link2 size={20} className="integration-kicker" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
