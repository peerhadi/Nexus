"use client";

import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileText,
  Inbox,
  Play,
  RefreshCw,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { workflowExamples } from "./data";

export default function WorkflowPlayground() {
  const [activeId, setActiveId] = useState("leads");
  const [completed, setCompleted] = useState(false);

  const activeWorkflow =
    workflowExamples.find((workflow) => workflow.id === activeId) ??
    workflowExamples[0];

  const selectWorkflow = (id: string) => {
    setActiveId(id);
    setCompleted(false);
  };

  return (
    <div className="automation-playground overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--card)]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <div className="border-b border-[var(--card-border)] bg-[var(--surface-secondary)] p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Choose a workflow
            </p>
            <Settings2 size={16} className="text-[var(--text-secondary)]" />
          </div>

          <div className="mt-6 space-y-2">
            {workflowExamples.map((workflow) => {
              const isActive = activeId === workflow.id;

              return (
                <button
                  key={workflow.id}
                  type="button"
                  onClick={() => selectWorkflow(workflow.id)}
                  aria-pressed={isActive}
                  className={`automation-workflow-option group flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition duration-200 ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--card)]"
                      : "border-transparent hover:border-[var(--card-border)] hover:bg-[var(--card)]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${
                      isActive
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                        : "border-[var(--card-border)] bg-[var(--card)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {workflow.id === "leads" ? (
                      <Inbox size={16} />
                    ) : workflow.id === "projects" ? (
                      <RefreshCw size={16} />
                    ) : workflow.id === "reports" ? (
                      <FileText size={16} />
                    ) : (
                      <ShieldCheck size={16} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[var(--text-primary)]">
                      {workflow.title}
                    </span>
                    <span className="mt-1 block text-[11px] leading-5 text-[var(--text-secondary)]">
                      {workflow.short}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={14}
                    className={`mt-1 shrink-0 transition ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-secondary)] opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                WORKFLOW PREVIEW
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {activeWorkflow.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                {activeWorkflow.description}
              </p>
            </div>

            <span className="rounded-full border border-[var(--card-border)] px-3 py-1.5 text-[10px] font-medium text-[var(--text-secondary)]">
              Example {activeWorkflow.number}
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-4 sm:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[var(--text-secondary)]">
                Starting condition
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3 py-1.5 text-[10px] font-medium">
                <Play size={11} className="text-[var(--accent)]" />
                {activeWorkflow.trigger}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {activeWorkflow.steps.map((step, index) => {
                const Icon = step.icon;
                const isReached = completed || index === 0;

                return (
                  <div key={`${activeId}-${step.label}`} className="relative">
                    <div
                      className={`automation-flow-step relative h-full rounded-xl border bg-[var(--card)] p-4 transition duration-300 ${
                        completed
                          ? "border-[var(--accent)]"
                          : "border-[var(--card-border)]"
                      }`}
                      style={{
                        transitionDelay: completed ? `${index * 120}ms` : "0ms",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold tracking-widest text-[var(--text-secondary)]">
                          STEP 0{index + 1}
                        </span>
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                            isReached
                              ? "bg-[var(--accent)] text-white"
                              : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                          }`}
                        >
                          {completed ? <Check size={14} /> : <Icon size={14} />}
                        </span>
                      </div>
                      <h4 className="mt-5 text-sm font-semibold">
                        {step.label}
                      </h4>
                      <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                        {step.detail}
                      </p>
                      {completed && (
                        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-medium text-[var(--text-secondary)]">
                          <CheckCircle2
                            size={12}
                            className="text-[var(--accent)]"
                          />
                          Included in preview
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-[var(--card-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2.5">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-[var(--accent)]"
                />
                <div>
                  <p className="text-xs font-semibold">
                    {completed
                      ? "Workflow preview complete"
                      : "Expected outcome"}
                  </p>
                  <p className="mt-1 max-w-md text-xs leading-5 text-[var(--text-secondary)]">
                    {activeWorkflow.result}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCompleted((value) => !value)}
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-2 text-xs font-semibold transition hover:border-[var(--accent)]"
              >
                {completed ? (
                  <>
                    <RefreshCw size={14} />
                    Reset preview
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    Preview workflow
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
