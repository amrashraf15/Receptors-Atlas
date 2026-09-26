import {
  Dna,
  Binary,
  Microscope,
  Search,
} from "lucide-react";

const capabilities = [
  {
    icon: Dna,
    title: "Hexaploid Genome Mapping",
    description:
      "Cross-referenced chromosome positioning across wheat sub-genomes (A, B, and D) with standardized TraesCS locus designations.",
  },
  {
    icon: Binary,
    title: "Domain Architecture",
    description:
      "Structural annotations resolving leucine-rich repeats (LRR), lectin domains, kinase active sites, and InterPro signatures.",
  },
  {
    icon: Microscope,
    title: "Subcellular Compartments",
    description:
      "Predicted and curated localizations including plasma membrane, cytoplasm, chloroplast, and endomembrane systems.",
  },
  {
    icon: Search,
    title: "Multi-Facet Data Querying",
    description:
      "Rapidly filter by gene family, chromosomal location, sequence length, and verified UniProt accessions in real time.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-surface-subtle py-16 lg:py-20 border-b border-border">
      <div className="container-page">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Platform Capabilities
          </div>

          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Engineered for Plant Bioinformatics & Functional Genomics
          </h2>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            A specialized research environment designed to explore wheat receptor-like kinase diversity, defense signaling, and molecular characteristics.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-lg border border-border bg-card p-6 shadow-xs"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <cap.icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-foreground">
                {cap.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}