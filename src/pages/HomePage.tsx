import { HeroSection } from "../components/home/HeroSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { CliShowcase } from "../components/home/CliShowcase";
import { DemoShowcase } from "../components/home/DemoShowcase";
import { PricingPreview } from "../components/home/PricingPreview";
import { CtaBanner } from "../components/home/CtaBanner";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DemoShowcase />
      <CliShowcase />
      <PricingPreview />
      <CtaBanner />
    </>
  );
}
