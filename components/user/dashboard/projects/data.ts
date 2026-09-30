export const projects = [
  {
    id: "nexus-portal",
    name: "Nexus Portal",
    type: "Web application",
    status: "In development",
    progress: 68,
    due: "Oct 8",
    description:
      "A custom client portal for managing projects, communication and milestones.",
    gradient: "from-violet-400 via-fuchsia-400 to-pink-400",
  },
  {
    id: "automation",
    name: "Lead Automation",
    type: "Automation",
    status: "Planning",
    progress: 35,
    due: "Oct 14",
    description:
      "An automated workflow that handles lead collection and processing.",
    gradient: "from-cyan-400 via-blue-400 to-violet-400",
  },
];

export const milestones = [
  ["Discovery", "Completed", true],
  ["Design", "Completed", true],
  ["Development", "In progress", false],
  ["Testing", "Upcoming", false],
  ["Launch", "Upcoming", false],
] as const;
