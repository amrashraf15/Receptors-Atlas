import { Database, Network, Microscope, BookOpen } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

type Props = {
  stats: {
    total: number;
    families: number;
    localizations: number;
    withUniprot: number;
    averageLength: number;
  };
};

export function StatsSection({ stats }: Props) {
  const items = [
    {
      label: "Total Receptors",
      value: stats.total,
      icon: Database,
    },
    {
      label: "Receptor Families",
      value: stats.families,
      icon: Network,
    },
    {
      label: "Localizations",
      value: stats.localizations,
      icon: Microscope,
    },
    {
      label: "UniProt Entries",
      value: stats.withUniprot,
      icon: BookOpen,
    },
  ];

  return (
    <section className="border-y border-border bg-background/50 backdrop-blur-xl">
      <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-4 py-10">
        {items.map((item) => (
          <div
            key={item.label}
            className="
              group relative overflow-hidden rounded-2xl
              border border-border/60
              bg-card/60 backdrop-blur-xl
              p-6
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              hover:border-accent/40
            "
          >
            {/* subtle glow background */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            </div>

            {/* icon */}
            <div className="flex items-center justify-between">
              <div
                className="
                  flex h-10 w-10 items-center justify-center rounded-xl
                  bg-muted/60
                  text-accent
                  ring-1 ring-border/50
                "
              >
                <item.icon className="h-5 w-5" />
              </div>
            </div>

            {/* number */}
            <div className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
              <AnimatedCounter value={item.value} />
            </div>

            {/* label */}
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}