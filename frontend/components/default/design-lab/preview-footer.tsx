"use client";

import type { NavigateTo, Theme } from "@/components/default/design-lab/types";

export default function PreviewFooter({
  theme,
  brand,
  navigateTo,
}: {
  theme: Theme;
  brand: string;
  navigateTo: NavigateTo;
}) {
  return (
    <footer
      className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t px-4 py-4 text-[9px] sm:px-6"
      style={{ borderColor: theme.border, color: theme.muted }}
    >
      <span>© 2026 {brand}. Made with intention.</span>
      <div className="flex items-center gap-3">
        <button onClick={() => navigateTo("#about")}>About</button>
        <button onClick={() => navigateTo("#contact")}>Contact</button>
        <button onClick={() => navigateTo("#top")}>Home ↑</button>
      </div>
    </footer>
  );
}
