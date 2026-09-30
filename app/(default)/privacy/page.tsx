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
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
            Your business.
          </span>
        </>
      }
      description="We think privacy policies should be understandable. Here’s the straightforward version of how Nexus handles information."
      sections={privacySections}
    />
  );
}
