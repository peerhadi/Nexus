"use client";

export default function DetailStrip() {
  return (
    <div className="mt-4 grid gap-px border border-[var(--pg-line)] bg-[var(--pg-line)] sm:grid-cols-3">
      {[
        {
          number: "01",
          title: "Sculpt",
          description: "Choose a form and build your silhouette.",
        },
        {
          number: "02",
          title: "Illuminate",
          description: "Dial in colour, materials, and light.",
        },
        {
          number: "03",
          title: "Make it yours",
          description: "Experiment freely and export your creation.",
        },
      ].map((item) => (
        <div
          key={item.number}
          className="flex gap-4 bg-[var(--background)] p-5 sm:p-6"
        >
          <span className="font-mono text-xs text-[var(--accent)]">
            {item.number}
          </span>
          <div>
            <h2 className="text-sm font-semibold">{item.title}</h2>
            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
