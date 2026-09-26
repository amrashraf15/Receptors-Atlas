import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Receptor } from "@/types/receptor";

function safeText(value: unknown, fallback = "Unknown"): string {
  if (!value) return fallback;
  return String(value);
}

function safeNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

interface ReceptorCardProps {
  receptor: Receptor;
}

export function ReceptorCard({ receptor }: ReceptorCardProps) {
  return (
    <Link
      href={`/receptors/${receptor.id}`}
      className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-all duration-150 hover:border-primary hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div>
        {/* Family & Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            {safeText(receptor.family)}
          </span>

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">View receptor details for {safeText(receptor.seqName)}</span>
          </div>
        </div>

        {/* Sequence Identifier */}
        <h3 className="mt-2 font-mono text-sm font-semibold tracking-tight text-foreground sm:text-base">
          {safeText(receptor.seqName)}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed sm:text-sm">
          {safeText(receptor.description)}
        </p>

        {/* Biological Attributes */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Badge
            variant="secondary"
            className="text-[11px] font-normal"
          >
            {safeText(receptor.species)}
          </Badge>

          {receptor.chromosome && (
            <Badge
              variant="outline"
              className="text-[11px] font-mono font-normal"
            >
              Chr {receptor.chromosome}
            </Badge>
          )}

          {receptor.localizations?.[0] && (
            <Badge
              variant="outline"
              className="text-[11px] font-normal text-muted-foreground"
            >
              {receptor.localizations[0]}
            </Badge>
          )}

          {receptor.uniprot && (
            <Badge
              variant="outline"
              className="text-[11px] font-mono border-primary/20 text-primary bg-primary/5"
            >
              UniProt: {receptor.uniprot}
            </Badge>
          )}
        </div>
      </div>

      {/* Numerical Metrics Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-3 text-xs text-muted-foreground">
        <div>
          Length:{" "}
          <span className="font-semibold text-foreground tabular-nums">
            {safeNumber(receptor.length).toLocaleString()}
          </span>{" "}
          aa
        </div>

        {receptor.molecularWeight && (
          <div>
            MW:{" "}
            <span className="font-semibold text-foreground tabular-nums">
              {Math.round(receptor.molecularWeight).toLocaleString()}
            </span>{" "}
            Da
          </div>
        )}
      </div>
    </Link>
  );
}