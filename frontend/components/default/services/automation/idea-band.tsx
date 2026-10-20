export default function IdeaBand() {
  return (
    <section className="automation-band relative overflow-hidden border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="automation-band-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            The idea
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
            Let systems handle the repeatable stuff.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
          Many processes follow a recognizable pattern: something happens, a
          set of rules is checked, and one or more actions follow. Automation
          makes those steps consistent and repeatable. It can also preserve
          manual review when a decision needs human judgment.
        </p>
      </div>
    </section>
  );
}
