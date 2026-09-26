import { Compass, Target, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Systematic Genome Curation",
    description:
      "Resolving functional kinase gene models across the three sub-genomes (A, B, and D) of bread wheat using high-confidence IWGSC assembly annotations and consensus gene structures.",
  },
  {
    icon: Compass,
    title: "Domain Architecture Standardization",
    description:
      "Classifying extracellular sensory domains (such as leucine-rich repeats, lectins, and wall-associated motifs) alongside conserved intracellular serine/threonine kinase catalytic domains.",
  },
  {
    icon: ShieldCheck,
    title: "Translational Crop Protection",
    description:
      "Supporting molecular breeding and functional biology research targeted at disease resistance against fungal pathogens (e.g., Puccinia rusts) and environmental resilience.",
  },
];

export function MissionSection() {
  return (
    <section className="border-b border-border bg-card py-14 sm:py-18">
      <div className="container-page">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Scientific Objectives
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Core Research Mission & Priorities
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Establishing an authoritative, open-access knowledge base for plant receptor signaling and molecular taxonomy.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col rounded-lg border border-border bg-surface-subtle p-6 shadow-2xs"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <pillar.icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-foreground">
                {pillar.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}