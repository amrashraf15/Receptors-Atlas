import { FeaturedSection } from "@/components/FeaturedSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { receptorsRepository } from "@/lib/receptors.repository";


export default function Home() {
  const stats = receptorsRepository.stats();
  
    const featured =
      receptorsRepository.featured(6);
  return (
     <>
      <HeroSection />

      <StatsSection stats={stats} />

      <FeaturedSection receptors={featured} />

      <FeaturesSection />
    </>
  );
}
