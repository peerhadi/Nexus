import type { Conversation } from "./inbox-types";

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function filterConversations(
  conversations: Conversation[],
  search: string,
) {
  const query = search.toLowerCase().trim();

  if (!query) return conversations;

  return conversations.filter((conversation) => {
    const latestMessage =
      conversation.messages?.[conversation.messages.length - 1];

    return (
      conversation.client.name.toLowerCase().includes(query) ||
      conversation.client.email.toLowerCase().includes(query) ||
      conversation.subject?.toLowerCase().includes(query) ||
      conversation.id.toLowerCase().includes(query) ||
      latestMessage?.content.toLowerCase().includes(query)
    );
  });
}
