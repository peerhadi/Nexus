import HeroBackdrop from "@/components/default/services/ai-systems/hero-backdrop";
import HeroBottom from "@/components/default/services/ai-systems/hero-bottom";
import HeroCopy from "@/components/default/services/ai-systems/hero-copy";
import HeroCore from "@/components/default/services/ai-systems/hero-core";

export default function Hero() {
  return (
    <section className="ai-hero relative isolate">
      <HeroBackdrop />

      <div className="ai-hero-inner mx-auto">
        <HeroCopy />
        <HeroCore />
      </div>

      <HeroBottom />
    </section>
  );
}
