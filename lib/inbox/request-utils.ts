import type { Request, RequestFilter } from "./types";

export function filterRequests(
  requests: Request[],
  search: string,
  filter: RequestFilter,
) {
  const query = search.toLowerCase().trim();

  return requests.filter((request) => {
    const matchesSearch =
      !query ||
      request.id.toLowerCase().includes(query) ||
      request.name.toLowerCase().includes(query) ||
      request.email.toLowerCase().includes(query) ||
      request.subject.toLowerCase().includes(query) ||
      request.type.toLowerCase().includes(query);

    const matchesFilter = filter === "All" || request.status === filter;

    return matchesSearch && matchesFilter;
  });
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}
