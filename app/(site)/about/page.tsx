import { AboutHero } from "@/components/AboutHero";
import { MissionSection } from "@/components/MissionSection";
import { TeamSection } from "@/components/TeamSection";
import { TechStackSection } from "@/components/TechStackSection";
import type { Metadata } from "next";




export const metadata: Metadata = {
  title: "About | Receptor Research Portal",
  description:
    "Our mission, research objectives, team, and the technology behind the Receptor Research Portal.",

  openGraph: {
    title: "About | Receptor Research Portal",
    description:
      "Mission, research objectives, and team behind the Receptor Research Portal.",
    url: "/about",
    type: "website",
  },

  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <TeamSection />
      <TechStackSection />
    </>
  );
}