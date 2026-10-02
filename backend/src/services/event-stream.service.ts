import type { WebSocket } from "ws";

type EventPayload = {
  type: string;
  conversationId?: string;
  data?: unknown;
};

const connections = new Map<string, Set<WebSocket>>();

export function subscribe(conversationId: string, socket: WebSocket) {
  let clients = connections.get(conversationId);

  if (!clients) {
    clients = new Set();
    connections.set(conversationId, clients);
  }

  clients.add(socket);

  socket.on("close", () => {
    unsubscribe(conversationId, socket);
  });
}

export function unsubscribe(conversationId: string, socket: WebSocket) {
  const clients = connections.get(conversationId);

  if (!clients) {
    return;
  }

  clients.delete(socket);

  if (clients.size === 0) {
    connections.delete(conversationId);
  }
}

export function emit(conversationId: string, event: EventPayload) {
  const clients = connections.get(conversationId);

  if (!clients) {
    return;
  }

  const payload = JSON.stringify(event);

  for (const socket of clients) {
    if (socket.readyState === socket.OPEN) {
      socket.send(payload);
    }
  }
}
