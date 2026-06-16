import { type ReceptorStats } from "@/lib/receptors.repository";

type Props = {
  stats: ReceptorStats;
};

export function ReceptorHeader({ stats }: Props) {
  return (
    <section className="border-b bg-surface">
      <div className="container-page py-10">
        <div className="font-mono text-xs uppercase text-accent">
          Database
        </div>

        <h1 className="mt-2 text-3xl font-semibold">
          Receptor records
        </h1>

        <p className="mt-2 text-muted-foreground">
          Search and filter {stats.total.toLocaleString()} receptors across{" "}
          {stats.families} families.
        </p>
      </div>
    </section>
  );
}