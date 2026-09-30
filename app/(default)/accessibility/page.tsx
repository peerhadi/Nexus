import { Accessibility } from "lucide-react";
import { PolicyPage } from "@/components/default/policies/policy-page";
import { accessibilitySections } from "@/components/default/policies/data";

export default function AccessibilityPage() {
  return (
    <PolicyPage
      badge="Accessibility"
      badgeIcon={Accessibility}
      title={
        <>
          Built for{" "}
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
            more people.
          </span>
        </>
      }
      description="Nexus is designed with accessibility in mind, from clear navigation and readable content to keyboard support and responsive interfaces."
      sections={accessibilitySections}
      summary={{
        icon: Accessibility,
        title: "Accessibility matters",
        text: "We want Nexus to be useful and comfortable to navigate for people with different abilities, devices, and ways of interacting with the web.",
      }}
    />
  );
}
