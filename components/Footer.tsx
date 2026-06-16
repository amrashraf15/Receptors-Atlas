import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-semibold tracking-tight">
            Receptor Research Portal
          </div>

          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A scientific database for receptor classification,
            expression profiles, and peer-reviewed research.
          </p>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Platform
          </div>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/receptors"
                className="hover:text-accent transition-colors"
              >
                Database
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="hover:text-accent transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Resources
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>UniProt</li>
            <li>PubMed</li>
            <li>Citations</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} Receptor Research Portal.
            For research and academic use.
          </span>

          <span className="font-mono">
            v1.0
          </span>
        </div>
      </div>
    </footer>
  );
}