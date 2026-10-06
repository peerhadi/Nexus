import { FileText } from "lucide-react";
import { PolicyPage } from "@/components/default/policies/policy-page";
import { termsSections } from "@/components/default/policies/data";

export default function TermsPage() {
  return (
    <PolicyPage
      badge="The boring legal stuff"
      badgeIcon={FileText}
      title={
        <>
          Simple rules.
          <br />
          <span className="bg-[var(--gradient-primary)] bg-clip-text ">
            No weird surprises.
          </span>
        </>
      }
      description="These terms explain how Nexus services work, what we expect from each other, and the basic rules for using our website and services."
      sections={termsSections}
    />
  );
}
