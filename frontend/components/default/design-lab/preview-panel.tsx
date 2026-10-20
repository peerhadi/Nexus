"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CircleHelp,
  Code2,
  Eye,
  Layers3,
  Monitor,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { exportWebsite } from "@/components/default/design-lab/export-website";
import { animationOptions } from "@/components/default/design-lab/data";
import WebsitePreview from "@/components/default/design-lab/website-preview";
import type {
  AnimationType,
  SiteType,
  SiteTypeOption,
  Theme,
  ThemeType,
} from "@/components/default/design-lab/types";

export default function PreviewPanel({
  currentSite,
  theme,
  themeType,
  siteType,
  animation,
  keywords,
  uploadedImages,
  showCta,
  siteName,
  generated,
  onRegenerate,
}: {
  currentSite: SiteTypeOption;
  theme: Theme;
  themeType: ThemeType;
  siteType: SiteType;
  animation: AnimationType;
  keywords: string;
  uploadedImages: string[];
  showCta: boolean;
  siteName: string;
  generated: number;
  onRegenerate: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12 }}
      className="min-w-0 text-[var(--text-primary)]"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent-active)]">
            <Eye size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              Live preview
            </h2>
            <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
              {currentSite.label} · {theme.name} ·{" "}
              {
                animationOptions.find((item) => item.id === animation)
                  ?.label
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2 text-[10px] text-[var(--text-secondary)] sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            Preview ready
          </span>

          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[10px] font-medium text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)]"
          >
            <RotateCcw size={12} />
            Refresh
          </button>

          <button
            onClick={() => exportWebsite(siteName)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[10px] font-medium text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)]"
          >
            <Code2 size={12} />
            Export ZIP
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          id="design-lab-preview"
          key={`${generated}-${siteType}-${themeType}-${animation}-${showCta}`}
          initial={{ opacity: 0, y: 12, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.995 }}
          transition={{ duration: 0.28 }}
        >
          <WebsitePreview
            siteType={siteType}
            theme={theme}
            animation={animation}
            keywords={keywords}
            uploadedImages={uploadedImages}
            showCta={showCta}
            siteName={siteName}
          />
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: <Layers3 size={15} />,
            title: "Complete layouts",
            description: "Hero, content, About and Contact sections.",
          },
          {
            icon: <Sparkles size={15} />,
            title: "Motion included",
            description: "Choose how elements enter and move.",
          },
          {
            icon: <Monitor size={15} />,
            title: "Responsive preview",
            description: "Switch between desktop and mobile widths.",
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
            className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--border-strong)]"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-active)]">
                {item.icon}
              </span>
              <h3 className="text-xs font-semibold text-[var(--text-primary)]">
                {item.title}
              </h3>
            </div>
            <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
        <CircleHelp
          size={16}
          className="mt-0.5 shrink-0 text-[var(--accent-active)]"
        />
        <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
          This is a visual layout prototype, not a deployed website.
          Navigation links jump to sections inside the preview; CTAs
          demonstrate placement and can be connected to real destinations
          when the design is implemented.
        </p>
      </div>
    </motion.section>
  );
}
