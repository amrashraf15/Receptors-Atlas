"use client";

import { useMemo, useState } from "react";
import { ReceptorFilters, receptorsRepository, ReceptorStats } from "@/lib/receptors.repository";
import { ReceptorHeader } from "./components/ReceptorHeader";
import { ReceptorToolbar } from "./components/ReceptorToolbar";
import { ReceptorActiveFilters } from "./components/ReceptorActiveFilters";
import { ReceptorLayout } from "./components/receptors/ReceptorLayout";

type Props = {
  stats: ReceptorStats;
};

export default function ReceptorsClient({ stats }: Props) {
  const [filters, setFilters] = useState<ReceptorFilters>({});
  const [view, setView] = useState<"table" | "card">("table");
  const [search, setSearch] = useState("");

  const data = useMemo(() => {
    return receptorsRepository.list({ ...filters, search });
  }, [filters, search]);

  const activeBadges = useMemo(() => {
    const out: { key: keyof ReceptorFilters; value: string }[] = [];

    (["families", "localizations", "chromosomes"] as const).forEach((k) => {
      (filters[k] as string[] | undefined)?.forEach((v) =>
        out.push({ key: k, value: v })
      );
    });

    return out;
  }, [filters]);

  function removeBadge(key: keyof ReceptorFilters, value: string) {
    const arr = (filters[key] as string[] | undefined) ?? [];
    const next = arr.filter((x) => x !== value);

    setFilters({
      ...filters,
      [key]: next.length ? next : undefined,
    });
  }

  return (
    <div className="min-h-screen">
      

      <ReceptorHeader stats={stats} />

      <ReceptorToolbar
        search={search}
        setSearch={setSearch}
        view={view}
        setView={setView}
        filters={filters}
        setFilters={setFilters}
      />

      <ReceptorActiveFilters
        activeBadges={activeBadges}
        removeBadge={removeBadge}
        setFilters={setFilters}
      />

      <ReceptorLayout
        view={view}
        data={data}
        filters={filters}
        setFilters={setFilters}
      />

    </div>
  );
}