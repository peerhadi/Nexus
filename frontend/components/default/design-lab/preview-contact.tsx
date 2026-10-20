"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type {
  NavigateTo,
  SiteType,
  Theme,
} from "@/components/default/design-lab/types";

export default function PreviewContact({
  theme,
  siteType,
  brand,
  navigateTo,
}: {
  theme: Theme;
  siteType: SiteType;
  brand: string;
  navigateTo: NavigateTo;
}) {
  return (
    <section className="flex-1 px-5 py-7 sm:px-7">
      <button
        onClick={() => navigateTo("#top")}
        className="mb-5 inline-flex items-center gap-1.5 text-[10px]"
        style={{ color: theme.muted }}
      >
        <ArrowLeft size={12} /> Back home
      </button>

      <p
        className="text-[9px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: theme.muted }}
      >
        Let&apos;s talk
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        {siteType === "restaurant"
          ? "Come spend some time with us."
          : siteType === "ecommerce"
            ? "Need a hand finding something?"
            : siteType === "portfolio"
              ? "Have a good project in mind?"
              : "Ready to make work flow?"}
      </h1>
      <p
        className="mt-2 max-w-md text-[10px] leading-relaxed"
        style={{ color: theme.muted }}
      >
        {siteType === "restaurant"
          ? "Ask about a reservation, an upcoming event, or anything on the menu. We'd love to hear from you."
          : siteType === "ecommerce"
            ? "Questions about an order, product details, or delivery? Our small support team is here to help."
            : siteType === "portfolio"
              ? "Tell us a little about your idea, what you're trying to solve, and where you'd like to take it."
              : "Tell us what your team is working on. We'll help you find a practical way to get started."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_0.85fr]">
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            window.alert(
              "This is a design preview. Connect a form endpoint to receive real submissions.",
            );
          }}
        >
          <div>
            <label className="mb-1.5 block text-[9px] font-medium">
              Your name
            </label>
            <input
              required
              placeholder="Jordan Taylor"
              className="w-full rounded-lg border px-3 py-2.5 text-[10px] outline-none"
              style={{
                borderColor: theme.border,
                background: theme.background,
                color: theme.text,
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[9px] font-medium">
              Email address
            </label>
            <input
              required
              type="email"
              placeholder="jordan@example.com"
              className="w-full rounded-lg border px-3 py-2.5 text-[10px] outline-none"
              style={{
                borderColor: theme.border,
                background: theme.background,
                color: theme.text,
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[9px] font-medium">
              What can we help with?
            </label>
            <select
              className="w-full rounded-lg border px-3 py-2.5 text-[10px] outline-none"
              style={{
                borderColor: theme.border,
                background: theme.background,
                color: theme.text,
              }}
            >
              <option>General enquiry</option>
              <option>Products and pricing</option>
              <option>Project collaboration</option>
              <option>Reservations and events</option>
              <option>Technical support</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-[9px] font-medium">
              Your message
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tell us a little about what you have in mind..."
              className="w-full resize-none rounded-lg border px-3 py-2.5 text-[10px] outline-none"
              style={{
                borderColor: theme.border,
                background: theme.background,
                color: theme.text,
              }}
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-semibold"
            style={{
              background: theme.accent,
              color: theme.accentText,
            }}
          >
            Send enquiry <ArrowUpRight size={12} />
          </button>
        </form>

        <div className="space-y-3">
          <div className="rounded-xl p-4" style={{ background: theme.hero }}>
            <span className="text-[9px]" style={{ color: theme.muted }}>
              EMAIL
            </span>
            <p className="mt-1 text-[10px] font-semibold">
              hello@{brand.toLowerCase().replace(/\s+/g, "")}
              .studio
            </p>
            <p className="mt-1 text-[9px]" style={{ color: theme.muted }}>
              Replies within 1–2 working days
            </p>
          </div>

          <div
            className="rounded-xl border p-4"
            style={{ borderColor: theme.border }}
          >
            <span className="text-[9px]" style={{ color: theme.muted }}>
              {siteType === "restaurant" ? "FIND US" : "STUDIO"}
            </span>
            <p className="mt-1 text-[10px] font-semibold">
              {siteType === "restaurant"
                ? "18 Willow Street"
                : "Independent by nature"}
            </p>
            <p
              className="mt-1 text-[9px] leading-relaxed"
              style={{ color: theme.muted }}
            >
              {siteType === "restaurant"
                ? "Brooklyn, New York · Open Tuesday–Sunday"
                : "Working with thoughtful people, wherever they are."}
            </p>
          </div>

          <div
            className="rounded-xl border p-4"
            style={{ borderColor: theme.border }}
          >
            <span className="text-[9px]" style={{ color: theme.muted }}>
              RESPONSE TIME
            </span>
            <p className="mt-1 text-[10px] font-semibold">
              Usually within two days
            </p>
            <p className="mt-1 text-[9px]" style={{ color: theme.muted }}>
              A real person will get back to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
