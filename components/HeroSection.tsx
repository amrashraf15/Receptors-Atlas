import Link from "next/link";
import { ArrowRight, Dna, Database, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { receptorsRepository } from "@/lib/receptors.repository";

export function HeroSection() {
  const stats = receptorsRepository.stats();
  const sampleReceptors = receptorsRepository.featured(3);

  return (
    <section className="relative border-b border-border bg-surface-subtle py-12 md:py-16 lg:py-20">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Scientific Narrative */}
          <div className="flex flex-col items-start lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Dna className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Plant Functional Genomics</span>
              <span className="text-primary/40">•</span>
              <span className="font-mono text-[11px]">Triticum aestivum</span>
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              Wheat Receptor Kinase Discovery Portal
            </h1>

            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              Explore a curated atlas of receptor-like kinases (RLKs) and receptor-like proteins (RLPs) across the hexaploid wheat genome. Discover subcellular localizations, molecular weights, chromosome mapping, and cross-referenced UniProt annotations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="default" className="gap-2 px-5 py-2.5 h-10 font-medium">
                <Link href="/receptors">
                  Explore Receptors
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="default" className="px-5 py-2.5 h-10 font-medium">
                <Link href="/about">
                  Research Methodology
                </Link>
              </Button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 w-full max-w-lg">
              <div>
                <div className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
                  {stats.total.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-0.5">
                  Total Records
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
                  {stats.families}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-0.5">
                  Gene Families
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
                  {stats.withUniprot}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-0.5">
                  UniProt Cross-Refs
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Scientific Dataset Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3.5">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Curated Kinase Records
                  </span>
                </div>
                <Badge variant="outline" className="text-[11px] font-mono border-primary/20 text-primary bg-primary/5">
                  Hexaploid Genome
                </Badge>
              </div>

              {/* Sample Kinase Mini-List */}
              <div className="mt-3 space-y-2.5">
                {sampleReceptors.map((receptor) => (
                  <Link
                    key={receptor.id}
                    href={`/receptors/${receptor.id}`}
                    className="group block rounded-lg border border-border/70 bg-surface-subtle p-3 transition-colors hover:border-primary/50 hover:bg-muted"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                            {receptor.seqName}
                          </span>
                          {receptor.chromosome && (
                            <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                              Chr {receptor.chromosome}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                          {receptor.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0 text-[10px] font-normal">
                        {receptor.family.replace("Receptor Kinase", "RK")}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick taxonomy footnote */}
              <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                  Major classes: LRR-RLK, WAK, Lectin
                </span>
                <Link
                  href="/receptors"
                  className="font-medium text-primary hover:underline"
                >
                  View all &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}