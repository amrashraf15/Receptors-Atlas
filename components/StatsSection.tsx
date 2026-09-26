import { Database, Network, Microscope, BookOpen, Layers } from "lucide-react";
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
      label: "Indexed Kinases",
      value: stats.total,
      suffix: "",
      icon: Database,
      detail: "Curated gene models",
    },
    {
      label: "Receptor Families",
      value: stats.families,
      suffix: "",
      icon: Network,
      detail: "Structural classifications",
    },
    {
      label: "Subcellular Sites",
      value: stats.localizations,
      suffix: "",
      icon: Microscope,
      detail: "Membrane & cellular compartments",
    },
    {
      label: "UniProt Cross-Refs",
      value: stats.withUniprot,
      suffix: "",
      icon: BookOpen,
      detail: "Verified protein entries",
    },
    {
      label: "Mean Protein Size",
      value: stats.averageLength,
      suffix: " aa",
      icon: Layers,
      detail: "Average residue length",
    },
  ];

  return (
    <section className="border-b border-border bg-card">
      <div className="container-page py-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          {items.map((item, idx) => (
            <div
              key={item.label}
              className={`flex flex-col justify-between ${
                idx > 0 ? "pt-4 sm:pt-0 sm:ps-6" : ""
              }`}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>

              <div className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums">
                <AnimatedCounter value={item.value} suffix={item.suffix} />
              </div>

              <div className="mt-1 text-xs text-muted-foreground">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}