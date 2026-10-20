import type { WorkProject } from "./types";

export const notifierProject: WorkProject = {
  id: "dps-campus-event-notifier",
  title: "DPS Campus Event Notifier",
  category: "Automation",
  status: "Project",
  tagline: "Turn campus messages into calendar-ready events.",
  description:
    "A TypeScript and Gemini project that extracts event details from campus messages and produces a calendar-ready ICS file.",
  overview:
    "Campus announcements can contain useful event information inside ordinary messages. This project explores a practical transformation: take a message, identify the relevant event details, and produce an ICS calendar file that can be imported into a calendar application.",
  repository: "https://github.com/peerhadi/DPS-Campus-Event-Notifier",
  website: null,
  gradient: "var(--gradient-orange-pink)",
  accentGradient: "var(--gradient-emerald-cyan)",
  visual: "notifier",
  heroEyebrow: "From message to calendar",
  heroStatement:
    "An event hidden in a message should not stay trapped in a message.",
  projectType: "Message processing and calendar-file generation",
  focusAreas: [
    "TypeScript",
    "Gemini",
    "Event detail extraction",
    "Date and time handling",
    "ICS generation",
    "Calendar workflow",
  ],
  technologies: [
    {
      name: "TypeScript",
      role: "A named technology used by the project.",
      verified: true,
    },
    {
      name: "Gemini",
      role: "The AI service used in the project.",
      verified: true,
    },
    {
      name: "ICS",
      role: "The calendar-file format produced by the project.",
      verified: true,
    },
    {
      name: "Message-to-event workflow",
      role: "The core transformation demonstrated in this case study.",
      verified: true,
    },
  ],
  capabilities: [
    {
      number: "01",
      title: "Start with a campus message",
      description:
        "Work from the text of an announcement instead of manually re-entering every detail.",
      detail:
        "Messages are the input. The aim is to identify the parts that make an announcement actionable as a calendar event.",
      icon: "message",
    },
    {
      number: "02",
      title: "Identify event details",
      description:
        "Use Gemini to help extract relevant information such as event names and dates.",
      detail:
        "The extraction step is the bridge between natural-language announcements and structured event information.",
      icon: "extract",
    },
    {
      number: "03",
      title: "Structure the result",
      description:
        "Turn the relevant details into an event-shaped representation.",
      detail:
        "Structured information is easier to validate and use as input for a calendar file than a paragraph of announcement text.",
      icon: "structure",
    },
    {
      number: "04",
      title: "Generate a calendar file",
      description:
        "Produce an ICS file that can be used with compatible calendar applications.",
      detail:
        "The output is designed to fit an existing calendar workflow rather than forcing the user to keep checking the original message.",
      icon: "calendar",
    },
  ],
  workflow: [
    {
      number: "01",
      title: "Announcement",
      description: "Provide the text of a campus event message.",
      output: "Unstructured message text",
    },
    {
      number: "02",
      title: "Extraction",
      description:
        "Use Gemini to identify the event information present in the message.",
      output: "Candidate event details",
    },
    {
      number: "03",
      title: "Structuring",
      description:
        "Prepare the extracted information for calendar-file generation.",
      output: "Structured event data",
    },
    {
      number: "04",
      title: "Calendar output",
      description: "Produce a calendar-ready ICS file.",
      output: "An importable event file",
    },
  ],
  deepDive: [
    {
      eyebrow: "01 / The input",
      title: "Announcements are written for people, not calendars.",
      description:
        "A campus message may contain an event name, a date, a time, a venue, and other context in a single block of natural language. A calendar needs those details represented in a more structured form.",
      bullets: [
        "The original message is the starting point.",
        "Event details may appear as part of a longer announcement.",
        "The useful information must be separated from the surrounding text.",
        "The output needs to fit a calendar workflow.",
      ],
    },
    {
      eyebrow: "02 / The transformation",
      title: "Convert natural language into event information.",
      description:
        "The project uses Gemini as part of the extraction workflow. This creates a clear boundary between interpreting a message and producing a calendar file from the resulting details.",
      bullets: [
        "Identify the event-related information in the message.",
        "Represent extracted details in a structured form.",
        "Keep the generated event output distinct from the original message.",
        "Avoid treating illustrative sample data as a verified real announcement.",
      ],
    },
    {
      eyebrow: "03 / The output",
      title: "Make the result useful beyond the original message.",
      description:
        "The ICS format provides the bridge to compatible calendar applications. The purpose is to make an announcement easier to carry into a calendar-based workflow.",
      bullets: [
        "Generate a calendar-ready ICS file.",
        "Make the output recognizable as an event rather than plain text.",
        "Keep the workflow focused on practical use.",
        "Remember that extracted details should be checked when an announcement is ambiguous.",
      ],
    },
  ],
  principles: [
    {
      title: "Automate repetitive work",
      description:
        "Reduce the amount of event information that has to be re-entered manually.",
    },
    {
      title: "Separate interpretation from output",
      description:
        "Extract details first, then represent them in a format a calendar can use.",
    },
    {
      title: "Make the result portable",
      description:
        "An ICS file can be used with compatible calendar applications.",
    },
    {
      title: "Treat dates carefully",
      description:
        "Calendar information is only useful when the event details are represented clearly and accurately.",
    },
  ],
  showcase: {
    eyebrow: "Interactive workflow concept",
    title: "Watch an announcement become a calendar event.",
    description:
      "This visual demonstration presents an illustrative campus announcement, the event details identified from it, and a sample ICS-style output. It shows the transformation at the heart of the project.",
    note: "The sample announcement and extracted event below are fictional demonstration content. They are not live campus data and do not represent a request sent to Gemini.",
  },
  challenges: [
    {
      title: "Extracting details from natural language",
      problem:
        "A message is written for human readers and may not present event details in a consistent structure.",
      approach:
        "Use Gemini as part of a workflow that identifies event information before preparing calendar output.",
    },
    {
      title: "Turning text into structured information",
      problem:
        "Calendar files require event-oriented fields rather than a block of announcement text.",
      approach:
        "Separate the extraction step from the calendar-file generation step.",
    },
    {
      title: "Making the output practical",
      problem:
        "Extracted information is most useful when it can move into a tool people already use.",
      approach:
        "Produce an ICS file that compatible calendar applications can import.",
    },
  ],
  faqs: [
    {
      question: "What does the Campus Event Notifier do?",
      answer:
        "It uses TypeScript and Gemini to extract event details from campus messages and produce a calendar-ready ICS file.",
    },
    {
      question: "What is an ICS file?",
      answer:
        "ICS is a calendar data format supported by many calendar applications. The project uses it as the output format for extracted events.",
    },
    {
      question: "Does this page process real messages?",
      answer:
        "No. The animated showcase uses fictional sample content to demonstrate the workflow. It does not send a message to Gemini or generate a real event file.",
    },
    {
      question: "Where can I inspect the project?",
      answer: "The public GitHub repository is linked on this page.",
    },
  ],
  galleryLabels: [
    "Message input",
    "Event extraction",
    "Structured details",
    "ICS calendar output",
  ],
  nextProjectText:
    "From automating a focused workflow to exploring the foundations of an engine.",
};
