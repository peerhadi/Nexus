import type { Conversation } from "./inbox-types";

export const conversations: Conversation[] = [
  {
    id: "REQ-001",
    sender: "Arman Khan",
    email: "arman@example.com",
    subject: "Automating our daily workflow",
    status: "New",
    received: "Today, 9:42 PM",
    type: "Automation",
    budget: "₹15k – ₹30k",
    timeline: "1–2 weeks",
    message:
      "Hey Nexus, we currently repeat the same process every morning and would like to automate most of it. It involves collecting information, putting it into a spreadsheet, and then sending a few emails. We'd like to know if this is something you can build for us.",
  },
  {
    id: "REQ-002",
    sender: "Sara Mehta",
    email: "sara@example.com",
    subject: "Client reporting automation",
    status: "Replied",
    received: "Sep 28, 2026",
    type: "Automation",
    budget: "₹30k – ₹60k",
    timeline: "2–4 weeks",
    message:
      "We're spending a lot of time manually preparing recurring client reports. We'd like to connect our existing data sources and automate the reporting process.",
  },
  {
    id: "REQ-003",
    sender: "Dev Patel",
    email: "dev@example.com",
    subject: "AI-assisted internal system",
    status: "Waiting",
    received: "Sep 27, 2026",
    type: "AI System",
    budget: "₹40k – ₹80k",
    timeline: "3–5 weeks",
    message:
      "We're exploring an internal AI system that can help our team find information and handle repetitive internal tasks.",
  },
];
