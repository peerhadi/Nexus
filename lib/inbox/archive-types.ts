export type ArchiveReason = "Completed" | "Declined" | "Closed";

export type ArchiveItem = {
  id: string;
  name: string;
  email: string;
  type: string;
  subject: string;
  message: string;
  archived: string;
  reason: ArchiveReason;
};

export type ArchiveFilter = "All" | ArchiveReason;
