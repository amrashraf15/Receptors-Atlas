import { type ReceptorStats } from "@/lib/receptors.repository";
import { Dna } from "lucide-react";

type Props = {
  stats: ReceptorStats;
};

export function ReceptorHeader({ stats }: Props) {
  return (
    <section className="border-b border-border bg-surface-subtle py-8">
      <div className="container-page">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Dna className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Functional Genomics Database</span>
        </div>

        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Wheat Receptor Kinase Records
        </h1>

        <p className="mt-1.5 max-w-3xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Comprehensive catalog of {stats.total.toLocaleString()} plant receptor-like kinases and proteins across {stats.families} gene families in <em className="italic">Triticum aestivum</em>. Filter by subcellular compartment, chromosome location, and UniProt cross-references.
        </p>
      </div>
    </section>
  );
}