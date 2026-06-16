"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dna } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/receptors", label: "Database" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-4 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Dna className="h-5 w-5" />
          </span>

          <span className="hidden sm:block">
            Receptor
            <span className="text-accent">.</span>
            Research
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <ModeToggle/>
      </div>
    </header>
  );
}