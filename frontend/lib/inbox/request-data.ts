import type { Request, Status } from "./request-types";

export const requests: Request[] = [
  {
    id: "REQ-001",
    name: "Arman Khan",
    email: "arman@example.com",
    subject: "Automating our daily workflow",
    type: "Automation",
    status: "New",
    received: "Today, 9:42 PM",
    budget: "₹15k – ₹30k",
    timeline: "1–2 weeks",
    message:
      "Hey Nexus, we currently repeat the same process every morning and would like to automate most of it. It involves collecting information, putting it into a spreadsheet, and then sending a few emails. We'd like to know if this is something you can build for us.",
  },
  {
    id: "REQ-002",
    name: "Sara Mehta",
    email: "sara@example.com",
    subject: "Client reporting automation",
    type: "Automation",
    status: "Reviewing",
    received: "Sep 28, 2026",
    budget: "₹30k – ₹60k",
    timeline: "2–4 weeks",
    message:
      "We're spending a lot of time manually preparing recurring client reports. We'd like to connect our existing data sources and automate the reporting process.",
  },
  {
    id: "REQ-003",
    name: "Dev Patel",
    email: "dev@example.com",
    subject: "AI-assisted internal system",
    type: "AI System",
    status: "Reviewing",
    received: "Sep 27, 2026",
    budget: "₹40k – ₹80k",
    timeline: "3–5 weeks",
    message:
      "We're exploring an internal AI system that can help our team find information and handle repetitive internal tasks.",
  },
  {
    id: "REQ-004",
    name: "Mira Shah",
    email: "mira@example.com",
    subject: "Website for a new product",
    type: "Website",
    status: "Accepted",
    received: "Sep 26, 2026",
    budget: "₹50k – ₹90k",
    timeline: "3–4 weeks",
    message:
      "We're launching a new product and need a polished website that explains the product clearly and gives users a strong first impression.",
  },
  {
    id: "REQ-005",
    name: "Zoya Ali",
    email: "zoya@example.com",
    subject: "Internal operations tool",
    type: "Internal Tool",
    status: "Declined",
    received: "Sep 24, 2026",
    budget: "₹20k – ₹40k",
    timeline: "1–2 weeks",
    message:
      "We need a small internal application for organizing our team's daily operations and keeping track of tasks.",
  },
];

export const statusOptions: Status[] = [
  "New",
  "Reviewing",
  "Accepted",
  "Declined",
];
