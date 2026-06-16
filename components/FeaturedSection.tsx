import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReceptorCard } from "./ReceptorCard";
import { Receptor } from "@/types/receptor";

export function FeaturedSection({
  receptors,
}: {
  receptors: Receptor[];
}) {
  return (
    <section
      className="
        relative border-y border-border/60
        bg-background/40 backdrop-blur-xl
      "
    >
      <div className="container-page py-20">
        {/* HEADER */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-wider text-accent">
              Featured collection
            </div>

            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Most-cited receptors
            </h2>

            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              Curated receptor records with the highest research activity
              across indexed literature and biological databases.
            </p>
          </div>

          <Link
            href="/receptors"
            className="
              group inline-flex items-center gap-2
              rounded-xl border border-border/60
              bg-card/60 px-4 py-2 text-sm
              text-foreground
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-0.5 hover:border-accent/40
              hover:shadow-lg
            "
          >
            View all
            <ArrowRight
              className="
                h-4 w-4 transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* GRID */}
        <div
          className="
            mt-10 grid gap-5
            sm:grid-cols-2 lg:grid-cols-3
            relative
          "
        >
          {/* subtle background grid glow */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <div className="h-full w-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-accent/30 to-transparent" />
          </div>

          {receptors.map((receptor) => (
            <div
              key={receptor.id}
              className="
                relative transition-transform duration-300
                hover:-translate-y-1
              "
            >
              <ReceptorCard receptor={receptor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}