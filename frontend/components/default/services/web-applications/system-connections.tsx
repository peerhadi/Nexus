import { Code2, Database, Network, PanelsTopLeft } from "lucide-react";
import FlowNode from "./flow-node";
import SectionHeading from "./section-heading";

export default function SystemConnections() {
  return (
    <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <SectionHeading
          eyebrow="How it fits together"
          title="A system with clear connections."
          description="A typical application brings several layers together. The exact implementation is shaped by the project's scope."
          align="center"
        />

        <div className="relative mt-12">
          <div className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-[var(--card-border)] md:block" />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <FlowNode
              icon={PanelsTopLeft}
              label="Interface"
              detail="Screens, forms, and interactions"
            />
            <FlowNode
              icon={Code2}
              label="Application logic"
              detail="Rules, validation, and workflows"
            />
            <FlowNode
              icon={Database}
              label="Data"
              detail="Records and information storage"
            />
            <FlowNode
              icon={Network}
              label="Integrations"
              detail="External services and APIs"
            />
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-6 text-[var(--text-secondary)]">
          Not every application needs every component. We select the
          appropriate architecture for the actual requirements instead of
          adding unnecessary complexity.
        </p>
      </div>
    </section>
  );
}
