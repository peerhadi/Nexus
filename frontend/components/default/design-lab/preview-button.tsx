"use client";

import type { Theme } from "@/components/default/design-lab/types";

export default function PreviewButton({
  children,
  theme,
  secondary = false,
  onClick,
}: {
  children: React.ReactNode;
  theme: Theme;
  secondary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold transition duration-200 hover:-translate-y-0.5"
      style={{
        background: secondary ? theme.surface : theme.accent,
        color: secondary ? theme.text : theme.accentText,
        border: `1px solid ${secondary ? theme.border : theme.accent}`,
      }}
    >
      {children}
    </button>
  );
}
