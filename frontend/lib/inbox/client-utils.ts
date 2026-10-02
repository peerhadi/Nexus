import type { Client, ClientFilter } from "./client-types";

export function filterClients(
  clients: Client[],
  search: string,
  filter: ClientFilter,
) {
  const query = search.trim().toLowerCase();

  return clients.filter((client) => {
    const matchesFilter = filter === "All" || client.status === filter;

    const matchesSearch =
      !query ||
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.type.toLowerCase().includes(query) ||
      client.lastSubject.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });
}
