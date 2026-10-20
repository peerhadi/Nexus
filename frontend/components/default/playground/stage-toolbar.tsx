"use client";

import {
  Aperture,
  ArrowDownRight,
  ChevronRight,
  Maximize2,
} from "lucide-react";

export default function StageToolbar({
  isFullscreen,
  setIsFullscreen,
}: {
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--pg-line)] px-4 py-3.5 sm:px-6">
      <div className="flex items-center gap-3">
        <Aperture size={18} className="text-[var(--accent)]" />
        <div>
          <p className="text-xs font-bold tracking-wide">
            THE OBJECT STUDIO
          </p>
          <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
            Drag to rotate · Scroll to zoom
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden font-mono text-[10px] text-[var(--text-secondary)] sm:block">
          NX / 001
        </span>
        <button
          type="button"
          title="Toggle fullscreen"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="border border-[var(--pg-line)] p-2.5 transition hover:bg-[var(--pg-muted)]"
        >
          {isFullscreen ? (
            <ChevronRight size={15} className="rotate-180" />
          ) : (
            <Maximize2 size={15} />
          )}
        </button>
        {isFullscreen && (
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="border border-[var(--pg-line)] p-2.5 hover:bg-[var(--pg-muted)]"
          >
            <ArrowDownRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
