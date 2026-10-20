import { Sparkles } from "lucide-react";

export default function BiggerPicture() {
  return (
    <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            The bigger picture
          </p>
          <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
            Your idea deserves more than disconnected screens.
          </h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
          <p>
            A useful web application is a system, not just an interface.
            People need to move between tasks, information needs to stay
            consistent, and important actions need to behave predictably.
          </p>
          <p>
            Nexus helps bring those pieces together—from the user experience
            and application logic to data storage and external services—so the
            result serves a real purpose instead of adding another layer of
            complexity.
          </p>
          <div className="flex items-start gap-3 border-l-2 border-[var(--accent)] pl-4 pt-1">
            <Sparkles
              size={18}
              className="mt-1 shrink-0 text-[var(--accent)]"
            />
            <p className="font-medium text-[var(--text-primary)]">
              Start with the problem. Build only the features that help solve
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
