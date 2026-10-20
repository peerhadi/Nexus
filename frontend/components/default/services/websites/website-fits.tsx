import FloatingScene from "./floating-scene";
import LightbulbIcon from "./lightbulb-icon";
import SectionHeading from "./section-heading";

export default function WebsiteFits() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-12 lg:py-32">
      <div>
        <SectionHeading
          eyebrow="A WEBSITE THAT FITS"
          title="Built around your requirements, not a generic template."
          description="The project can be focused or ambitious. We start by understanding what is needed and make implementation decisions that support those requirements."
        />

        <div className="mt-8 space-y-4">
          {[
            {
              title: "A focused online presence",
              description:
                "A clear set of pages that explains your business and helps visitors get in touch.",
            },
            {
              title: "A distinctive visual experience",
              description:
                "A more expressive design system with considered motion, interactive elements, and visual detail.",
            },
            {
              title: "A website with custom functionality",
              description:
                "A tailored experience that connects to APIs, processes information, or supports specific user actions.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="flex gap-4 border-b border-[var(--card-border)] pb-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--card-border)] text-xs text-[var(--text-secondary)]">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
