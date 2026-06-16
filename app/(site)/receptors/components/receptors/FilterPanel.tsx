"use client";

import { useMemo } from "react";
import type {
  ReceptorFilters,
} from "@/lib/receptors.repository";

import {
  RECEPTOR_FAMILIES,
  LOCALIZATIONS,
  CHROMOSOMES,
} from "@/data/receptors";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  filters: ReceptorFilters;
  onChange: (filters: ReceptorFilters) => void;
  onReset: () => void;
};

export function FilterPanel({ filters, onChange, onReset }: Props) {
  const families = useMemo(() => filters.families ?? [], [filters.families]);
  const localizations = useMemo(
    () => filters.localizations ?? [],
    [filters.localizations]
  );
  const chromosomes = useMemo(
    () => filters.chromosomes ?? [],
    [filters.chromosomes]
  );

  function toggleArrayFilter<
    K extends keyof Pick<
      ReceptorFilters,
      "families" | "localizations" | "chromosomes"
    >
  >(key: K, value: string) {
    const current = (filters[key] as string[] | undefined) ?? [];

    const exists = current.includes(value);

    const next = exists
      ? current.filter((v) => v !== value)
      : [...current, value];

    onChange({
      ...filters,
      [key]: next.length ? next : undefined,
    });
  }

  function toggleBooleanFilter(key: "hasUniprot") {
    onChange({
      ...filters,
      [key]: !filters[key],
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Filters</h2>

        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      {/* Has UniProt */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="uniprot"
            checked={!!filters.hasUniprot}
            onCheckedChange={() => toggleBooleanFilter("hasUniprot")}
          />
          <Label htmlFor="uniprot">Has UniProt ID</Label>
        </div>
      </div>

      {/* Families */}
      <FilterGroup title="Families">
        {RECEPTOR_FAMILIES.map((f) => (
          <FilterItem
            key={f}
            label={f}
            checked={families.includes(f)}
            onChange={() => toggleArrayFilter("families", f)}
          />
        ))}
      </FilterGroup>

      {/* Localizations */}
      <FilterGroup title="Localizations">
        {LOCALIZATIONS.map((l) => (
          <FilterItem
            key={l}
            label={l}
            checked={localizations.includes(l)}
            onChange={() => toggleArrayFilter("localizations", l)}
          />
        ))}
      </FilterGroup>

      {/* Chromosomes */}
      <FilterGroup title="Chromosomes">
        {CHROMOSOMES.map((c) => (
          <FilterItem
            key={c}
            label={c}
            checked={chromosomes.includes(c)}
            onChange={() => toggleArrayFilter("chromosomes", c)}
          />
        ))}
      </FilterGroup>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub Components                                                             */
/* -------------------------------------------------------------------------- */

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <Label className="text-sm">{label}</Label>
    </div>
  );
}