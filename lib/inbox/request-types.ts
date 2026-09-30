export type Status = "New" | "Reviewing" | "Accepted" | "Declined";

export type Request = {
  id: string;
  name: string;
  email: string;
  subject: string;
  type: string;
  status: Status;
  received: string;
  budget: string;
  timeline: string;
  message: string;
};

export type RequestFilter = Status | "All";
