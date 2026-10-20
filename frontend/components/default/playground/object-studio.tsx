"use client";

import { useState } from "react";
import StageToolbar from "@/components/default/playground/stage-toolbar";
import StageViewport from "@/components/default/playground/stage-viewport";
import PaletteStrip from "@/components/default/playground/palette-strip";
import type { Settings, UpdateSetting } from "@/components/default/playground/types";

export default function ObjectStudio({
  settings,
  update,
  onCanvasReady,
  onExport,
}: {
  settings: Settings;
  update: UpdateSetting;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  onExport: () => void;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={`playground-enter min-w-0 overflow-hidden border border-[var(--pg-line)] bg-[var(--background)] ${
        isFullscreen
          ? "fixed inset-3 z-50 flex flex-col shadow-2xl sm:inset-6"
          : ""
      }`}
    >
      <StageToolbar
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />

      <StageViewport
        settings={settings}
        isFullscreen={isFullscreen}
        onCanvasReady={onCanvasReady}
        onExport={onExport}
      />

      <PaletteStrip settings={settings} update={update} />
    </div>
  );
}
