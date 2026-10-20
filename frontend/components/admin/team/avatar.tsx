"use client";

import { displayName, initials } from "./format";
import type { Admin } from "./types";

export function Avatar({
  admin,
  size = "md",
}: {
  admin?: Admin | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "h-8 w-8 text-[10px] rounded-xl",
    md: "h-9 w-9 text-xs rounded-xl",
    lg: "h-11 w-11 text-sm rounded-2xl",
  }[size];

  return (
    <div
      title={displayName(admin)}
      className={`grid shrink-0 place-items-center border border-[var(--border)] bg-[var(--surface-secondary)] font-bold text-[var(--text)] ${sizeClass}`}
    >
      {initials(admin?.name, admin?.email)}
    </div>
  );
}
