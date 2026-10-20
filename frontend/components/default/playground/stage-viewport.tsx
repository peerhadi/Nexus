"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Download } from "lucide-react";
import Scene from "@/components/default/playground/scene";
import { SHAPES } from "@/components/default/playground/data";
import type { Settings } from "@/components/default/playground/types";

export default function StageViewport({
  settings,
  isFullscreen,
  onCanvasReady,
  onExport,
}: {
  settings: Settings;
  isFullscreen: boolean;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  onExport: () => void;
}) {
  return (
    <div
      className={`relative min-h-[420px] flex-1 overflow-hidden sm:min-h-[560px] ${
        isFullscreen ? "min-h-0" : ""
      }`}
      style={{ backgroundColor: settings.background }}
    >
      <div className="playground-grid pointer-events-none absolute inset-0 opacity-70" />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[85px] sm:h-[480px] sm:w-[480px]"
        style={{
          background: `radial-gradient(circle, ${settings.color} 0%, ${settings.accent} 35%, transparent 72%)`,
        }}
      />

      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: false,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => onCanvasReady(gl.domElement)}
        className="h-[550px]!"
      >
        <Suspense fallback={null}>
          <Scene settings={settings} />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute left-5 top-5 sm:left-7 sm:top-7">
        <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-secondary)]">
          FORM /{" "}
          {String(SHAPES.indexOf(settings.shape) + 1).padStart(2, "0")}
        </p>
        <p className="mt-2 text-lg font-semibold tracking-tight">
          {settings.shape}
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          {settings.finish} finish
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 sm:bottom-7 sm:left-7">
        <span
          className="h-3 w-3"
          style={{ backgroundColor: settings.color }}
        />
        <span
          className="h-3 w-3"
          style={{ backgroundColor: settings.accent }}
        />
        <span className="ml-1 font-mono text-[10px] text-[var(--text-secondary)]">
          {settings.color} / {settings.accent}
        </span>
      </div>

      <button
        type="button"
        onClick={onExport}
        className="absolute bottom-5 right-5 flex items-center gap-2 border border-[var(--pg-line)] bg-[var(--background)]/85 px-4 py-3 text-xs font-semibold backdrop-blur-md transition hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
      >
        <Download size={14} />
        Export artwork
      </button>
    </div>
  );
}
