import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Receptor } from "@/types/receptor";

/* -------------------------------------------------------------------------- */
/* Safe helpers                                                               */
/* -------------------------------------------------------------------------- */

function safeText(value: unknown, fallback = "Unknown") {
  if (!value) return fallback;
  return String(value);
}

function safeNumber(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

interface ReceptorCardProps {
  receptor: Receptor;
}

export function ReceptorCard({ receptor }: ReceptorCardProps) {
  return (
    <Link
      href={`/receptors/${receptor.id}`}
      className="
        group relative flex flex-col gap-4
        rounded-2xl border border-border/60
        bg-card/70 backdrop-blur-xl
        p-5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        hover:border-primary/40
        overflow-hidden
      "
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {safeText(receptor.family)}
          </p>

          <h3 className="mt-1 font-mono text-base font-semibold leading-tight">
            {safeText(receptor.seqName)}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {safeText(receptor.description)}
          </p>
        </div>

        <div
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl border border-border/60
            bg-muted/50 text-muted-foreground
            transition-all duration-300
            group-hover:rotate-12 group-hover:scale-110
            group-hover:text-primary
          "
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* TAGS */}
      <div className="relative flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="bg-muted/40 text-muted-foreground border-border/50"
        >
          {safeText(receptor.species)}
        </Badge>

        {receptor.chromosome && (
          <Badge
            variant="outline"
            className="bg-muted/40 border-border/50 text-muted-foreground"
          >
            Chr {receptor.chromosome}
          </Badge>
        )}

        {receptor.uniprot && (
          <Badge
            variant="outline"
            className="
              bg-primary/5 text-primary
              border-primary/20
              font-mono
            "
          >
            UniProt
          </Badge>
        )}
      </div>

      {/* FOOTER */}
      <div className="relative mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <div>
          Length{" "}
          <span className="text-foreground font-medium">
            {safeNumber(receptor.length)}
          </span>{" "}
          aa
        </div>

        {receptor.uniprot && (
          <div className="font-mono text-[11px] text-muted-foreground/80">
            {safeText(receptor.uniprot)}
          </div>
        )}
      </div>
    </Link>
  );
}