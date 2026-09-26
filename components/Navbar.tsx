"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dna } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const links = [
  { href: "/", label: "Overview" },
  { href: "/receptors", label: "Database" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-mono text-xs font-bold">
            <Dna className="h-4 w-4" aria-hidden="true" />
          </span>

          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Receptor<span className="text-primary font-normal">Atlas</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="h-4 w-px bg-border hidden sm:block" aria-hidden="true" />

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}