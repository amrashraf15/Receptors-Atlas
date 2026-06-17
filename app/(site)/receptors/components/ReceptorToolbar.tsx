"use client";

import {
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Table as TableIcon,
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
    ([_, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0),
  ).length;

  return (
    <section className="container-page mt-6 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search receptors..."
            className="pl-10"
          />
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />

                Filters

                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[320px] overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>

              <div className="mt-6">
                <FilterPanel
                  filters={filters}
                  onChange={onFiltersChange}
                  onReset={onResetFilters}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* View Switcher */}
          <div className="bg-muted flex items-center rounded-lg p-1">
            <Button
              variant={
                view === "table"
                  ? "default"
                  : "ghost"
              }
              size="sm"
              onClick={() => onViewChange("table")}
              className="gap-2"
            >
              <TableIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                Table
              </span>
            </Button>

            <Button
              variant={
                view === "card"
                  ? "default"
                  : "ghost"
              }
              size="sm"
              onClick={() => onViewChange("card")}
              className="gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">
                Cards
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-2">
        {typeof totalResults === "number" && (
          <p className="text-muted-foreground text-sm">
            {totalResults.toLocaleString()} receptors
          </p>
        )}

        {activeFiltersCount > 0 && (
          <Badge variant="secondary">
            {activeFiltersCount} active filter
            {activeFiltersCount > 1 ? "s" : ""}
          </Badge>
        )}
      </div>
    </section>
  );
}