import { HeroSection } from "../components/home/HeroSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { CliShowcase } from "../components/home/CliShowcase";
import { RestoreStory } from "../components/home/RestoreStory";
import { PricingPreview } from "../components/home/PricingPreview";
import { CtaBanner } from "../components/home/CtaBanner";
import { PageMeta } from "../components/seo/PageMeta";
import { homeSeo } from "../lib/seo-pages";

export function HomePage() {
  return (
    <>
      <PageMeta {...homeSeo} />
      <HeroSection />
      <FeaturesSection />
      <RestoreStory />
      <CliShowcase />
      <PricingPreview />
      <CtaBanner />
    </>
  );
}
