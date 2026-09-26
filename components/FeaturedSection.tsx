import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReceptorCard } from "./ReceptorCard";
import { Receptor } from "@/types/receptor";
import { Button } from "@/components/ui/button";

export function FeaturedSection({
  receptors,
}: {
  receptors: Receptor[];
}) {
  return (
    <section className="border-b border-border bg-background py-14 lg:py-18">
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Curated Highlights
            </div>

            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Well-Annotated Receptor Kinases
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed sm:text-base">
              Key receptor kinase models with verified InterPro domain architectures, resolved subcellular compartments, and UniProt cross-references.
            </p>
          </div>

          <Button asChild variant="outline" size="sm" className="gap-2 shrink-0 self-start sm:self-end">
            <Link href="/receptors">
              Explore all {receptors.length > 0 ? "records" : ""}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Card Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {receptors.map((receptor) => (
            <ReceptorCard key={receptor.id} receptor={receptor} />
          ))}
        </div>
      </div>
    </section>
  );
}