"use client";

import { type ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Palette, WandSparkles } from "lucide-react";
import ControlBrand from "@/components/default/design-lab/control-brand";
import ControlConversion from "@/components/default/design-lab/control-conversion";
import ControlImagery from "@/components/default/design-lab/control-imagery";
import ControlMotion from "@/components/default/design-lab/control-motion";
import ControlSiteType from "@/components/default/design-lab/control-site-type";
import ControlTheme from "@/components/default/design-lab/control-theme";
import type {
  AnimationType,
  SiteType,
  ThemeType,
} from "@/components/default/design-lab/types";

export default function DesignLabControls({
  siteType,
  setSiteType,
  themeType,
  setThemeType,
  animation,
  setAnimation,
  keywords,
  setKeywords,
  siteName,
  setSiteName,
  showCta,
  setShowCta,
  uploadedImages,
  onImageUpload,
  onRemoveImage,
  showOptions,
  setShowOptions,
  onRegenerate,
}: {
  siteType: SiteType;
  setSiteType: (id: SiteType) => void;
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
  animation: AnimationType;
  setAnimation: (animation: AnimationType) => void;
  keywords: string;
  setKeywords: (value: string) => void;
  siteName: string;
  setSiteName: (value: string) => void;
  showCta: boolean;
  setShowCta: (value: boolean) => void;
  uploadedImages: string[];
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  showOptions: boolean;
  setShowOptions: (value: boolean) => void;
  onRegenerate: () => void;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="sticky top-4 flex h-[calc(100vh-2rem)] min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-md)]"
    >
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex w-full shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] p-5 text-left transition-colors hover:bg-[var(--surface-hover)]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-active)]">
            <Palette size={17} />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
              Design controls
            </p>
            <p className="mt-1 text-[11px] text-[var(--text-muted)]">
              Make it yours
            </p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-[var(--text-secondary)] transition-transform ${showOptions ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {showOptions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="min-h-0 flex-1 overflow-hidden"
          >
            <div className="h-full space-y-6 overflow-y-auto overscroll-contain p-5">
              <ControlSiteType siteType={siteType} setSiteType={setSiteType} />

              <div className="h-px bg-[var(--border-subtle)]" />

              <ControlBrand
                siteName={siteName}
                setSiteName={setSiteName}
                keywords={keywords}
                setKeywords={setKeywords}
              />

              <div className="h-px bg-[var(--border-subtle)]" />

              <ControlTheme
                themeType={themeType}
                setThemeType={setThemeType}
              />

              <div className="h-px bg-[var(--border-subtle)]" />

              <ControlMotion
                animation={animation}
                setAnimation={setAnimation}
              />

              <div className="h-px bg-[var(--border-subtle)]" />

              <ControlImagery
                uploadedImages={uploadedImages}
                onImageUpload={onImageUpload}
                onRemoveImage={onRemoveImage}
              />

              <div className="h-px bg-[var(--border-subtle)]" />

              <ControlConversion showCta={showCta} setShowCta={setShowCta} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] p-4">
        <button
          onClick={onRegenerate}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-active)] px-4 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] hover:shadow-[var(--shadow-md)]"
        >
          <WandSparkles
            size={16}
            className="transition-transform group-hover:rotate-12"
          />
          Generate layout
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
        <p className="mt-2 text-center text-[10px] text-[var(--text-muted)]">
          Instant preview · No account needed
        </p>
      </div>
    </motion.aside>
  );
}
