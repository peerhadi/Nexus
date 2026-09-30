import type { Conversation } from "./inbox-types";

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function filterConversations(
  conversations: Conversation[],
  search: string,
) {
  const query = search.toLowerCase().trim();

  if (!query) return conversations;

  return conversations.filter(
    (conversation) =>
      conversation.sender.toLowerCase().includes(query) ||
      conversation.email.toLowerCase().includes(query) ||
      conversation.subject.toLowerCase().includes(query) ||
      conversation.type.toLowerCase().includes(query),
  );
}
