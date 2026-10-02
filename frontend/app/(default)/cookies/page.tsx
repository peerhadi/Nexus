import { Cookie } from "lucide-react";
import { PolicyPage } from "@/components/default/policies/policy-page";
import { cookieSections } from "@/components/default/policies/data";

export default function CookiePolicyPage() {
  return (
    <PolicyPage
      badge="Cookie Policy"
      badgeIcon={Cookie}
      title={
        <>
          Cookies,{" "}
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
            explained.
          </span>
        </>
      }
      description="A straightforward explanation of what cookies are, how Nexus may use them, and the choices you have over them."
      sections={cookieSections}
      summary={{
        icon: Cookie,
        title: "The simple version",
        text: "Cookies help websites remember information and understand how they are being used. Nexus may use essential cookies and, where applicable, optional cookies for preferences and analytics.",
      }}
    />
  );
}
