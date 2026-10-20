"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PreviewAbout from "@/components/default/design-lab/preview-about";
import PreviewChrome from "@/components/default/design-lab/preview-chrome";
import PreviewContact from "@/components/default/design-lab/preview-contact";
import PreviewFooter from "@/components/default/design-lab/preview-footer";
import PreviewHeader from "@/components/default/design-lab/preview-header";
import PreviewHome from "@/components/default/design-lab/preview-home";
import PreviewListing from "@/components/default/design-lab/preview-listing";
import type {
  AnimationType,
  SiteType,
  Theme,
} from "@/components/default/design-lab/types";

export default function WebsitePreview({
  siteType,
  theme,
  animation,
  keywords,
  uploadedImages,
  showCta,
  siteName,
}: {
  siteType: SiteType;
  theme: Theme;
  animation: AnimationType;
  keywords: string;
  uploadedImages: string[];
  showCta: boolean;
  siteName: string;
}) {
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("top");

  const words = keywords
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);

  const brand = siteName.trim() || "FORMA";
  const images = uploadedImages.length ? uploadedImages : [];

  const navigateTo = (href: string) => {
    setActivePage(href.replace("#", ""));
    setMenuOpen(false);
  };

  return (
    <div
      className="overflow-hidden rounded-[18px] border shadow-2xl"
      style={{
        background: theme.background,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <PreviewChrome
        theme={theme}
        brand={brand}
        mobile={mobile}
        onToggleMobile={() => setMobile(!mobile)}
      />

      <div
        className="flex justify-center p-2 sm:p-3 h-full"
        style={{ background: theme.background }}
        id="design-lab-site"
      >
        <div
          className="relative overflow-hidden rounded-xl border transition-all duration-300"
          id="scrollContainer"
          style={{
            width: mobile ? "min(100%, 340px)" : "100%",
            height: "min(70vh, 680px)",
            minHeight: "440px",
            borderColor: theme.border,
            background: theme.surface,
          }}
        >
          <div
            className="h-full overflow-y-auto overscroll-contain"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: `${theme.muted} transparent`,
            }}
          >
            <PreviewHeader
              theme={theme}
              siteType={siteType}
              brand={brand}
              activePage={activePage}
              navigateTo={navigateTo}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />

            <AnimatePresence mode="wait">
              <motion.main
                key={activePage}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="flex min-h-[520px] flex-col"
              >
                {activePage === "top" && (
                  <PreviewHome
                    theme={theme}
                    siteType={siteType}
                    words={words}
                    images={images}
                    navigateTo={navigateTo}
                  />
                )}

                {(activePage === "shop" ||
                  activePage === "projects" ||
                  activePage === "menu" ||
                  activePage === "features") && (
                  <PreviewListing
                    theme={theme}
                    siteType={siteType}
                    images={images}
                    navigateTo={navigateTo}
                  />
                )}

                {activePage === "about" && (
                  <PreviewAbout
                    theme={theme}
                    siteType={siteType}
                    brand={brand}
                    images={images}
                    navigateTo={navigateTo}
                  />
                )}

                {activePage === "contact" && (
                  <PreviewContact
                    theme={theme}
                    siteType={siteType}
                    brand={brand}
                    navigateTo={navigateTo}
                  />
                )}

                <PreviewFooter
                  theme={theme}
                  brand={brand}
                  navigateTo={navigateTo}
                />
              </motion.main>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
