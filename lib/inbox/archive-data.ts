import type { ArchiveItem, ArchiveFilter } from "./archive-types";

export const archivedItems: ArchiveItem[] = [
  {
    id: "ARC-001",
    name: "Arman Khan",
    email: "arman@example.com",
    type: "Automation",
    subject: "Daily workflow automation",
    message:
      "Hey Nexus, we ended up getting this workflow fully sorted and the project is now complete. Just keeping the conversation here for reference in case we need to revisit anything later.",
    archived: "Sep 24, 2026",
    reason: "Completed",
  },
  {
    id: "ARC-002",
    name: "Sara Mehta",
    email: "sara@example.com",
    type: "Website",
    subject: "Landing page redesign",
    message:
      "Thanks for going through the details with us. We've decided to pause the redesign for now and will reach back out when we're ready to continue.",
    archived: "Sep 21, 2026",
    reason: "Closed",
  },
  {
    id: "ARC-003",
    name: "Dev Patel",
    email: "dev@example.com",
    type: "AI System",
    subject: "Internal AI assistant",
    message:
      "We reviewed the proposed system and decided not to move forward with the project at this stage. Appreciate all the time spent discussing it.",
    archived: "Sep 18, 2026",
    reason: "Declined",
  },
  {
    id: "ARC-004",
    name: "Mira Shah",
    email: "mira@example.com",
    type: "Internal Tool",
    subject: "Team operations dashboard",
    message:
      "The dashboard has been delivered and everything is working as expected. Closing this conversation out for now.",
    archived: "Sep 14, 2026",
    reason: "Completed",
  },
  {
    id: "ARC-005",
    name: "Zoya Ali",
    email: "zoya@example.com",
    type: "Automation",
    subject: "Lead processing workflow",
    message:
      "We've decided to handle this workflow internally for now, so we'll be closing the request.",
    archived: "Sep 10, 2026",
    reason: "Closed",
  },
];

export const archiveFilters: {
  label: string;
  value: ArchiveFilter;
}[] = [
  { label: "All", value: "All" },
  { label: "Done", value: "Completed" },
  { label: "Closed", value: "Closed" },
  { label: "Declined", value: "Declined" },
];
