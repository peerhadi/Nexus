export default function Marquee() {
  return (
    <section className="border-y border-[var(--card-border)] py-5">
      <div className="overflow-hidden">
        <div className="integration-marquee flex items-center gap-8 sm:gap-12">
          {[0, 1].map((repeat) => (
            <div key={repeat} className="flex items-center gap-8 sm:gap-12">
              {[
                "REST APIs",
                "Webhooks",
                "Data pipelines",
                "Custom workflows",
                "Authentication",
                "Third-party services",
                "Event handling",
                "System synchronisation",
              ].map((label) => (
                <span
                  key={`${repeat}-${label}`}
                  className="flex items-center gap-3 whitespace-nowrap text-xs font-medium tracking-wide integration-muted sm:text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
