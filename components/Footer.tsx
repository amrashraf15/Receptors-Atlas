import Link from "next/link";
import { Dna, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4 lg:gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
            <span className="grid h-6 w-6 place-items-center rounded bg-primary text-primary-foreground font-mono text-[10px] font-bold">
              <Dna className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>ReceptorAtlas</span>
          </div>

          <p className="mt-3 max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
            A scientific database dedicated to wheat (*Triticum aestivum*) receptor-like kinases, sub-genome distribution, and protein functional annotations.
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            Designed for plant biologists, molecular pathologists, and bioinformaticians.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Navigation
          </div>

          <ul className="mt-3 space-y-2 text-xs sm:text-sm">
            <li>
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/receptors"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Receptor Database
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                About & Methodology
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Scientific Resources
          </div>

          <ul className="mt-3 space-y-2 text-xs sm:text-sm">
            <li>
              <a
                href="https://www.uniprot.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                UniProt Knowledgebase
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://www.ebi.ac.uk/interpro/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                InterPro Protein Families
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://plants.ensembl.org/Triticum_aestivum/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                Ensembl Plants (Wheat)
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border bg-surface-subtle">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} ReceptorAtlas. Open access research resource for academic and scientific use.
          </span>

          <span className="font-mono text-[11px]">
            Release v1.2 • Triticum aestivum RLK
          </span>
        </div>
      </div>
    </footer>
  );
}