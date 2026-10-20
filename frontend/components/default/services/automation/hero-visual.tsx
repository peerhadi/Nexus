"use client";

import {
  Activity,
  CheckCircle2,
  Database,
  GitBranch,
  Inbox,
  Mail,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useCallback, type MouseEvent } from "react";

export default function AutomationHeroVisual() {
  const onMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.setProperty("--mx", `${x * 32}px`);
    event.currentTarget.style.setProperty("--my", `${y * 32}px`);
  }, []);

  const onLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--mx", "0px");
    event.currentTarget.style.setProperty("--my", "0px");
  }, []);

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="automation-hero-visual relative min-h-[460px] overflow-hidden rounded-[2rem] border border-[var(--card-border)] sm:min-h-[560px]"
      aria-label="Decorative illustration of an interconnected automation workflow"
    >
      <div className="automation-hero-glow pointer-events-none absolute inset-0" />
      <div className="automation-grid pointer-events-none absolute inset-0" />

      <div className="automation-hero-orbit hero-orbit-a absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--card-border)] sm:h-[420px] sm:w-[420px]" />
      <div className="automation-hero-orbit hero-orbit-b absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--card-border)] sm:h-[330px] sm:w-[330px]" />

      <div className="automation-orbit-dot dot-one absolute left-[18%] top-[23%] h-3 w-3 rounded-full bg-[var(--accent)]" />
      <div className="automation-orbit-dot dot-two absolute right-[18%] top-[32%] h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
      <div className="automation-orbit-dot dot-three absolute bottom-[21%] left-[26%] h-2 w-2 rounded-full bg-[var(--accent)]" />

      <div className="automation-hero-shape shape-torus absolute left-[12%] top-[12%]">
        <div />
      </div>
      <div className="automation-hero-shape shape-crystal absolute right-[12%] top-[16%]">
        <div />
      </div>
      <div className="automation-hero-shape shape-sphere absolute bottom-[15%] right-[13%]">
        <div />
      </div>
      <div className="automation-hero-shape shape-wire absolute bottom-[18%] left-[12%]">
        <div />
      </div>

      <div className="automation-flow-line flow-line-one absolute" />
      <div className="automation-flow-line flow-line-two absolute" />
      <div className="automation-flow-line flow-line-three absolute" />

      <div className="automation-center relative z-10 mx-auto mt-[95px] w-[min(82%,350px)] sm:mt-[120px]">
        <div className="automation-center-card relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="automation-center-icon flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                <Workflow size={21} />
              </div>
              <div>
                <p className="text-sm font-semibold">Workflow engine</p>
                <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
                  Event-driven process
                </p>
              </div>
            </div>
            <span className="automation-live-indicator flex items-center gap-1.5 rounded-full border border-[var(--card-border)] px-2.5 py-1.5 text-[10px] text-[var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Active
            </span>
          </div>

          <div className="space-y-3">
            <div className="automation-mini-step flex items-center gap-3 rounded-xl border border-[var(--card-border)] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
                <Inbox size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">Trigger received</p>
                <p className="mt-1 text-[10px] text-[var(--text-secondary)]">
                  A new event starts the process
                </p>
              </div>
              <CheckCircle2 size={16} className="text-[var(--accent)]" />
            </div>

            <div className="automation-mini-step step-delay-one flex items-center gap-3 rounded-xl border border-[var(--card-border)] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
                <GitBranch size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">Rules evaluated</p>
                <p className="mt-1 text-[10px] text-[var(--text-secondary)]">
                  Apply conditions and validation
                </p>
              </div>
              <Activity size={16} className="text-[var(--accent)]" />
            </div>

            <div className="automation-mini-step step-delay-two flex items-center gap-3 rounded-xl border border-[var(--card-border)] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
                <Zap size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">Actions executed</p>
                <p className="mt-1 text-[10px] text-[var(--text-secondary)]">
                  Update systems and notify people
                </p>
              </div>
              <CheckCircle2 size={16} className="text-[var(--accent)]" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[var(--card-border)] pt-4">
            <span className="text-[10px] text-[var(--text-secondary)]">
              Illustrative workflow
            </span>
            <div className="flex items-center gap-2 text-[10px] font-medium">
              <span className="automation-status-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>Steps connected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="automation-float-card float-card-left absolute left-[4%] top-[43%] z-20 flex items-center gap-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-3 shadow-[var(--shadow-md)] sm:left-[3%]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
          <Mail size={16} />
        </div>
        <div>
          <p className="text-[11px] font-semibold">Email trigger</p>
          <p className="mt-1 text-[9px] text-[var(--text-secondary)]">
            Event received
          </p>
        </div>
      </div>

      <div className="automation-float-card float-card-right absolute right-[3%] top-[55%] z-20 flex items-center gap-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-3 shadow-[var(--shadow-md)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
          <Database size={16} />
        </div>
        <div>
          <p className="text-[11px] font-semibold">Data updated</p>
          <p className="mt-1 text-[9px] text-[var(--text-secondary)]">
            Action completed
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
          <Sparkles size={14} className="text-[var(--accent)]" />
          Connected processes
        </div>
        <div className="text-[10px] text-[var(--text-secondary)]">
          Trigger <span className="mx-1 text-[var(--accent)]">→</span> Action
        </div>
      </div>
    </div>
  );
}
