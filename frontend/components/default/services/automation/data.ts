import {
  Activity,
  Bell,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  FileText,
  Inbox,
  Mail,
  Network,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const automationServices = [
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

export const workflowExamples = [
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

export const processStages = [
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

export const faqs = [
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
