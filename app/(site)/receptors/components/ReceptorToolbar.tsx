"use client";

import {
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Table as TableIcon,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import type { ReceptorFilters } from "@/lib/receptors.repository";
import { FilterPanel } from "./receptors/FilterPanel";

export type ViewMode = "table" | "card";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  view: ViewMode;
  onViewChange: (view: ViewMode) => void;

  filters: ReceptorFilters;
  onFiltersChange: (filters: ReceptorFilters) => void;
  onResetFilters: () => void;

  totalResults?: number;
};

export function ReceptorToolbar({
  search,
  onSearchChange,
  view,
  onViewChange,
  filters,
  onFiltersChange,
  onResetFilters,
  totalResults,
}: Props) {
  const activeFiltersCount = Object.entries(filters).filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0),
  ).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" aria-hidden="true" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search gene symbol, description, or UniProt accession..."
            aria-label="Search receptors"
            className="ps-9 pe-8 h-9 text-xs sm:text-sm"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded"
              aria-label="Clear search query"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          {/* Mobile Sheet Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 lg:hidden h-9 text-xs font-medium"
                aria-label={`Open filter panel${activeFiltersCount > 0 ? `, ${activeFiltersCount} active` : ""}`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ms-0.5 px-1.5 py-0 text-[10px] font-mono"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[300px] sm:w-[340px] overflow-y-auto p-6"
            >
              <SheetHeader className="pb-2">
                <SheetTitle className="text-base font-semibold">
                  Dataset Filters
                </SheetTitle>
              </SheetHeader>

              <div className="mt-4">
                <FilterPanel
                  filters={filters}
                  onChange={onFiltersChange}
                  onReset={onResetFilters}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* View Toggle */}
          <div
            className="flex items-center rounded-md border border-border bg-muted/60 p-0.5"
            role="group"
            aria-label="View layout switch"
          >
            <Button
              variant={view === "table" ? "default" : "ghost"}
              size="xs"
              onClick={() => onViewChange("table")}
              className="gap-1.5 h-7 px-2.5 text-xs font-medium"
              aria-pressed={view === "table"}
            >
              <TableIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Table</span>
            </Button>

            <Button
              variant={view === "card" ? "default" : "ghost"}
              size="xs"
              onClick={() => onViewChange("card")}
              className="gap-1.5 h-7 px-2.5 text-xs font-medium"
              aria-pressed={view === "card"}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cards</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Result Metrics */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          {typeof totalResults === "number" && (
            <span>
              Showing <span className="font-semibold text-foreground tabular-nums">{totalResults.toLocaleString()}</span> matching entries
            </span>
          )}
        </div>
      </div>
    </div>
  );
}