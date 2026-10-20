import type { Request, RequestFilter } from "@/lib/inbox/request-types";

export const statusOptions: RequestFilter[] = [
  "All",
  "NEW",
  "IN_PROGRESS",
  "REPLIED",
  "CLOSED",
];

export function countByStatus(requests: Request[], status: Request["status"]) {
  return requests.filter((request) => request.status === status).length;
}
