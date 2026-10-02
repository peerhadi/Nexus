export type Conversation = {
  id: string;
  subject: string | null;
  status: "OPEN" | "CLOSED";
  clientId: string;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    content: string;
    senderType: "CLIENT" | "ADMIN";
    createdAt: string;
    sender: {
      id: string;
      name: string;
      email: string;
      role: "CLIENT" | "ADMIN";
    };
  }[];
};
