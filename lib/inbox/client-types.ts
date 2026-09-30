export type ClientStatus = "Lead" | "Active" | "Completed";

export type Client = {
  id: string;
  name: string;
  email: string;
  initials: string;
  status: ClientStatus;
  type: string;
  requests: number;
  projects: number;
  lastActivity: string;
  lastSubject: string;
};

export type ClientFilter = "All" | ClientStatus;
