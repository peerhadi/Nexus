"use client";

import { WandSparkles } from "lucide-react";

export default function PlaygroundHeader({
  randomize,
}: {
  randomize: () => void;
}) {
  return (
    <header className="relative px-5 pb-8 pt-16 sm:px-8 sm:pb-12 sm:pt-24 lg:px-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-20 -top-32 h-[430px] w-[650px] rounded-full opacity-20 blur-[110px]"
          style={{ background: "var(--gradient-primary)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="playground-enter mb-8 flex items-center gap-3 mt-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-primary)]">
              NEXUS PLAYGROUND
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Interactive digital sculpture studio
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="playground-enter max-w-4xl">
            <h1 className="text-5xl font-bold leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[100px]">
              Make something
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                extraordinary.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
              Sculpt with light. Bend colour. Explore impossible forms. A
              little corner of the internet where you make the rules.
            </p>
          </div>

          <div className="playground-enter-delay flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 border border-[var(--pg-line)] bg-[var(--pg-muted)] px-4 py-3 text-xs text-[var(--text-secondary)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              Real Time 3D
            </span>
            <button
              type="button"
              onClick={randomize}
              className="flex items-center gap-2 px-4 py-3 text-xs font-semibold text-white transition hover:brightness-110"
              style={{ background: "var(--gradient-primary)" }}
            >
              <WandSparkles size={15} />
              Surprise me
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
