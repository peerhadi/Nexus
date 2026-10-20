import { ArrowRightLeft, GitBranch, LockKeyhole } from "lucide-react";

export default function BiggerPicture() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="integration-kicker mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
              The bigger picture
            </p>
            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Stop managing the gaps between your tools.
            </h2>
          </div>
          <p className="integration-muted max-w-2xl text-base leading-8 lg:justify-self-end">
            Disconnected systems create duplicate work, inconsistent
            information, and missed opportunities. We build the connective
            layer that lets your existing tools behave like parts of one
            considered system — without forcing you to replace everything you
            already use.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ArrowRightLeft,
              title: "Information moves",
              text: "Send the right data to the right place when an event happens, instead of relying on someone to move it manually.",
            },
            {
              icon: GitBranch,
              title: "Actions follow events",
              text: "Use triggers and rules to turn a form submission, payment event, or data update into the next useful action.",
            },
            {
              icon: LockKeyhole,
              title: "Connections stay considered",
              text: "Build around access boundaries, validation, failure handling, and the actual requirements of each connection.",
            },
          ].map((item, index) => (
            <article
              key={item.title}
              className="integration-card integration-float relative overflow-hidden rounded-3xl p-6 sm:p-7"
              style={{ animationDelay: `${index * -1.7}s` }}
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--accent)] opacity-[0.07] blur-2xl" />
              <div className="relative">
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)]">
                  <item.icon size={21} className="integration-kicker" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="integration-muted mt-3 text-sm leading-7">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
