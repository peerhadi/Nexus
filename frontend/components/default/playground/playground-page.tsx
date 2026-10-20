"use client";

import { useCallback, useEffect, useState } from "react";
import DetailStrip from "@/components/default/playground/detail-strip";
import {
  FINISHES,
  INITIAL,
  PALETTES,
  SHAPES,
} from "@/components/default/playground/data";
import Inspector from "@/components/default/playground/inspector";
import NoticeToast from "@/components/default/playground/notice-toast";
import ObjectStudio from "@/components/default/playground/object-studio";
import PlaygroundHeader from "@/components/default/playground/playground-header";
import PlaygroundStyles from "@/components/default/playground/playground-styles";
import { readCssVariable } from "@/components/default/playground/read-css-variable";
import type { Settings } from "@/components/default/playground/types";

export default function PlaygroundPage() {
  const [settings, setSettings] = useState<Settings>(INITIAL);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
    null,
  );
  const [notice, setNotice] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings((current) => ({
      ...current,
      background: readCssVariable("--background", INITIAL.background),
    }));
  }, []);

  const update = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const randomize = useCallback(() => {
    const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const finish = FINISHES[Math.floor(Math.random() * FINISHES.length)];

    setSettings((current) => ({
      ...current,
      shape,
      finish,
      color: palette.a,
      accent: palette.b,
      glow: 0.55 + Math.random() * 1.15,
      metalness: Math.random(),
      rotation: true,
      particles: true,
      orbits: true,
    }));
    setNotice("New composition generated");
  }, []);

  const exportImage = useCallback(() => {
    if (!canvasElement) {
      setNotice("The 3D scene is still loading");
      return;
    }

    try {
      const link = document.createElement("a");
      link.download = `nexus-playground-${Date.now()}.png`;
      link.href = canvasElement.toDataURL("image/png");
      link.click();
      setNotice("Your creation has been exported");
    } catch {
      setNotice("Export failed. Try again after the scene loads");
    }
  }, [canvasElement]);

  const reset = useCallback(() => {
    setSettings({
      ...INITIAL,
      background: readCssVariable("--background", INITIAL.background),
    });
    setNotice("Composition reset");
  }, []);

  return (
    <main className="playground-page min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <PlaygroundStyles />

      {/* Editorial header */}
      <PlaygroundHeader randomize={randomize} />

      {/* Studio workspace */}
      <section className="px-3 pb-16 sm:px-6 lg:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* Main stage */}
            <ObjectStudio
              settings={settings}
              update={update}
              onCanvasReady={setCanvasElement}
              onExport={exportImage}
            />

            {/* Custom inspector */}
            <Inspector
              settings={settings}
              update={update}
              randomize={randomize}
              reset={reset}
              onExport={exportImage}
            />
          </div>

          {/* Bottom detail strip */}
          <DetailStrip />
        </div>
      </section>

      {/* Closing statement */}
      <NoticeToast notice={notice} setNotice={setNotice} />
    </main>
  );
}
