/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReceptorCard } from "@/components/ReceptorCard";
import { ReceptorTable } from "@/components/ReceptorTable";


type Props = {
  view: "table" | "card";
  data: any[];
  filters: any;
  setFilters: any;
};

export function ReceptorLayout({ view, data }: Props) {
  return (
    <section className="container-page py-10">
      {view === "table" ? (
        <ReceptorTable data={data} />
      ) : data.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No receptors found
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((r) => (
            <ReceptorCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </section>
  );
}