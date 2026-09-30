export type Status = "New" | "Replied" | "Waiting" | "Closed";

export type Conversation = {
  id: string;
  sender: string;
  email: string;
  subject: string;
  status: Status;
  received: string;
  type: string;
  budget: string;
  timeline: string;
  message: string;
};
