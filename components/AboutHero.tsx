import { Dna } from "lucide-react";

export function AboutHero() {
  return (
    <section className="border-b border-border bg-surface-subtle py-14 sm:py-18">
      <div className="container-page">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Dna className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Research Initiative & Scope</span>
        </div>

        <h1 className="mt-3 max-w-3xl text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Systematic Annotation of Plant Receptor-Like Kinases
        </h1>

        <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          The ReceptorAtlas initiative provides structured, standardized bioinformatics data for receptor-like kinases (RLKs) and receptor-like proteins (RLPs) across the allohexaploid bread wheat genome (<em className="italic">Triticum aestivum</em>).
        </p>
      </div>
    </section>
  );
}