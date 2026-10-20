import type { Admin } from "./types";

export function initials(name?: string | null, email?: string) {
  const value = name?.trim() || email?.split("@")[0] || "A";

  return value
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function displayName(admin?: Admin | null) {
  return admin?.name?.trim() || admin?.email || "Admin";
}

export function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDate(value: string) {
  const date = new Date(value);

  if (date.toDateString() === new Date().toDateString()) {
    return "Today";
  }

  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year:
      date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  }).format(date);
}
