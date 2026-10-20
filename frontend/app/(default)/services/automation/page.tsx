"use client";

import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Database,
  FileCheck2,
  FileText,
  GitBranch,
  Globe,
  Inbox,
  Layers3,
  Mail,
  MousePointer2,
  Network,
  Play,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Sparkles,
  Timer,
  Workflow,
  Zap,
} from "lucide-react";
import {
  useCallback,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

const automationServices = [
  {
    number: "01",
    icon: Workflow,
    title: "Workflow automation",
    description:
      "Connect repetitive steps into structured workflows that move information and tasks forward with less manual effort.",
    examples: ["Task routing", "Status updates", "Approval flows"],
    glow: "automation-cyan",
  },
  {
    number: "02",
    icon: Inbox,
    title: "Email and notifications",
    description:
      "Organize incoming requests, send timely updates, and keep the right people informed when something changes.",
    examples: ["Email triggers", "Alerts", "Follow-ups"],
    glow: "automation-violet",
  },
  {
    number: "03",
    icon: Network,
    title: "App and API connections",
    description:
      "Let your existing tools exchange information through appropriate integrations instead of duplicating work.",
    examples: ["API connections", "Data syncing", "Webhooks"],
    glow: "automation-blue",
  },
  {
    number: "04",
    icon: Database,
    title: "Data processing",
    description:
      "Move, validate, organize, and transform information as it passes through your business processes.",
    examples: ["Record creation", "Validation", "Data transformation"],
    glow: "automation-pink",
  },
  {
    number: "05",
    icon: FileCheck2,
    title: "Reports and scheduled tasks",
    description:
      "Prepare recurring reports, run scheduled processes, and deliver useful information at the right time.",
    examples: ["Scheduled jobs", "Reports", "Routine checks"],
    glow: "automation-orange",
  },
  {
    number: "06",
    icon: ShieldCheck,
    title: "Reliable automation systems",
    description:
      "Build in sensible error handling, validation, logging, and human review where a process needs oversight.",
    examples: ["Error handling", "Audit trails", "Manual review"],
    glow: "automation-green",
  },
];

const workflowExamples = [
  {
    id: "leads",
    number: "01",
    title: "Incoming enquiries",
    short: "Capture → Organize → Notify",
    description:
      "When a new enquiry arrives, capture its details, organize the record, and notify the appropriate person.",
    trigger: "A new enquiry is received",
    steps: [
      { icon: Inbox, label: "Capture", detail: "Receive the enquiry" },
      { icon: Database, label: "Organize", detail: "Store its details" },
      { icon: Bell, label: "Notify", detail: "Alert the right person" },
    ],
    result: "The enquiry is recorded and ready for follow-up.",
  },
  {
    id: "projects",
    number: "02",
    title: "Project updates",
    short: "Detect → Update → Inform",
    description:
      "When a project status changes, update connected records and send a relevant notification to the team.",
    trigger: "A project status changes",
    steps: [
      { icon: Activity, label: "Detect", detail: "Identify the change" },
      { icon: RefreshCw, label: "Update", detail: "Sync relevant records" },
      { icon: Mail, label: "Inform", detail: "Send an update" },
    ],
    result: "People can see the latest status without chasing updates.",
  },
  {
    id: "reports",
    number: "03",
    title: "Recurring reports",
    short: "Schedule → Process → Deliver",
    description:
      "At a defined interval, gather available information, process the relevant data, and deliver a report.",
    trigger: "A scheduled run begins",
    steps: [
      { icon: Clock3, label: "Schedule", detail: "Start at the right time" },
      { icon: Database, label: "Process", detail: "Prepare the data" },
      { icon: FileText, label: "Deliver", detail: "Create the report" },
    ],
    result: "Recurring information is prepared in a consistent format.",
  },
  {
    id: "approvals",
    number: "04",
    title: "Approval workflows",
    short: "Submit → Review → Resolve",
    description:
      "Route a submitted request to the right reviewer, track its status, and notify the requester of the outcome.",
    trigger: "A request is submitted",
    steps: [
      { icon: FileText, label: "Submit", detail: "Create the request" },
      { icon: ShieldCheck, label: "Review", detail: "Route for approval" },
      { icon: CheckCircle2, label: "Resolve", detail: "Record the decision" },
    ],
    result: "Requests have a clear route and visible status.",
  },
];

const processStages = [
  {
    number: "01",
    title: "Find the friction",
    description:
      "Identify repetitive tasks, duplicated data entry, delays, and handoffs that could be improved.",
    deliverable: "A defined problem",
  },
  {
    number: "02",
    title: "Map the workflow",
    description:
      "Establish the trigger, conditions, actions, exceptions, and points where a person should make the decision.",
    deliverable: "A workflow plan",
  },
  {
    number: "03",
    title: "Connect the pieces",
    description:
      "Implement the required logic and connect the suitable applications, APIs, and data sources.",
    deliverable: "A working automation",
  },
  {
    number: "04",
    title: "Test the exceptions",
    description:
      "Check normal runs, missing information, failures, duplicate events, and recovery behavior.",
    deliverable: "A tested workflow",
  },
  {
    number: "05",
    title: "Deploy and refine",
    description:
      "Launch according to the agreed scope, review actual behavior, and make further improvements where needed.",
    deliverable: "A maintainable system",
  },
];

const faqs = [
  {
    question: "What kinds of tasks can be automated?",
    answer:
      "Suitable tasks include notifications, scheduled reports, record updates, data transfers, request routing, recurring checks, and workflows that connect existing tools. The best candidates are repetitive, clearly defined, and have rules that can be tested.",
  },
  {
    question: "Can you automate the tools I already use?",
    answer:
      "Potentially, yes. It depends on whether those tools provide a suitable API, webhook, supported integration, or another reliable way to exchange information. We assess those requirements before committing to an implementation.",
  },
  {
    question: "Does automation mean everything runs without people?",
    answer:
      "No. Some processes should include approval steps, review queues, or manual intervention when information is incomplete or a decision requires judgment. Good automation makes those boundaries explicit.",
  },
  {
    question: "What happens when an automated step fails?",
    answer:
      "The approach depends on the workflow. Appropriate safeguards can include validation, error logging, alerts, controlled retries, duplicate-event protection, and a documented manual recovery path.",
  },
  {
    question: "Can you connect automation to a custom application?",
    answer:
      "Yes, where the application's architecture and access methods support it. A custom application can provide triggers, receive updates, or share data with other systems through appropriate integrations.",
  },
  {
    question: "How do you determine the cost?",
    answer:
      "The scope depends on the number of steps, systems involved, data complexity, exception handling, testing, and deployment requirements. We agree on the deliverables and project terms before work begins.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <div className="automation-eyebrow mb-5 inline-flex items-center gap-2.5 rounded-full border border-[var(--card-border)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        <span className="automation-pulse h-2 w-2 rounded-full bg-[var(--accent)]" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

function AutomationHeroVisual() {
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

function AutomationCard({
  service,
}: {
  service: (typeof automationServices)[number];
}) {
  const Icon = service.icon;

  return (
    <article className="automation-service-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 transition duration-300 hover:-translate-y-1.5 sm:p-7">
      <div className={`service-card-glow ${service.glow}`} />
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div className="automation-service-icon flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--surface-secondary)] transition duration-300">
          <Icon size={21} strokeWidth={1.7} />
        </div>
        <span className="text-xs tracking-widest text-[var(--text-secondary)]">
          {service.number}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-secondary)]">
          {service.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {service.examples.map((example) => (
            <span
              key={example}
              className="rounded-full border border-[var(--card-border)] px-2.5 py-1.5 text-[10px] text-[var(--text-secondary)]"
            >
              {example}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function WorkflowPlayground() {
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

function ProcessCard({ stage }: { stage: (typeof processStages)[number] }) {
  return (
    <article className="automation-process-card group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition duration-300 hover:-translate-y-1 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-[var(--accent)]">
          {stage.number}
        </span>
      </div>
      <h3 className="mt-7 text-lg font-semibold">{stage.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
        {stage.description}
      </p>
      <div className="mt-6 rounded-lg border border-[var(--card-border)] bg-[var(--surface-secondary)] p-3">
        <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
          Deliverable
        </p>
        <p className="mt-1.5 text-xs font-semibold">{stage.deliverable}</p>
      </div>
    </article>
  );
}

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-[var(--card-border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="flex items-start gap-4">
          <span className="pt-0.5 text-xs tabular-nums text-[var(--text-secondary)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-medium leading-6 text-[var(--text-primary)]">
            {question}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--text-secondary)] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-8 text-sm leading-7 text-[var(--text-secondary)] sm:pl-10">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        secondary
          ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
          : "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold !text-white transition hover:opacity-90"
      }
    >
      {children}
    </Link>
  );
}

export default function AutomationPage() {
  return (
    <main className="automation-page overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <style jsx global>{`
        .automation-page {
          --automation-glow: var(--selection);
        }

        .automation-page .automation-eyebrow {
          background: var(--card);
        }

        .automation-page .automation-pulse {
          box-shadow: 0 0 12px var(--accent);
          animation: automation-pulse 2s ease-in-out infinite;
        }

        .automation-page .automation-hero-visual {
          --mx: 0px;
          --my: 0px;
          isolation: isolate;
          background: var(--surface-secondary);
        }

        .automation-page .automation-hero-glow {
          background:
            radial-gradient(
              ellipse at 50% 45%,
              var(--selection),
              transparent 56%
            ),
            radial-gradient(ellipse at 85% 20%, var(--accent), transparent 40%),
            radial-gradient(ellipse at 10% 90%, var(--accent), transparent 36%);
          opacity: 0.42;
          transform: translate3d(var(--mx), var(--my), 0);
          transition: transform 250ms ease-out;
          animation: automation-glow-breathe 7s ease-in-out infinite;
        }

        .automation-page .automation-grid {
          background-image: radial-gradient(
            var(--card-border) 1px,
            transparent 1px
          );
          background-size: 22px 22px;
          opacity: 0.7;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 20%,
            black 80%,
            transparent
          );
        }

        .automation-page .automation-hero-orbit {
          border-style: dashed;
          opacity: 0.7;
        }

        .automation-page .hero-orbit-a {
          animation: automation-orbit 32s linear infinite;
        }

        .automation-page .hero-orbit-b {
          border-style: dotted;
          opacity: 0.6;
          animation: automation-orbit-reverse 25s linear infinite;
        }

        .automation-page .automation-orbit-dot {
          z-index: 1;
          box-shadow: 0 0 15px var(--accent);
          animation: automation-dot-pulse 2.5s ease-in-out infinite;
        }

        .automation-page .dot-two {
          animation-delay: -0.8s;
        }

        .automation-page .dot-three {
          animation-delay: -1.6s;
        }

        .automation-page .automation-hero-shape {
          z-index: 2;
          transform: translate3d(var(--mx), var(--my), 0);
          transition: transform 300ms ease-out;
        }

        .automation-page .shape-torus {
          width: 49px;
          height: 49px;
          border: 9px solid var(--accent);
          border-radius: 50%;
          opacity: 0.8;
          box-shadow:
            0 0 13px var(--selection),
            inset 0 0 12px var(--selection);
          animation: automation-torus 6s ease-in-out infinite;
        }

        .automation-page .shape-torus div {
          position: absolute;
          inset: 4px;
          border: 1px solid var(--card-border);
          border-radius: 50%;
        }

        .automation-page .shape-crystal {
          width: 45px;
          height: 45px;
          transform-style: preserve-3d;
          animation: automation-crystal 8s ease-in-out infinite;
        }

        .automation-page .shape-crystal div {
          width: 100%;
          height: 100%;
          border: 1px solid var(--accent);
          background: var(--selection);
          transform: rotate(45deg) skew(-8deg, -8deg);
          box-shadow: 0 0 24px var(--selection);
          opacity: 0.8;
        }

        .automation-page .shape-sphere {
          width: 45px;
          height: 45px;
          border: 1px solid var(--accent);
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 25%,
            var(--card),
            var(--accent)
          );
          box-shadow: inset -10px -9px 16px var(--selection);
          opacity: 0.75;
          animation: automation-sphere 7s ease-in-out infinite;
        }

        .automation-page .shape-sphere div {
          width: 9px;
          height: 9px;
          margin: 8px;
          border-radius: 50%;
          background: var(--card);
        }

        .automation-page .shape-wire {
          width: 43px;
          height: 43px;
          border: 1px solid var(--accent);
          transform: rotate(45deg);
          animation: automation-wire 7s ease-in-out infinite;
        }

        .automation-page .shape-wire div {
          position: absolute;
          inset: 7px;
          border: 1px solid var(--accent);
        }

        .automation-page .automation-flow-line {
          z-index: 1;
          height: 1px;
          transform-origin: left;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent),
            transparent
          );
          opacity: 0.8;
          filter: drop-shadow(0 0 5px var(--accent));
        }

        .automation-page .flow-line-one {
          left: 10%;
          top: 42%;
          width: 30%;
          transform: rotate(12deg);
          animation: automation-line-glow 3s ease-in-out infinite;
        }

        .automation-page .flow-line-two {
          right: 8%;
          top: 45%;
          width: 24%;
          transform: rotate(-18deg);
          animation: automation-line-glow 3s ease-in-out infinite -1s;
        }

        .automation-page .flow-line-three {
          bottom: 22%;
          left: 15%;
          width: 29%;
          transform: rotate(-15deg);
          animation: automation-line-glow 3s ease-in-out infinite -2s;
        }

        .automation-page .automation-center-card {
          box-shadow:
            0 0 0 1px var(--card-border),
            0 18px 55px var(--selection);
          animation: automation-card-hover 6s ease-in-out infinite;
        }

        .automation-page .automation-center-icon {
          box-shadow: 0 0 24px var(--selection);
        }

        .automation-page .automation-mini-step {
          transition:
            border-color 300ms ease,
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .automation-page .automation-mini-step:nth-child(1) {
          animation: automation-step-glow 4s ease-in-out infinite;
        }

        .automation-page .automation-mini-step.step-delay-one {
          animation: automation-step-glow 4s ease-in-out infinite -1.3s;
        }

        .automation-page .automation-mini-step.step-delay-two {
          animation: automation-step-glow 4s ease-in-out infinite -2.6s;
        }

        .automation-page .automation-live-indicator {
          box-shadow: 0 0 16px var(--selection);
        }

        .automation-page .automation-status-dot {
          box-shadow: 0 0 12px var(--accent);
          animation: automation-dot-pulse 1.8s ease-in-out infinite;
        }

        .automation-page .automation-float-card {
          animation: automation-float-card 6s ease-in-out infinite;
        }

        .automation-page .float-card-right {
          animation-delay: -3s;
        }

        .automation-page .automation-service-card {
          isolation: isolate;
        }

        .automation-page .service-card-glow {
          position: absolute;
          top: -75px;
          right: -75px;
          width: 175px;
          height: 175px;
          border-radius: 50%;
          opacity: 0.11;
          filter: blur(45px);
          transition:
            opacity 300ms ease,
            transform 500ms ease;
          pointer-events: none;
        }

        .automation-page .automation-service-card:hover .service-card-glow {
          opacity: 0.5;
          transform: scale(1.45);
        }

        .automation-page
          .automation-service-card:hover
          .automation-service-icon {
          border-color: var(--accent);
          box-shadow: 0 0 22px var(--selection);
          transform: translateY(-2px);
        }

        .automation-page .automation-cyan {
          background: var(--accent);
        }

        .automation-page .automation-violet {
          background: var(--accent);
          transform: translate(-15px, 15px);
        }

        .automation-page .automation-blue {
          background: var(--accent);
          transform: translate(-15px, 15px);
        }

        .automation-page .automation-pink {
          background: var(--accent);
        }

        .automation-page .automation-orange {
          background: var(--accent);
          transform: translate(-15px, 15px);
        }

        .automation-page .automation-green {
          background: var(--accent);
        }

        .automation-page .automation-workflow-option:focus-visible,
        .automation-page button:focus-visible,
        .automation-page a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }

        @keyframes automation-pulse {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 12px var(--accent);
          }
          50% {
            opacity: 0.5;
            box-shadow: 0 0 24px var(--accent);
          }
        }

        @keyframes automation-glow-breathe {
          0%,
          100% {
            opacity: 0.28;
          }
          50% {
            opacity: 0.52;
          }
        }

        @keyframes automation-orbit {
          from {
            rotate: 0deg;
          }
          to {
            rotate: 360deg;
          }
        }

        @keyframes automation-orbit-reverse {
          from {
            rotate: 360deg;
          }
          to {
            rotate: 0deg;
          }
        }

        @keyframes automation-dot-pulse {
          0%,
          100% {
            opacity: 0.55;
            box-shadow: 0 0 7px var(--accent);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px var(--accent);
          }
        }

        @keyframes automation-torus {
          0%,
          100% {
            transform: rotateX(35deg) rotateY(0deg) translateY(0);
          }
          50% {
            transform: rotateX(35deg) rotateY(70deg) translateY(-15px);
          }
        }

        @keyframes automation-crystal {
          0%,
          100% {
            transform: rotateX(0deg) rotateY(0deg) translateY(0);
          }
          50% {
            transform: rotateX(55deg) rotateY(130deg) translateY(-14px);
          }
        }

        @keyframes automation-sphere {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes automation-wire {
          0%,
          100% {
            transform: rotate(45deg) translateY(0);
          }
          50% {
            transform: rotate(135deg) translateY(-12px);
          }
        }

        @keyframes automation-line-glow {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes automation-card-hover {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes automation-step-glow {
          0%,
          100% {
            box-shadow: 0 0 0 transparent;
          }
          50% {
            box-shadow: 0 0 17px var(--selection);
          }
        }

        @keyframes automation-float-card {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .automation-page *,
          .automation-page *::before,
          .automation-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)]">
              <Sparkles size={14} className="text-[var(--accent)]" />
              Nexus / Business automation
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-0.06em] sm:text-6xl lg:text-[4.65rem]">
              Less busywork.
              <br />
              <span className="automation-heading-glow">More momentum.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              Connect your tools, streamline repetitive processes, and give your
              team more room to focus on the work that actually matters.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ServiceLink href="/build">
                Start a project
                <ArrowUpRight size={16} />
              </ServiceLink>
              <ServiceLink href="/services" secondary>
                All services
                <ArrowRight size={16} />
              </ServiceLink>
            </div>

            <div className="mt-11 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--card-border)] pt-6">
              {[
                "Connect existing tools",
                "Reduce repetitive steps",
                "Keep people in control",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                >
                  <CheckCircle2 size={15} className="text-[var(--accent)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <AutomationHeroVisual />
        </div>

        <div className="mt-16 flex items-center gap-3 text-xs text-[var(--text-secondary)] sm:mt-20">
          <ArrowDown size={15} />
          <span>Explore what you could simplify</span>
          <span className="h-px flex-1 bg-[var(--card-border)]" />
        </div>
      </section>

      <section className="automation-band relative overflow-hidden border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="automation-band-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              The idea
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Let systems handle the repeatable stuff.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
            Many processes follow a recognizable pattern: something happens, a
            set of rules is checked, and one or more actions follow. Automation
            makes those steps consistent and repeatable. It can also preserve
            manual review when a decision needs human judgment.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="What we automate"
          title="Small steps. Connected systems."
          description="From individual recurring tasks to multi-step processes, the goal is to reduce unnecessary effort without losing control or visibility."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {automationServices.map((service) => (
            <AutomationCard key={service.number} service={service} />
          ))}
        </div>
      </section>

      <section className="automation-band relative overflow-hidden border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="automation-band-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <SectionHeading
            eyebrow="Interactive workflow lab"
            title="Explore a workflow in action."
            description="Choose a scenario and preview how its steps connect. This is a conceptual demonstration, not a live integration with your accounts or services."
          />

          <div className="mt-10">
            <WorkflowPlayground />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="Designed responsibly"
              title="Automation should be dependable, not mysterious."
              description="A workflow is only useful when people can understand what it does, trust its boundaries, and recover when something goes wrong."
            />

            <div className="automation-control-panel mt-8 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)]">
              <div className="flex items-center justify-between border-b border-[var(--card-border)] px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-[var(--accent)]" />
                  <span className="text-sm font-semibold">
                    Workflow safeguards
                  </span>
                </div>
                <span className="text-[10px] text-[var(--text-secondary)]">
                  Design principles
                </span>
              </div>

              <div className="space-y-4 p-5">
                {[
                  "Validate inputs before processing",
                  "Log important events and errors",
                  "Prevent unintended duplicate actions",
                  "Allow human review when needed",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="automation-safeguard flex items-center gap-3"
                    style={{ animationDelay: `${index * 180}ms` }}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface-secondary)]">
                      <Check size={14} className="text-[var(--accent)]" />
                    </div>
                    <p className="text-xs leading-5 text-[var(--text-secondary)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-0">
            {[
              {
                icon: ShieldCheck,
                title: "Appropriate permissions",
                description:
                  "Connections should have the access they actually need, with sensitive credentials handled securely.",
              },
              {
                icon: Activity,
                title: "Visible outcomes",
                description:
                  "Important actions and failures should be observable so that issues can be identified and investigated.",
              },
              {
                icon: RefreshCw,
                title: "Thoughtful recovery",
                description:
                  "Retries and recovery paths should account for partial failures and avoid unintentionally repeating actions.",
              },
              {
                icon: MousePointer2,
                title: "Human oversight",
                description:
                  "High-impact or ambiguous decisions can be routed to a person instead of being automated blindly.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="automation-principle flex gap-5 border-b border-[var(--card-border)] py-7 last:border-b-0"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--surface-secondary)]">
                    <Icon size={19} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="automation-band relative overflow-hidden border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
        <div className="automation-band-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <SectionHeading
            eyebrow="How we work"
            title="From a repetitive task to a reliable process."
            description="The workflow is mapped and understood before it is automated. That keeps implementation grounded in the real process rather than guesswork."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {processStages.map((stage) => (
              <ProcessCard key={stage.number} stage={stage} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Common questions"
              title="Before connecting everything."
              description="A few practical things to consider before automating a workflow."
            />
          </div>
          <div>
            {faqs.map((faq, index) => (
              <FaqItem key={faq.question} {...faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="automation-final-cta relative overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-secondary)] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="automation-cta-glow pointer-events-none absolute inset-0" />

          <div className="automation-cta-orbit pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[var(--card-border)]" />
          <div className="automation-cta-orbit cta-orbit-two pointer-events-none absolute -right-2 -top-10 h-48 w-48 rounded-full border border-[var(--card-border)]" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
              <Zap size={22} className="text-[var(--accent)]" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Make room for better work
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
              What could your team stop doing manually?
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
              Tell us about a repetitive task, a disconnected tool, or a process
              that takes more effort than it should. We can define a practical
              automation approach around it.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ServiceLink href="/build">
                Start a project
                <ArrowUpRight size={16} />
              </ServiceLink>
              <ServiceLink href="/services" secondary>
                All services
                <ArrowRight size={16} />
              </ServiceLink>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Explore other services"
        className="border-t border-[var(--card-border)]"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <Link
            href="/services/web-applications"
            className="group flex items-center gap-3 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <ArrowDownRight
              size={17}
              className="rotate-[135deg] transition-transform group-hover:-translate-x-1"
            />
            <span>
              <span className="block text-xs">Previous service</span>
              <span className="mt-1 block font-semibold text-[var(--text-primary)]">
                Web Applications
              </span>
            </span>
          </Link>

          <Link
            href="/services/ai-systems"
            className="group flex items-center gap-3 self-start text-left sm:self-auto sm:text-right"
          >
            <span>
              <span className="block text-xs text-[var(--text-secondary)]">
                Next service
              </span>
              <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                AI Systems
              </span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card)] transition group-hover:border-[var(--accent)]">
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </nav>

      <style jsx>{`
        .automation-heading-glow {
          color: var(--text-primary);
          text-shadow:
            0 0 24px var(--selection),
            0 0 55px var(--selection);
        }

        .automation-band-glow {
          background:
            radial-gradient(
              ellipse at 15% 35%,
              var(--selection),
              transparent 45%
            ),
            radial-gradient(
              ellipse at 90% 70%,
              var(--selection),
              transparent 38%
            );
          opacity: 0.48;
          animation: automation-band-breathe 8s ease-in-out infinite;
        }

        .automation-page .automation-control-panel {
          box-shadow: 0 10px 40px var(--selection);
        }

        .automation-page .automation-safeguard {
          animation: automation-safeguard-in 550ms ease both;
        }

        .automation-page .automation-principle {
          animation: automation-principle-in 600ms ease both;
        }

        .automation-page .automation-final-cta {
          isolation: isolate;
        }

        .automation-page .automation-cta-glow {
          background:
            radial-gradient(
              ellipse at 15% 80%,
              var(--selection),
              transparent 48%
            ),
            radial-gradient(ellipse at 85% 15%, var(--accent), transparent 45%);
          opacity: 0.28;
          animation: automation-cta-breathe 7s ease-in-out infinite;
        }

        .automation-page .automation-cta-orbit {
          animation: automation-orbit 32s linear infinite;
        }

        .automation-page .cta-orbit-two {
          animation-direction: reverse;
          animation-duration: 23s;
        }

        @keyframes automation-band-breathe {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes automation-safeguard-in {
          from {
            opacity: 0.4;
            transform: translateX(-7px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes automation-principle-in {
          from {
            opacity: 0.6;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes automation-cta-breathe {
          0%,
          100% {
            opacity: 0.18;
          }
          50% {
            opacity: 0.45;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .automation-page *,
          .automation-page *::before,
          .automation-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
