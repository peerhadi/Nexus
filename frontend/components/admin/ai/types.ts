export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

export type AIMessage = {
  id: string;
  role: "USER" | "ASSISTANT" | "user" | "assistant" | string;
  content: string;
  createdAt: string;
};

export type AIConversation = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _count?: { messages: number };
};

export type ApiError = { error?: string; message?: string };
