"use client";

import { useId, useMemo } from "react";
import type { ReceptorFilters } from "@/lib/receptors.repository";
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

  const baseId = useId();

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

  const hasAnyFilter =
    Boolean(filters.hasUniprot) ||
    families.length > 0 ||
    localizations.length > 0 ||
    chromosomes.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Filter Dataset
        </h2>

        {hasAnyFilter && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onReset}
            className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
          >
            Reset all
          </Button>
        )}
      </div>

      {/* Verification / Annotations */}
      <div className="space-y-2.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Cross-Reference
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id={`${baseId}-uniprot`}
            checked={!!filters.hasUniprot}
            onCheckedChange={() => toggleBooleanFilter("hasUniprot")}
          />
          <Label
            htmlFor={`${baseId}-uniprot`}
            className="text-xs text-foreground cursor-pointer select-none"
          >
            Has UniProt Accession
          </Label>
        </div>
      </div>

      {/* Families */}
      <FilterGroup title="Receptor Family" count={families.length}>
        <div className="max-h-48 overflow-y-auto space-y-2 pe-1">
          {RECEPTOR_FAMILIES.map((f, i) => (
            <FilterItem
              key={f}
              id={`${baseId}-fam-${i}`}
              label={f}
              checked={families.includes(f)}
              onChange={() => toggleArrayFilter("families", f)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Localizations */}
      <FilterGroup title="Subcellular Localization" count={localizations.length}>
        <div className="max-h-44 overflow-y-auto space-y-2 pe-1">
          {LOCALIZATIONS.map((l, i) => (
            <FilterItem
              key={l}
              id={`${baseId}-loc-${i}`}
              label={l}
              checked={localizations.includes(l)}
              onChange={() => toggleArrayFilter("localizations", l)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Chromosomes */}
      <FilterGroup title="Chromosome / Sub-genome" count={chromosomes.length}>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pe-1">
          {CHROMOSOMES.map((c, i) => (
            <FilterItem
              key={c}
              id={`${baseId}-chr-${i}`}
              label={`Chr ${c}`}
              checked={chromosomes.includes(c)}
              onChange={() => toggleArrayFilter("chromosomes", c)}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        {count && count > 0 ? (
          <span className="text-[10px] font-mono rounded bg-primary/10 text-primary px-1.5 py-0.2 font-medium">
            {count}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function FilterItem({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label
        htmlFor={id}
        className="text-xs text-foreground cursor-pointer select-none leading-tight font-normal"
      >
        {label}
      </Label>
    </div>
  );
}