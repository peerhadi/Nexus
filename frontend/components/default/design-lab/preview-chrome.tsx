"use client";

import { Monitor, Smartphone } from "lucide-react";
import type { Theme } from "@/components/default/design-lab/types";

export default function PreviewChrome({
  theme,
  brand,
  mobile,
  onToggleMobile,
}: {
  theme: Theme;
  brand: string;
  mobile: boolean;
  onToggleMobile: () => void;
}) {
  return (
    <div
      className="flex h-11 items-center justify-between border-b px-3"
      style={{ background: theme.surface, borderColor: theme.border }}
    >
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff6259]" />
        <span className="h-2 w-2 rounded-full bg-[#ffc044]" />
        <span className="h-2 w-2 rounded-full bg-[#36c96f]" />
      </div>

      <div
        className="flex max-w-[55%] items-center gap-2 truncate rounded-full px-3 py-1 text-[9px]"
        style={{ background: theme.background, color: theme.muted }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {brand.toLowerCase().replace(/\s+/g, "")}.studio
      </div>

      <button
        onClick={onToggleMobile}
        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px]"
        style={{ color: theme.muted }}
      >
        {mobile ? <Monitor size={13} /> : <Smartphone size={13} />}
        {mobile ? "Desktop" : "Mobile"}
      </button>
    </div>
  );
}
