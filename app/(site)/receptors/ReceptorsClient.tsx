"use client";

import { useMemo, useState } from "react";
import {
  ReceptorFilters,
  receptorsRepository,
  ReceptorStats,
} from "@/lib/receptors.repository";
import { ReceptorHeader } from "./components/ReceptorHeader";
import { ReceptorToolbar } from "./components/ReceptorToolbar";
import { ReceptorActiveFilters } from "./components/ReceptorActiveFilters";
import { ReceptorLayout } from "./components/receptors/ReceptorLayout";
import { FilterPanel } from "./components/receptors/FilterPanel";

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
        out.push({ key: k, value: v }),
      );
    });

    if (filters.hasUniprot) {
      out.push({ key: "hasUniprot", value: "Has UniProt" });
    }

    return out;
  }, [filters]);

  function removeBadge(key: keyof ReceptorFilters, value: string) {
    if (key === "hasUniprot") {
      setFilters({
        ...filters,
        hasUniprot: undefined,
      });
      return;
    }

    const arr = (filters[key] as string[] | undefined) ?? [];
    const next = arr.filter((x) => x !== value);

    setFilters({
      ...filters,
      [key]: next.length ? next : undefined,
    });
  }

  return (
    <div className="min-h-screen pb-16">
      <ReceptorHeader stats={stats} />

      <div className="container-page py-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0" aria-label="Desktop filters">
            <div className="sticky top-20 rounded-lg border border-border bg-card p-4 shadow-2xs">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters({})}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 space-y-4">
            <ReceptorToolbar
              search={search}
              onSearchChange={setSearch}
              view={view}
              onViewChange={setView}
              filters={filters}
              onFiltersChange={setFilters}
              onResetFilters={() => setFilters({})}
              totalResults={data.length}
            />

            <ReceptorActiveFilters
              activeBadges={activeBadges}
              removeBadge={removeBadge}
              setFilters={setFilters}
            />

            <ReceptorLayout
              view={view}
              data={data}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
