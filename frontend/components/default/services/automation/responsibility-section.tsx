import {
  Activity,
  Check,
  MousePointer2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "./section-heading";

export default function ResponsibilitySection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            eyebrow="Designed responsibly"
            title="Automation should be dependable, not mysterious."
            description="A workflow is only useful when people can understand what it does, trust its boundaries, and recover when something goes wrong."
          />

          <div className="automation-control-panel mt-8 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)]">
            <div className="flex items-center justify-between border-b border-[var(--card-border)] px-5 py-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-[var(--accent)]" />
                <span className="text-sm font-semibold">
                  Workflow safeguards
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-secondary)]">
                Design principles
              </span>
            </div>

            <div className="space-y-4 p-5">
              {[
                "Validate inputs before processing",
                "Log important events and errors",
                "Prevent unintended duplicate actions",
                "Allow human review when needed",
              ].map((item, index) => (
                <div
                  key={item}
                  className="automation-safeguard flex items-center gap-3"
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface-secondary)]">
                    <Check size={14} className="text-[var(--accent)]" />
                  </div>
                  <p className="text-xs leading-5 text-[var(--text-secondary)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {[
            {
              icon: ShieldCheck,
              title: "Appropriate permissions",
              description:
                "Connections should have the access they actually need, with sensitive credentials handled securely.",
            },
            {
              icon: Activity,
              title: "Visible outcomes",
              description:
                "Important actions and failures should be observable so that issues can be identified and investigated.",
            },
            {
              icon: RefreshCw,
              title: "Thoughtful recovery",
              description:
                "Retries and recovery paths should account for partial failures and avoid unintentionally repeating actions.",
            },
            {
              icon: MousePointer2,
              title: "Human oversight",
              description:
                "High-impact or ambiguous decisions can be routed to a person instead of being automated blindly.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="automation-principle flex gap-5 border-b border-[var(--card-border)] py-7 last:border-b-0"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--surface-secondary)]">
                  <Icon size={19} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
