"use client";

export default function BuildHero() {
  return (
    <section className="hidden lg:block">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-[var(--text-tertiary)] shadow-sm backdrop-blur-xl">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        Let's build
      </div>

      <h1 className="text-[64px] font-black leading-[0.92] tracking-[-0.065em]">
        Tell us
        <br />
        what you're
        <br />
        <span className="bg-[linear-gradient(90deg,#ff0080,#ff7a00,#ffd600,#00c853,#00b8ff,#7c3aed)] bg-clip-text text-transparent">
          thinking.
        </span>
      </h1>

      <p className="mt-7 max-w-[390px] text-sm leading-7 text-[var(--text-tertiary)]">
        Have a workflow that needs fixing? An idea that needs building?
        Something weird you want automated?
        <span className="font-bold text-[var(--text-primary)]"> Tell us everything.</span>
      </p>

      <div className="mt-9 flex flex-wrap gap-2">
        {[
          "Automation",
          "Apps",
          "AI workflows",
          "Integrations",
          "Something weird",
        ].map((item, index) => (
          <div
            key={item}
            className="animate-[chip_4s_ease-in-out_infinite] rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-[9px] font-bold text-[var(--text-tertiary)] shadow-sm backdrop-blur-xl"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
