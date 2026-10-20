import type { RecordItem } from "./dashboard-types";

export function recordsFrom(value: unknown): RecordItem[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is RecordItem => typeof item === "object" && item !== null,
    );
  }

  if (typeof value !== "object" || value === null) return [];

  const object = value as RecordItem;

  for (const key of [
    "data",
    "items",
    "results",
    "requests",
    "projects",
    "conversations",
  ]) {
    if (Array.isArray(object[key])) {
      return recordsFrom(object[key]);
    }
  }

  return [];
}

export function objectFrom(value: unknown): RecordItem | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const object = value as RecordItem;

  if (
    typeof object.data === "object" &&
    object.data !== null &&
    !Array.isArray(object.data)
  ) {
    return object.data as RecordItem;
  }

  return object;
}

export function numberFrom(
  object: RecordItem | null,
  keys: string[],
  fallback: number,
) {
  if (!object) return fallback;

  for (const key of keys) {
    const value = object[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return fallback;
}

export function statusOf(item: RecordItem) {
  return String(item.status ?? "").toUpperCase();
}

export function recordTitle(item: RecordItem) {
  for (const key of ["subject", "title", "name", "email"]) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) return value;
  }

  return "Untitled record";
}

export function recordSubtitle(item: RecordItem) {
  for (const key of ["email", "clientEmail", "description", "status"]) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) return value;
  }

  return "No additional details";
}

export function recordDate(item: RecordItem) {
  return item.updatedAt ?? item.createdAt ?? item.timestamp;
}

export function formatDate(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "Date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function isOpenConversation(item: RecordItem) {
  return !["CLOSED", "ARCHIVED"].includes(statusOf(item));
}

export function isPendingRequest(item: RecordItem) {
  return ["NEW", "PENDING"].includes(statusOf(item));
}

export function isActiveProject(item: RecordItem) {
  return ["IN_PROGRESS", "REVIEW"].includes(statusOf(item));
}
