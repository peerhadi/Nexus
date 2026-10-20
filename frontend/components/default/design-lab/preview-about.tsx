"use client";

import { ArrowLeft } from "lucide-react";
import { stockImages } from "@/components/default/design-lab/data";
import type {
  NavigateTo,
  SiteType,
  Theme,
} from "@/components/default/design-lab/types";

export default function PreviewAbout({
  theme,
  siteType,
  brand,
  images,
  navigateTo,
}: {
  theme: Theme;
  siteType: SiteType;
  brand: string;
  images: string[];
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
        Our story
      </p>
      <h1 className="mt-2 max-w-lg text-2xl font-semibold leading-tight tracking-tight">
        {siteType === "ecommerce"
          ? "Fewer things. Better things."
          : siteType === "portfolio"
            ? "Good work starts with good questions."
            : siteType === "restaurant"
              ? "A neighbourhood place, made with care."
              : "Built around how people work."}
      </h1>
      <p
        className="mt-3 max-w-lg text-[10px] leading-[1.9]"
        style={{ color: theme.muted }}
      >
        {siteType === "ecommerce"
          ? `${brand} began with a simple idea: everyday products should be useful, well made, and enjoyable to live with. We work with considered materials and trusted makers to create things that earn their place.`
          : siteType === "portfolio"
            ? `${brand} is an independent creative practice led by Alex Morgan and a close network of collaborators. We partner with people who care about the details, from the first conversation to the final launch.`
            : siteType === "restaurant"
              ? `${brand} was started by chef Olivia Bennett and host Daniel Reed with a simple goal: serve thoughtful seasonal food in a place where everyone feels welcome.`
              : `${brand} was created to make everyday work feel more connected. We believe teams do their best work when plans, conversations, and decisions live in one clear place.`}
      </p>

      <div
        className="mt-5 overflow-hidden rounded-xl"
        style={{ background: theme.hero }}
      >
        <img
          src={images[0] || stockImages[0]}
          alt={`${brand} studio`}
          className="h-36 w-full object-cover sm:h-44"
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          {
            title: "Thoughtful by design",
            text: "Every decision has a reason, from the materials we choose to the details people notice first.",
          },
          {
            title: "People come first",
            text: "Good work grows from honest conversations, trust, and paying attention to real needs.",
          },
          {
            title: "Built for the long run",
            text: "We value quality, clarity, and solutions that remain useful beyond the first impression.",
          },
          {
            title: "Always improving",
            text: "We learn from the people who use what we make and carry those lessons into every next step.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-xl border p-3"
            style={{ borderColor: theme.border }}
          >
            <h3 className="text-[10px] font-semibold">{item.title}</h3>
            <p
              className="mt-2 text-[9px] leading-relaxed"
              style={{ color: theme.muted }}
            >
              {item.text}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex -space-x-2">
          {["AM", "OB", "DR"].map((initials, index) => (
            <span
              key={initials}
              className="flex h-8 w-8 items-center justify-center rounded-full border text-[9px] font-semibold"
              style={{
                background: index === 1 ? theme.accent : theme.hero,
                borderColor: theme.surface,
                color: index === 1 ? theme.accentText : theme.text,
              }}
            >
              {initials}
            </span>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-semibold">
            A small team with a shared point of view.
          </p>
          <p className="mt-1 text-[9px]" style={{ color: theme.muted }}>
            Alex Morgan · Olivia Bennett · Daniel Reed
          </p>
        </div>
      </div>
    </section>
  );
}
