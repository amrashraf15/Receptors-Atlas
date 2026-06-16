import { receptorsRepository } from "@/lib/receptors.repository";
import ReceptorsClient from "./ReceptorsClient";


export const metadata = {
  title: "Receptor Database — Receptor Research Portal",
  description:
    "Search and filter the receptor database by family, species, status, and expression profile.",
  openGraph: {
    title: "Receptor Database",
    description: "Search and filter the receptor database.",
    url: "/receptors",
  },
};

export default function Page() {
  // server-side stats (fast + SEO friendly)
  const stats = receptorsRepository.stats();

  return <ReceptorsClient stats={stats} />;
}