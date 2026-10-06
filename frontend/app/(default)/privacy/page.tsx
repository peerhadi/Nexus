import { Shield } from "lucide-react";
import { PolicyPage } from "@/components/default/policies/policy-page";
import { privacySections } from "@/components/default/policies/data";

export default function PrivacyPage() {
  return (
    <PolicyPage
      badge="Privacy, without the scary stuff"
      badgeIcon={Shield}
      title={
        <>
          Your data.
          <br />
          <span className="bg-[var(--gradient-primary)] bg-clip-text ">
            Your business.
          </span>
        </>
      }
      description="We think privacy policies should be understandable. Here’s the straightforward version of how Nexus handles information."
      sections={privacySections}
    />
  );
}
