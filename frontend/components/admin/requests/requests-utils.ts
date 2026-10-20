import type { Request, RequestFilter } from "@/lib/inbox/request-types";

export function filterRequests(
  requests: Request[],
  search: string,
  filter: RequestFilter,
) {
  const query = search.trim().toLowerCase();

  return requests.filter((request) => {
    const matchesFilter = filter === "All" || request.status === filter;

    if (!matchesFilter) {
      return false;
    }

    if (!query) {
      return true;
    }

    return (
      request.name.toLowerCase().includes(query) ||
      request.email.toLowerCase().includes(query) ||
      request.subject?.toLowerCase().includes(query) ||
      request.company?.toLowerCase().includes(query) ||
      request.message.toLowerCase().includes(query) ||
      request.id.toLowerCase().includes(query)
    );
  });
}
