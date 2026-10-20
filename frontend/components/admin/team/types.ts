export type Admin = {
  id: string;
  name: string | null;
  email: string;
};

export type Message = {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender: Admin;
};

export type Room = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: Admin;
  lastMessage: Message | null;
  _count: { messages: number };
};

export type StreamEvent = {
  type: string;
  conversationId?: string;
  data?: {
    message?: Message;
    messageId?: string;
    roomId?: string;
  };
};
