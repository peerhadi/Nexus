"use client";

import {
  ChevronRight,
  Download,
  Lightbulb,
  RotateCcw,
  Shuffle,
} from "lucide-react";

export default function CreativeControls({
  randomize,
  reset,
  onExport,
}: {
  randomize: () => void;
  reset: () => void;
  onExport: () => void;
}) {
  return (
    <div className="border-t border-[var(--pg-line)] pt-5">
      <div className="mb-3 flex items-center gap-2">
        <Lightbulb size={15} className="text-[var(--accent)]" />
        <span className="text-xs font-semibold">Creative controls</span>
      </div>

      <button
        type="button"
        onClick={randomize}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-xs font-semibold text-white transition hover:brightness-110"
        style={{ background: "var(--gradient-primary)" }}
      >
        <span className="flex items-center gap-2">
          <Shuffle size={14} />
          Generate new composition
        </span>
        <ChevronRight size={15} />
      </button>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={reset}
          className="flex items-center justify-center gap-2 border border-[var(--pg-line)] px-3 py-3 text-[11px] font-semibold transition hover:bg-[var(--pg-muted)]"
        >
          <RotateCcw size={13} />
          Reset
        </button>
        <button
          type="button"
          onClick={onExport}
          className="flex items-center justify-center gap-2 border border-[var(--pg-line)] px-3 py-3 text-[11px] font-semibold transition hover:bg-[var(--pg-muted)]"
        >
          <Download size={13} />
          Export PNG
        </button>
      </div>
    </div>
  );
}
