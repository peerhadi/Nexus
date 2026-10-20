"use client";

import {
  ArrowUpRight,
  Check,
  Database,
  LockKeyhole,
  PanelsTopLeft,
} from "lucide-react";
import { useCallback, type MouseEvent } from "react";

export default function OrbitalInterface() {
  const handleMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--pointer-x", `${x * 24}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 24}px`);
  }, []);

  const handleLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "0px");
    event.currentTarget.style.setProperty("--pointer-y", "0px");
  }, []);

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="interface-scene relative mx-auto flex min-h-[430px] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-secondary)] p-5 sm:min-h-[520px] sm:p-8"
      aria-label="Decorative illustration of a connected web application interface"
    >
      <div className="scene-glow pointer-events-none absolute inset-0" />

      <div className="orbit orbit-one pointer-events-none absolute h-[270px] w-[270px] rounded-full border border-[var(--card-border)] sm:h-[360px] sm:w-[360px]" />
      <div className="orbit orbit-two pointer-events-none absolute h-[200px] w-[200px] rounded-full border border-[var(--card-border)] sm:h-[280px] sm:w-[280px]" />
      <div className="orbit orbit-three pointer-events-none absolute h-[125px] w-[125px] rounded-full border border-[var(--card-border)] sm:h-[190px] sm:w-[190px]" />

      <div className="scene-geometry geometry-ring absolute left-[12%] top-[13%]">
        <div className="ring-core" />
      </div>

      <div className="scene-geometry geometry-cube absolute right-[12%] top-[19%]">
        <div className="cube-face cube-front" />
        <div className="cube-face cube-side" />
        <div className="cube-face cube-top" />
      </div>

      <div className="scene-geometry geometry-diamond absolute bottom-[14%] left-[13%]">
        <div />
      </div>

      <div className="scene-geometry geometry-sphere absolute bottom-[18%] right-[12%]">
        <div className="sphere-highlight" />
      </div>

      <div className="scene-geometry geometry-cross absolute right-[24%] top-[43%]">
        <span />
        <span />
      </div>

      <div className="interface-window relative z-10 w-full max-w-[390px] overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-[var(--shadow-md)]">
        <div className="flex items-center justify-between border-b border-[var(--card-border)] px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-[var(--text-secondary)] opacity-40" />
              <span className="h-2 w-2 rounded-full bg-[var(--text-secondary)] opacity-25" />
              <span className="h-2 w-2 rounded-full bg-[var(--text-secondary)] opacity-15" />
            </div>
            <span className="ml-2 text-xs font-medium text-[var(--text-secondary)]">
              Workspace
            </span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--card-border)]">
            <PanelsTopLeft size={13} />
          </div>
        </div>

        <div className="grid grid-cols-[84px_1fr] sm:grid-cols-[100px_1fr]">
          <div className="space-y-4 border-r border-[var(--card-border)] p-3 pt-5">
            <div className="mb-5 flex items-center gap-2 px-1">
              <div className="h-5 w-5 rounded-md bg-[var(--accent)]" />
              <div className="h-2 w-8 rounded-full bg-[var(--text-primary)] opacity-60" />
            </div>
            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`flex items-center gap-2 rounded-lg p-2 ${
                  item === 0 ? "bg-[var(--surface-secondary)]" : ""
                }`}
              >
                <span
                  className={`h-3 w-3 rounded-sm ${
                    item === 0
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--text-secondary)] opacity-25"
                  }`}
                />
                <span
                  className="h-1.5 flex-1 rounded-full bg-[var(--text-secondary)]"
                  style={{ opacity: item === 0 ? 0.65 : 0.2 }}
                />
              </div>
            ))}
            <div className="mt-8 border-t border-[var(--card-border)] pt-4">
              <div className="h-1.5 w-10 rounded-full bg-[var(--text-secondary)] opacity-20" />
            </div>
          </div>

          <div className="min-w-0 p-3.5 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="h-2 w-20 rounded-full bg-[var(--text-secondary)] opacity-35" />
                <div className="mt-3 h-5 w-28 rounded-md bg-[var(--text-primary)] opacity-80 sm:w-36" />
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] text-white">
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {[
                { label: "Activity", width: "72%" },
                { label: "Progress", width: "54%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[var(--card-border)] p-3"
                >
                  <p className="text-[10px] text-[var(--text-secondary)]">
                    {item.label}
                  </p>
                  <div className="mt-2 h-4 w-12 rounded bg-[var(--text-primary)] opacity-70" />
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                    <div
                      className="h-full rounded-full bg-[var(--accent)]"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-[var(--card-border)] p-3">
              <div className="flex items-center justify-between">
                <div className="h-2 w-20 rounded-full bg-[var(--text-secondary)] opacity-40" />
                <div className="h-1.5 w-8 rounded-full bg-[var(--accent)] opacity-70" />
              </div>
              <div className="mt-4 flex h-[72px] items-end gap-2">
                {[36, 58, 43, 77, 53, 88, 64, 96, 70, 82, 56, 73].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-sm bg-[var(--accent)]"
                      style={{
                        height: `${height}%`,
                        opacity: 0.25 + (index / 12) * 0.65,
                      }}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--card-border)] p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
                <Check size={15} className="text-[var(--accent)]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="h-2 w-20 rounded-full bg-[var(--text-primary)] opacity-55" />
                <div className="mt-2 h-1.5 w-28 max-w-full rounded-full bg-[var(--text-secondary)] opacity-20" />
              </div>
              <span className="rounded-full border border-[var(--card-border)] px-2 py-1 text-[9px] text-[var(--text-secondary)]">
                Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="floating-chip chip-top absolute left-[4%] top-[38%] z-20 flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-3 py-2.5 shadow-[var(--shadow-md)] sm:left-[1%]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
          <Database size={14} />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[var(--text-primary)]">
            Data layer
          </p>
          <p className="text-[9px] text-[var(--text-secondary)]">Connected</p>
        </div>
      </div>

      <div className="floating-chip chip-bottom absolute bottom-[12%] right-[3%] z-20 flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-3 py-2.5 shadow-[var(--shadow-md)] sm:right-[1%]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
          <LockKeyhole size={14} />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[var(--text-primary)]">
            Protected
          </p>
          <p className="text-[9px] text-[var(--text-secondary)]">
            Access control
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] text-[var(--text-secondary)] sm:bottom-7 sm:left-7">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        An application shaped around your work
      </div>
    </div>
  );
}
