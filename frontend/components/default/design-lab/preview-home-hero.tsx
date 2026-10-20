"use client";

import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import type {
  NavigateTo,
  SiteType,
  Theme,
} from "@/components/default/design-lab/types";

export default function PreviewHomeHero({
  theme,
  siteType,
  words,
  navigateTo,
}: {
  theme: Theme;
  siteType: SiteType;
  words: string[];
  navigateTo: NavigateTo;
}) {
  return (
    <section
      className="relative flex min-h-[310px] flex-col justify-center overflow-hidden px-5 py-10 sm:px-8"
      style={{ background: theme.hero }}
    >
      <div className="relative z-10 max-w-[470px]">
        <span
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
          style={{
            borderColor: theme.border,
            background: theme.surface,
            color: theme.muted,
          }}
        >
          <Sparkles size={11} />
          {siteType === "ecommerce"
            ? "The everyday edit"
            : siteType === "portfolio"
              ? "Independent creative studio"
              : siteType === "restaurant"
                ? "Fresh from our kitchen"
                : "A better way to work"}
        </span>

        <h1 className="max-w-[420px] text-3xl font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl">
          {siteType === "ecommerce" ? (
            <>
              Good things.
              <br />
              <span style={{ color: theme.muted }}>Made to last.</span>
            </>
          ) : siteType === "portfolio" ? (
            <>
              Thoughtful work.
              <br />
              <span style={{ color: theme.muted }}>Meaningful impact.</span>
            </>
          ) : siteType === "restaurant" ? (
            <>
              A little closer
              <br />
              <span style={{ color: theme.muted }}>to the good stuff.</span>
            </>
          ) : (
            <>
              Less busywork.
              <br />
              <span style={{ color: theme.muted }}>More momentum.</span>
            </>
          )}
        </h1>

        <p
          className="mt-4 max-w-[350px] text-[11px] leading-[1.9] sm:text-xs"
          style={{ color: theme.muted }}
        >
          {siteType === "ecommerce"
            ? "Everyday essentials, considered materials, and pieces made to stay in your rotation."
            : siteType === "portfolio"
              ? "A small independent practice building memorable identities and useful digital experiences."
              : siteType === "restaurant"
                ? "Seasonal ingredients, thoughtful cooking, and a warm welcome at every table."
                : "Bring your projects, people, and everyday workflows together in one clear workspace."}
        </p>

        {words.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {words.slice(0, 3).map((word) => (
              <span
                key={word}
                className="rounded-full border px-2.5 py-1 text-[9px]"
                style={{
                  borderColor: theme.border,
                  background: theme.surface,
                  color: theme.muted,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() =>
              navigateTo(
                siteType === "ecommerce"
                  ? "#shop"
                  : siteType === "portfolio"
                    ? "#projects"
                    : siteType === "restaurant"
                      ? "#menu"
                      : "#features",
              )
            }
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[10px] font-semibold"
            style={{
              background: theme.accent,
              color: theme.accentText,
            }}
          >
            {siteType === "ecommerce"
              ? "Explore the collection"
              : siteType === "portfolio"
                ? "View selected work"
                : siteType === "restaurant"
                  ? "Explore the menu"
                  : "Explore the platform"}
            <ArrowRight size={13} />
          </button>

          <button
            onClick={() => navigateTo("#about")}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-[10px] font-semibold"
            style={{ borderColor: theme.border }}
          >
            Our story
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -right-12 top-4 hidden h-56 w-56 rounded-full sm:block"
        style={{
          background: `radial-gradient(circle, ${theme.accent}55, transparent 70%)`,
        }}
      />
    </section>
  );
}
