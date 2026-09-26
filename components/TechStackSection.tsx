import { Database, ExternalLink } from "lucide-react";

const sources = [
  {
    name: "IWGSC RefSeq",
    description: "International Wheat Genome Sequencing Consortium chromosome-scale assembly annotations.",
    url: "https://www.wheatgenome.org/",
  },
  {
    name: "UniProt KB",
    description: "Curated protein sequence knowledgebase cross-referenced for functional descriptions and accessions.",
    url: "https://www.uniprot.org/",
  },
  {
    name: "InterPro & Pfam",
    description: "Classification of protein families, domains, and conserved functional sites across kinase families.",
    url: "https://www.ebi.ac.uk/interpro/",
  },
  {
    name: "PROSITE",
    description: "Database of protein domains, families, and functional sites for motif detection.",
    url: "https://prosite.expasy.org/",
  },
  {
    name: "Ensembl Plants",
    description: "Genomic gene models, transcript variants, and genomic context for Triticum aestivum.",
    url: "https://plants.ensembl.org/Triticum_aestivum/",
  },
];

export function TechStackSection() {
  return (
    <section className="bg-card py-14 sm:py-18">
      <div className="container-page">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Database className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Scientific Infrastructure</span>
        </div>

        <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Integrated Data Sources & Standards
        </h2>

        <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          ReceptorAtlas integrates curated biological data and taxonomies from recognized international bioinformatics repositories.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-lg border border-border bg-surface-subtle p-4 transition-colors hover:border-primary/50 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}