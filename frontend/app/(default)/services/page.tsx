import Atmosphere from "@/components/default/services/atmosphere";
import ServicesSection from "@/components/default/services/services-section";
import Hero from "@/components/default/services/hero";
import FindYourFit from "@/components/default/services/find-your-fit";
import ProcessSection from "@/components/default/services/process-section";
import PaymentSection from "@/components/default/services/payment-section";
import FinalCta from "@/components/default/services/final-cta";

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <Atmosphere />
      <Hero />
      <ServicesSection />
      <FindYourFit />
      <ProcessSection />
      <PaymentSection />
      <FinalCta />
    </main>
  );
}
