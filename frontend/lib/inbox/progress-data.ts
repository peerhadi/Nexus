import type { Project } from "./progress-types";

export const initialProjects: Project[] = [
  {
    id: "PRJ-001",
    client: "Arman Khan",
    email: "arman@example.com",
    name: "Daily workflow automation",
    type: "Automation",
    progress: 68,
    status: "On track",
    color: "#7c3aed",
    light: "#f3e8ff",
    deadline: "Oct 8, 2026",
    todos: [
      { id: 1, text: "Connect spreadsheet workflow", done: true },
      { id: 2, text: "Build automated email step", done: true },
      { id: 3, text: "Add error handling", done: false },
      { id: 4, text: "Client testing", done: false },
    ],
    updates: [
      {
        id: 1,
        text: "Email automation is now connected and running successfully.",
        date: "Today, 5:42 PM",
      },
      {
        id: 2,
        text: "Finished the first version of the spreadsheet pipeline.",
        date: "Sep 29, 2026",
      },
    ],
  },
  {
    id: "PRJ-002",
    client: "Sara Mehta",
    email: "sara@example.com",
    name: "Client reporting automation",
    type: "Automation",
    progress: 42,
    status: "On track",
    color: "#0891b2",
    light: "#cffafe",
    deadline: "Oct 18, 2026",
    todos: [
      { id: 1, text: "Connect data sources", done: true },
      { id: 2, text: "Create report generator", done: false },
      { id: 3, text: "Add scheduled delivery", done: false },
      { id: 4, text: "Client review", done: false },
    ],
    updates: [
      {
        id: 1,
        text: "Data source connections are being tested.",
        date: "Sep 30, 2026",
      },
    ],
  },
  {
    id: "PRJ-003",
    client: "Dev Patel",
    email: "dev@example.com",
    name: "Internal AI assistant",
    type: "AI System",
    progress: 27,
    status: "Needs attention",
    color: "#f97316",
    light: "#ffedd5",
    deadline: "Oct 25, 2026",
    todos: [
      { id: 1, text: "Define knowledge sources", done: true },
      { id: 2, text: "Build retrieval layer", done: false },
      { id: 3, text: "Create assistant interface", done: false },
      { id: 4, text: "Internal testing", done: false },
    ],
    updates: [
      {
        id: 1,
        text: "Waiting on access to the client's internal documents.",
        date: "Sep 29, 2026",
      },
    ],
  },
  {
    id: "PRJ-004",
    client: "Mira Shah",
    email: "mira@example.com",
    name: "Team operations dashboard",
    type: "Internal Tool",
    progress: 91,
    status: "On track",
    color: "#16a34a",
    light: "#dcfce7",
    deadline: "Oct 3, 2026",
    todos: [
      { id: 1, text: "Dashboard interface", done: true },
      { id: 2, text: "Connect project data", done: true },
      { id: 3, text: "Permissions", done: true },
      { id: 4, text: "Final QA", done: false },
    ],
    updates: [
      {
        id: 1,
        text: "Final QA is underway. Everything else is complete.",
        date: "Today, 11:18 AM",
      },
    ],
  },
];
