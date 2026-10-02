export type ConversationStatus = "OPEN" | "CLOSED";

export type MessageSender = "CLIENT" | "ADMIN";

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  senderType: MessageSender;
  createdAt: string;
  updatedAt: string;
};

export type ConversationClient = {
  id: string;
  name: string;
  email: string;
};

export type Conversation = {
  id: string;
  clientId: string;
  subject: string | null;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;

  client: ConversationClient;

  messages: Message[];
};
