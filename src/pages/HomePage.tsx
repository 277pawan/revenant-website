import { HeroSection } from "../components/home/HeroSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { CliShowcase } from "../components/home/CliShowcase";
import { RestoreStory } from "../components/home/RestoreStory";
import { PricingPreview } from "../components/home/PricingPreview";
import { CtaBanner } from "../components/home/CtaBanner";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <RestoreStory />
      <CliShowcase />
      <PricingPreview />
      <CtaBanner />
    </>
  );
}
