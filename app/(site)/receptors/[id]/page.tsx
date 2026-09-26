import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Dna,
  ExternalLink,
  Layers,
  MapPin,
  Scale,
} from "lucide-react";

import { receptorsRepository } from "@/lib/receptors.repository";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const receptor = receptorsRepository.getById(id);

  if (!receptor) {
    return {
      title: "Receptor Record Not Found | ReceptorAtlas",
    };
  }

  return {
    title: `${receptor.seqName} — ${receptor.family} | ReceptorAtlas`,
    description: receptor.description,
  };
}

export default async function ReceptorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const receptor = receptorsRepository.getById(id);

  if (!receptor) {
    notFound();
  }

  const related = receptorsRepository.related(receptor, 3);

  return (
    <div className="min-h-screen pb-20">
      {/* Top Breadcrumb & Return Action */}
      <section className="border-b border-border bg-surface-subtle py-4">
        <div className="container-page flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/receptors" className="hover:text-foreground transition-colors">
              Database
            </Link>
            <span>/</span>
            <span className="font-mono text-foreground font-semibold" aria-current="page">
              {receptor.seqName}
            </span>
          </nav>

          <Button asChild variant="ghost" size="xs" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Link href="/receptors">
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
              <span>Back to Database</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Main Record Header */}
      <section className="border-b border-border bg-card py-8">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary bg-primary/5">
                  {receptor.family}
                </Badge>

                {receptor.chromosome && (
                  <Badge variant="secondary" className="font-mono text-xs">
                    Chromosome {receptor.chromosome}
                  </Badge>
                )}

                <Badge variant="outline" className="italic text-xs text-muted-foreground">
                  {receptor.species}
                </Badge>
              </div>

              <h1 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {receptor.seqName}
              </h1>

              <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                {receptor.description}
              </p>
            </div>

            {/* Quick External Identifiers */}
            <div className="flex flex-wrap gap-2 md:flex-col md:items-end shrink-0">
              {receptor.uniprot ? (
                <Button
                  asChild
                  variant="outline"
                  size="xs"
                  className="gap-1.5 h-8 font-mono text-xs text-primary border-primary/30 hover:bg-primary/5"
                >
                  <a
                    href={`https://www.uniprot.org/uniprotkb/${receptor.uniprot}/entry`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>UniProt: {receptor.uniprot}</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </Button>
              ) : null}

              {receptor.prosite ? (
                <Button
                  asChild
                  variant="outline"
                  size="xs"
                  className="gap-1.5 h-8 font-mono text-xs text-muted-foreground hover:text-foreground"
                >
                  <a
                    href={`https://prosite.expasy.org/${receptor.prosite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>PROSITE: {receptor.prosite}</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </Button>
              ) : null}

              <Button
                asChild
                variant="outline"
                size="xs"
                className="gap-1.5 h-8 font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                <a
                  href={`https://plants.ensembl.org/Triticum_aestivum/Gene/Summary?g=${receptor.seqName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Ensembl Plants</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Scientific Specifications */}
      <div className="container-page py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main 2-Column Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Physicochemical & Sequence Properties */}
            <section className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Scale className="h-4 w-4 text-primary" aria-hidden="true" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  Physicochemical & Genomic Attributes
                </h2>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 text-xs sm:text-sm">
                <div className="border-b border-border/60 pb-3">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Residue Length
                  </dt>
                  <dd className="mt-1 font-mono font-semibold text-foreground">
                    {receptor.length.toLocaleString()} amino acids
                  </dd>
                </div>

                <div className="border-b border-border/60 pb-3">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Molecular Weight (MW)
                  </dt>
                  <dd className="mt-1 font-mono font-semibold text-foreground">
                    {receptor.molecularWeight
                      ? `${Math.round(receptor.molecularWeight).toLocaleString()} Da`
                      : "Not determined"}
                  </dd>
                </div>

                <div className="border-b border-border/60 pb-3">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Isoelectric Point (pI)
                  </dt>
                  <dd className="mt-1 font-mono font-semibold text-foreground">
                    {receptor.isoelectricPoint ?? "Not determined"}
                  </dd>
                </div>

                <div className="border-b border-border/60 pb-3">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Sub-genome Chromosome
                  </dt>
                  <dd className="mt-1 font-mono font-semibold text-foreground">
                    {receptor.chromosome ? `Chr ${receptor.chromosome}` : "Unmapped"}
                  </dd>
                </div>

                <div className="border-b border-border/60 pb-3">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Organism & Species
                  </dt>
                  <dd className="mt-1 text-foreground">
                    <span className="italic">{receptor.species}</span> (Common wheat)
                  </dd>
                </div>

                <div className="border-b border-border/60 pb-3">
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    UniProt Accession
                  </dt>
                  <dd className="mt-1 font-mono text-foreground">
                    {receptor.uniprot ?? "None cross-referenced"}
                  </dd>
                </div>
              </dl>
            </section>

            {/* Subcellular Localization */}
            <section className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  Subcellular Compartment Localization
                </h2>
              </div>

              <div className="mt-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  In silico and curated subcellular assignments derived from consensus signal peptides and transit peptides:
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {receptor.localizations.length > 0 ? (
                    receptor.localizations.map((loc) => (
                      <Badge
                        key={loc}
                        variant="secondary"
                        className="px-3 py-1 text-xs font-medium"
                      >
                        {loc}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      No explicit localization assigned.
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Domain Architecture & InterPro Signatures */}
            <section className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  Domain Architecture & InterPro Signatures
                </h2>
              </div>

              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    InterPro Signatures ({receptor.interpro.length})
                  </h3>

                  {receptor.interpro.length > 0 ? (
                    <ul className="mt-2.5 divide-y divide-border/60 rounded-md border border-border">
                      {receptor.interpro.map((item, idx) => (
                        <li key={idx} className="px-3.5 py-2 text-xs sm:text-sm text-foreground flex items-center justify-between gap-2">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground italic">
                      No InterPro domain annotations available for this record.
                    </p>
                  )}
                </div>

                {receptor.domains.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Database Domain Classifications ({receptor.domains.length})
                    </h3>

                    <ul className="mt-2.5 divide-y divide-border/60 rounded-md border border-border">
                      {receptor.domains.map((item, idx) => (
                        <li key={idx} className="px-3.5 py-2 text-xs text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar: Related Family Members */}
          <aside className="space-y-6" aria-label="Related kinase records">
            <div className="rounded-lg border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Dna className="h-4 w-4 text-primary" aria-hidden="true" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Related in {receptor.family}
                </h2>
              </div>

              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Other kinase loci sharing functional classification:
              </p>

              <div className="mt-4 space-y-3">
                {related.length > 0 ? (
                  related.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/receptors/${rel.id}`}
                      className="group block rounded-md border border-border/80 bg-surface-subtle p-3 transition-colors hover:border-primary/50 hover:bg-muted"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-primary group-hover:underline">
                          {rel.seqName}
                        </span>
                        {rel.chromosome && (
                          <span className="font-mono text-[10px] text-muted-foreground">
                            Chr {rel.chromosome}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                        {rel.description}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    No related kinase records indexed.
                  </p>
                )}
              </div>
            </div>

            {/* Citation & Methodology Note */}
            <div className="rounded-lg border border-border/80 bg-surface-subtle p-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>Reference Guidance</span>
              </div>
              <p className="leading-relaxed">
                Wheat genome models are aligned to the IWGSC RefSeq v1.0 / v2.1 assembly. When citing this locus, refer to TraesCS gene identifiers and corresponding UniProt accessions where available.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}